import { IModal } from "../../../components/ModalLayout/ModalLayout";
import ModalLayout from "../../../components/ModalLayout";
import { Grid, TextField, Theme, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SxProps } from "@mui/system";
import { LABELS } from "../../../constants/labels";
import { patchUserProfile } from "../../../utils/api";
import API_ENDPOINTS from "../../../constants/api";
import { useQuery } from "react-query";
import { useAuthContext } from "../../../contexts/AuthContext";
import { IUserProfilePatchApiRequest } from "../../../interfaces/api/external";
import { useUserContext } from "../../../contexts/UserContext";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import CustomButton from "../../../components/CustomButton";
import { getURLFormattedMessage } from "../../../utils/generic";

interface IEditAboutUserProps extends IModal {}

const EditAboutUser: React.FC<IEditAboutUserProps> = ({
  showModal,
  onModalClose,
}) => {
  const { setSnackbar } = useSnackbarContext();
  const { accessToken, authUser } = useAuthContext();
  const { user, setUser, setProfileStatus } = useUserContext();
  const [aboutUser, setAboutUser] = useState(user.aboutUser);
  const [patchUserReq, setPatchUserReq] =
    useState<IUserProfilePatchApiRequest>();

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

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAboutUser(event.target.value.substring(0, 1000));
  };

  const handleAboutSave = () => {
    const urlFormattedAboutUser = getURLFormattedMessage(aboutUser);
    const patchUserReqBody: IUserProfilePatchApiRequest = {
      aboutUser: urlFormattedAboutUser,
    };
    setPatchUserReq(patchUserReqBody);
  };

  useEffect(() => {
    if (patchUserStatus === "success") {
      setSnackbar?.(() => ({
        message: LABELS.SAVE_SUCCESS,
        messageType: "success",
      }));
      setUser(prev => ({
        ...prev,
        aboutUser: patchUserData?.data?.aboutUser as string,
      }));
      setProfileStatus(prev => ({
        ...prev,
        isAboutUserAddComplete:
          patchUserData?.data?.aboutUser !== "" ? true : false,
      }));
      onModalClose?.();
    }
  }, [
    onModalClose,
    patchUserData?.data?.aboutUser,
    patchUserStatus,
    setProfileStatus,
    setSnackbar,
    setUser,
  ]);

  useEffect(() => {
    if (patchUserStatus === "error") {
      setSnackbar?.(() => ({
        message: LABELS.SAVE_FAILED,
        messageType: "error",
      }));
    }
  }, [patchUserStatus, setSnackbar]);

  return (
    <>
      <ModalLayout
        showModal={showModal}
        onModalClose={onModalClose}
        title={LABELS.ABOUT_EDIT_TITLE}
      >
        <Grid container p={3} justifyContent="flex-end">
          <Grid item xs={12}>
            <Typography variant="h6">{LABELS.ABOUT_HEADLINE}</Typography>
          </Grid>
          <Grid item xs={12} py={3}>
            <TextField
              id="outlined-multiline-flexible"
              label={LABELS.ABOUT_FIELD_LABEL}
              placeholder={LABELS.ABOUT_PLACEHOLDER}
              multiline
              rows={7}
              value={aboutUser}
              onChange={handleTextChange}
              sx={aboutField}
              focused
            />
          </Grid>

          <Grid>
            <CustomButton
              onClick={handleAboutSave}
              loading={patchUserStatus === "loading"}
              disabled={patchUserStatus === "loading"}
            >
              {LABELS.SAVE}
            </CustomButton>
          </Grid>
        </Grid>
      </ModalLayout>
    </>
  );
};

const aboutField: SxProps<Theme> = (theme: Theme) => ({
  width: " 100%",
  color: theme.palette.text.primary,
  "& label.Mui-focused": {
    color: theme.palette.text.primary,
  },

  ".MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.grey[500],
    },
  },
});

export default EditAboutUser;
