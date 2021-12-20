import { Button, Grid, styled } from "@mui/material";
import {
  ChangeEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Area } from "react-easy-crop/types";
import { useQuery } from "react-query";
import {
  IUserImageType,
  IUserProfilePatchApiRequest,
} from "../../../../interfaces/api/external";
import { useAuthContext } from "../../../../contexts/AuthContext";
import ImageCropper from "../../../../components/ImageCropper";
import ModalLayout from "../../../../components/ModalLayout";
import { IModal } from "../../../../components/ModalLayout/ModalLayout";
import API_ENDPOINTS from "../../../../constants/api";
import { LABELS } from "../../../../constants/labels";
import {
  fetchUserImageSignedUrl,
  patchUserProfile,
  putUserImageToS3,
} from "../../../../utils/api";
import { getCroppedImg } from "../../../../utils/imageProcessing";
import { getPublicUrlFromS3SignedUrl } from "../../../../utils/generic";
import { USER_IMAGE_SELECTOR_ATTRIBUTES } from "../../../../constants/app";
import { useUserContext } from "../../../../contexts/UserContext";
import { useSnackbarContext } from "../../../../contexts/SnackbarContext";
import CustomButton from "../../../../components/CustomButton";

const Input = styled("input")({
  display: "none",
});

interface IUserImageSelectorProps extends IModal {
  imageUrl?: string;
  imageType: IUserImageType;
  onSuccessfulUpload?: (uploadUrl?: string) => void;
}

const UserImageSelector: React.FC<IUserImageSelectorProps> = ({
  imageUrl,
  imageType,
  showModal,
  onModalClose,
  onSuccessfulUpload,
}) => {
  const { setSnackbar } = useSnackbarContext();
  const { setUser } = useUserContext();
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>();
  const [activeImageUrl, setActiveImageUrl] = useState<string>();
  const [croppedImageBlob, setCroppedImageBlob] = useState<Blob>();
  const [s3PutUrl, setS3PutUrl] = useState<string>();
  const [patchUserReq, setPatchUserReq] =
    useState<IUserProfilePatchApiRequest>();
  const { accessToken, authUser } = useAuthContext();

  const { status: s3PutImageToS3Status, refetch: s3PutImageToS3ApiTrigger } =
    useQuery(
      `s3_upload_${imageType}`,
      () => putUserImageToS3(s3PutUrl as string, croppedImageBlob as Blob),
      { cacheTime: 0, enabled: !!s3PutUrl && !!croppedImageBlob }
    );

  const { data: patchUserData, status: patchUserStatus } = useQuery(
    `ImageSelector: ${API_ENDPOINTS.USER_PROFILE.key}`,
    () =>
      patchUserProfile(
        accessToken as string,
        authUser?.id as string,
        patchUserReq as IUserProfilePatchApiRequest
      ),
    { cacheTime: 0, enabled: !!patchUserReq }
  );

  const {
    data: userSignedUrlData,
    status: userSignedUrlStatus,
    refetch: userSignedUrlDataApiTrigger,
  } = useQuery(
    API_ENDPOINTS.USER_SIGNED_URL.key,
    () =>
      fetchUserImageSignedUrl(
        accessToken as string,
        authUser?.id as string,
        imageType
      ),
    {
      cacheTime: 0,
      enabled: false,
    }
  );

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImageUrl(URL.createObjectURL(file));
    }
  };

  const handleApplyBtnClick: MouseEventHandler<HTMLButtonElement> | undefined =
    (_event) => {
      userSignedUrlDataApiTrigger();
    };

  const handleRemoveBtnClick: MouseEventHandler<HTMLButtonElement> | undefined =
    (_event) => {
      const patchUserReqBody: IUserProfilePatchApiRequest = {};
      if (imageType === "background_image") {
        patchUserReqBody.backgroundImageUrl = "";
      } else if (imageType === "display_picture") {
        patchUserReqBody.displayPictureUrl = "";
      }
      setPatchUserReq(patchUserReqBody);
    };

  const onCropComplete = useCallback(
    async (_croppedArea: Area, croppedAreaPixels: Area) => {
      if (selectedImageUrl) {
        const blob = await getCroppedImg(selectedImageUrl, croppedAreaPixels);
        if (blob) {
          setCroppedImageBlob(blob);
        }
      }
    },
    [selectedImageUrl]
  );

  useEffect(() => {
    setActiveImageUrl(selectedImageUrl || imageUrl);
  }, [selectedImageUrl, imageUrl]);

  useEffect(() => {
    if (userSignedUrlData) {
      setS3PutUrl(userSignedUrlData.data);
    }
  }, [s3PutImageToS3ApiTrigger, userSignedUrlData]);

  useEffect(() => {
    if (s3PutImageToS3Status === "success") {
      const patchUserReqBody: IUserProfilePatchApiRequest = {};
      const publicUrl = getPublicUrlFromS3SignedUrl(s3PutUrl as string);
      if (imageType === "background_image") {
        patchUserReqBody.backgroundImageUrl = publicUrl;
      } else if (imageType === "display_picture") {
        patchUserReqBody.displayPictureUrl = publicUrl;
      }
      setPatchUserReq(patchUserReqBody);
    }
  }, [s3PutImageToS3Status, s3PutUrl, imageType]);

  useEffect(() => {
    if (
      s3PutImageToS3Status === "error" ||
      userSignedUrlStatus === "error" ||
      patchUserStatus === "error"
    ) {
      setSnackbar?.(() => ({
        message: LABELS.SAVE_FAILED,
        messageType: "error",
      }));
    }
  });

  useEffect(() => {
    if (patchUserStatus === "success") {
      setSnackbar?.(() => ({
        message: LABELS.SAVE_SUCCESS,
        messageType: "success",
      }));
      setUser((prev) => ({
        ...prev,
        backgroundImageUrl: patchUserData?.data?.backgroundImageUrl as string,
        displayPictureUrl: patchUserData?.data?.displayPictureUrl as string,
      }));
      let publicUrl: string | undefined;
      if (patchUserReq?.backgroundImageUrl || patchUserReq?.displayPictureUrl) {
        publicUrl = URL.createObjectURL(croppedImageBlob as Blob);
      }
      onSuccessfulUpload?.(publicUrl);
      onModalClose();
    }
  }, [
    onModalClose,
    croppedImageBlob,
    onSuccessfulUpload,
    patchUserStatus,
    patchUserReq,
    setUser,
    patchUserData,
    setSnackbar,
  ]);

  if (!showModal) {
    return <></>;
  }

  return (
    <ModalLayout
      showModal={showModal}
      onModalClose={onModalClose}
      title={USER_IMAGE_SELECTOR_ATTRIBUTES[imageType].label}
    >
      {activeImageUrl && (
        <ImageCropper
          aspectRatio={USER_IMAGE_SELECTOR_ATTRIBUTES[imageType].aspectRatio}
          image={activeImageUrl as string}
          fitType={USER_IMAGE_SELECTOR_ATTRIBUTES[imageType].fitType}
          onCropComplete={onCropComplete}
        />
      )}

      <Grid container justifyContent="space-between" p={2} flexWrap="nowrap">
        <Grid item>
          {activeImageUrl && (
            <Button
              variant="contained"
              color="error"
              onClick={handleRemoveBtnClick}
            >
              {LABELS.USER_IMAGE_REMOVE}
            </Button>
          )}
        </Grid>
        <Grid item>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  onChange={handleImageUpload}
                />
                <Button variant="outlined" color="primary" component="span">
                  {activeImageUrl
                    ? LABELS.USER_IMAGE_CHANGE_IMAGE
                    : LABELS.USER_IMAGE_CHOOSE_IMAGE}
                </Button>
              </label>
            </Grid>
            <Grid item>
              {activeImageUrl && (
                <CustomButton
                  disabled={
                    s3PutImageToS3Status === "loading" ||
                    userSignedUrlStatus === "loading" ||
                    patchUserStatus === "loading" ||
                    !selectedImageUrl
                  }
                  loading={
                    s3PutImageToS3Status === "loading" ||
                    userSignedUrlStatus === "loading" ||
                    patchUserStatus === "loading"
                  }
                  onClick={handleApplyBtnClick}
                >
                  {LABELS.USER_IMAGE_APPLY}
                </CustomButton>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ModalLayout>
  );
};

export default UserImageSelector;
