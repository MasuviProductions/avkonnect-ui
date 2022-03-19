import { Box, Button, Container, Grid, IconButton, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import LayoutCard from "../../../components/LayoutCard";
import API_ENDPOINTS from "../../../constants/api";
import {
  CERTIFICATIONS_ELLIPSE_LIMIT,
  URL_MATCH_REGEX_WITHOUT_PROTOCOL,
} from "../../../constants/app";
import { LABELS } from "../../../constants/labels";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { useUserContext } from "../../../contexts/UserContext";
import { IUserCertificationApiModel } from "../../../interfaces/api/external";
import {
  getUserCertifications,
  putUserCertifications,
} from "../../../utils/api";
import AddCertification from "./AddCertification";
import EditCertification from "./EditCertification";
import CertificationItem from "./CertificationItem";
import cloneDeep from "lodash.clonedeep";

const CertificationsCard: React.FC = () => {
  const { user } = useUserContext();
  const { authUser, accessToken } = useAuthContext();
  const { setSnackbar } = useSnackbarContext();

  const [showMoreCertifications, setShowMoreCertifications] =
    useState<boolean>(false);
  const [
    isShowMoreCertificationsApplicable,
    setIsShowMoreCertificationsApplicable,
  ] = useState<boolean>(false);
  const [showAddCertificationModal, setShowAddCertificationModal] =
    useState<boolean>(false);
  const [showEditCertificationModal, setShowEditCertificationModal] =
    useState<boolean>(false);
  const [userCertificationsEllpised, setUserCertificationsEllpised] =
    useState<IUserCertificationApiModel[]>();
  const [userCertifications, setUserCertifications] =
    useState<IUserCertificationApiModel[]>();
  const [putUserCertificationsReq, setPatchUserCertificationsReq] =
    useState<IUserCertificationApiModel[]>();
  const [selectedCertificationIndex, setSelectedCertificationIndex] =
    useState<number>(-1);
  const [certificationRemoving, setCertificationRemoving] =
    useState<boolean>(false);

  const {
    data: getUserCertificationsData,
    error: getUserCertificationsError,
    status: getUserCertificationsStatus,
    refetch: triggerGetUserCertificationsApi,
  } = useQuery(`${API_ENDPOINTS.USER_CERTIFICATIONS.key}:${user.id}`, () =>
    getUserCertifications(accessToken as string, user?.id as string)
  );

  const {
    data: putUserCertificationsData,
    error: putUserCertificationsError,
    status: putUserCertificationsStatus,
    isFetching: putUserCertificationsFetching,
    refetch: triggerPatchUserCertificationsApi,
  } = useQuery(
    `${API_ENDPOINTS.USER_CERTIFICATIONS.key}${user.id}`,
    () =>
      putUserCertifications(
        accessToken as string,
        user?.id as string,
        putUserCertificationsReq as IUserCertificationApiModel[]
      ),
    { enabled: false, cacheTime: 0 }
  );

  const handleAddCertificationModalOpen = () => {
    setSelectedCertificationIndex(-1);
    setShowAddCertificationModal(true);
  };

  const handleAddCertificationModalClose = () => {
    setShowAddCertificationModal(false);
  };

  const handleEditCertificationModalOpen = (certificationIndex: number) => {
    setSelectedCertificationIndex(certificationIndex);
    setShowEditCertificationModal(true);
  };

  const handleEditCertificationModalClose = () => {
    setShowEditCertificationModal(false);
  };

  const handleCertificationSave = (
    certification: IUserCertificationApiModel
  ) => {
    const certifications: IUserCertificationApiModel[] = cloneDeep(
      userCertifications as IUserCertificationApiModel[]
    );

    if (certification.link) {
      certification.link = certification.link.replaceAll(
        URL_MATCH_REGEX_WITHOUT_PROTOCOL,
        `https://$&`
      );
    }

    if (selectedCertificationIndex < 0) {
      certifications.push(certification);
    } else {
      certifications[selectedCertificationIndex] = certification;
    }

    setPatchUserCertificationsReq(certifications);
  };

  const handleCertificationRemove = () => {
    let certifications: IUserCertificationApiModel[] = cloneDeep(
      userCertifications as IUserCertificationApiModel[]
    );
    certifications = certifications.filter(
      (_, index) => index != selectedCertificationIndex
    );
    setCertificationRemoving(true);
    setPatchUserCertificationsReq(certifications);
  };

  const handleShowLess = () => {
    setShowMoreCertifications(false);
  };

  const handleShowMore = () => {
    setShowMoreCertifications(true);
  };

  useEffect(() => {
    setIsShowMoreCertificationsApplicable(
      !!(
        userCertifications &&
        userCertifications.length > CERTIFICATIONS_ELLIPSE_LIMIT
      )
    );
  }, [userCertifications]);

  useEffect(() => {
    if (getUserCertificationsData?.data) {
      setUserCertifications(
        () =>
          getUserCertificationsData.data
            ?.certifications as IUserCertificationApiModel[]
      );
    }
  }, [getUserCertificationsData?.data]);

  useEffect(() => {
    if (putUserCertificationsReq) {
      triggerPatchUserCertificationsApi();
    }
  }, [putUserCertificationsReq, triggerPatchUserCertificationsApi]);

  useEffect(() => {
    if (putUserCertificationsData?.data) {
      setUserCertifications(putUserCertificationsData.data.certifications);
      setCertificationRemoving(false);
      handleAddCertificationModalClose();
      handleEditCertificationModalClose();
    }
  }, [putUserCertificationsData?.data]);

  useEffect(() => {
    if (putUserCertificationsStatus === "success") {
      setSnackbar?.(() => ({
        message: LABELS.SAVE_SUCCESS,
        messageType: "success",
      }));
    }
  }, [putUserCertificationsStatus, setSnackbar]);

  useEffect(() => {
    if (userCertifications) {
      if (isShowMoreCertificationsApplicable) {
        if (showMoreCertifications) {
          setUserCertificationsEllpised(userCertifications);
        } else {
          setUserCertificationsEllpised(
            userCertifications.slice(0, CERTIFICATIONS_ELLIPSE_LIMIT)
          );
        }
      } else {
        setUserCertificationsEllpised(userCertifications);
      }
    }
  }, [
    isShowMoreCertificationsApplicable,
    showMoreCertifications,
    userCertifications,
  ]);

  if (
    authUser?.id !== user.id &&
    userCertifications &&
    userCertifications.length <= 0
  ) {
    return <></>;
  }

  return (
    <Box my={1}>
      <LayoutCard>
        <LayoutCard.Header
          title={LABELS.CERTIFICATIONS_TITLE}
          helperText={user.isAuthUser ? LABELS.CERTIFICATION_HELPER : undefined}
        >
          {user.isAuthUser && (
            <>
              <IconButton onClick={handleAddCertificationModalOpen}>
                <AddCircleOutlineIcon color="primary" fontSize="large" />
              </IconButton>
            </>
          )}
        </LayoutCard.Header>

        <Container sx={certificationsLayoutCardContainer}>
          <Grid container spacing={2}>
            {userCertificationsEllpised?.map((certification, index) => (
              <Grid item xs={12} key={certification.name}>
                <CertificationItem
                  certification={certification}
                  onEditCertificationClick={() =>
                    handleEditCertificationModalOpen(index)
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Container>

        {isShowMoreCertificationsApplicable && (
          <>
            {showMoreCertifications ? (
              <Button onClick={handleShowLess} sx={showMoreOrLessButton}>
                {LABELS.SHOW_LESS}
                <ArrowCircleUpOutlinedIcon
                  sx={showMoreOrLessIcon}
                  fontSize="small"
                />
              </Button>
            ) : (
              <Button onClick={handleShowMore} sx={showMoreOrLessButton}>
                {LABELS.SHOW_MORE}
                <ArrowDropDownCircleOutlinedIcon
                  sx={showMoreOrLessIcon}
                  fontSize="small"
                />
              </Button>
            )}
          </>
        )}

        {showAddCertificationModal && (
          <AddCertification
            showModal={showAddCertificationModal}
            onModalClose={handleAddCertificationModalClose}
            saveLoading={putUserCertificationsFetching}
            onSaveCertification={handleCertificationSave}
          />
        )}

        {showEditCertificationModal && (
          <EditCertification
            showModal={showEditCertificationModal}
            onModalClose={handleEditCertificationModalClose}
            saveLoading={
              !certificationRemoving && putUserCertificationsFetching
            }
            removeLoading={
              certificationRemoving && putUserCertificationsFetching
            }
            certification={
              userCertifications?.[
                selectedCertificationIndex
              ] as IUserCertificationApiModel
            }
            onSaveCertification={handleCertificationSave}
            onRemoveCertification={handleCertificationRemove}
          />
        )}
      </LayoutCard>
    </Box>
  );
};

const certificationsCardEditBtn: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.text.primary,
  marginLeft: 2,
});

const showMoreOrLessButton: SxProps<Theme> = (theme: Theme) => ({
  width: "100%",
  padding: 2,
});

const showMoreOrLessIcon: SxProps<Theme> = (theme: Theme) => ({
  marginX: 1,
});

const certificationsLayoutCardContainer: SxProps<Theme> = (theme: Theme) => ({
  paddingBottom: 3,
});

export default CertificationsCard;
