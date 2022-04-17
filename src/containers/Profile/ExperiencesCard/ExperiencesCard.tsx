import { Box, Button, Container, Grid, IconButton, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import LayoutCard from "../../../components/LayoutCard";
import API_ENDPOINTS from "../../../constants/api";
import { EXPERIENCES_ELLIPSE_LIMIT } from "../../../constants/app";
import { LABELS } from "../../../constants/labels";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { useUserContext } from "../../../contexts/UserContext";
import { useUserProfileModalContext } from "../../../contexts/UserProfileModalContext";
import { IUserExperienceApiModel } from "../../../interfaces/api/external";
import { getUserExperiences, putUserExperiences } from "../../../utils/api";
import AddExperience from "./AddExperience";
import EditExperience from "./EditExperience";
import ExperienceItem from "./ExperienceItem";
import cloneDeep from "lodash.clonedeep";

const ExperiencesCard: React.FC = () => {
  const { user, setUser } = useUserContext();
  const { authUser, accessToken } = useAuthContext();
  const { setSnackbar } = useSnackbarContext();
  const { profileModals, toggleModal } = useUserProfileModalContext();

  const [showMoreExperiences, setShowMoreExperiences] =
    useState<boolean>(false);
  const [isShowMoreExperiencesApplicable, setIsShowMoreExperiencesApplicable] =
    useState<boolean>(false);
  const [showEditExperienceModal, setShowEditExperienceModal] =
    useState<boolean>(false);
  const [userExperiencesEllpised, setUserExperiencesEllpised] =
    useState<IUserExperienceApiModel[]>();
  const [userExperiences, setUserExperiences] =
    useState<IUserExperienceApiModel[]>();
  const [putUserExperiencesReq, setPatchUserExperiencesReq] =
    useState<IUserExperienceApiModel[]>();
  const [selectedExperienceIndex, setSelectedExperienceIndex] =
    useState<number>(-1);
  const [experienceRemoving, setExperienceRemoving] = useState<boolean>(false);

  const {
    data: getUserExperiencesData,
    error: getUserExperiencesError,
    status: getUserExperiencesStatus,
    refetch: triggerGetUserExperiencesApi,
  } = useQuery(`${API_ENDPOINTS.USER_EXPERIENCES.key}:${user.id}`, () =>
    getUserExperiences(accessToken as string, user?.id as string)
  );

  const {
    data: putUserExperiencesData,
    error: putUserExperiencesError,
    status: putUserExperiencesStatus,
    isFetching: putUserExperiencesFetching,
    refetch: triggerPatchUserExperiencesApi,
  } = useQuery(
    `${API_ENDPOINTS.USER_EXPERIENCES.key}${user.id}`,
    () =>
      putUserExperiences(
        accessToken as string,
        user?.id as string,
        putUserExperiencesReq as IUserExperienceApiModel[]
      ),
    { enabled: false, cacheTime: 0 }
  );

  const handleAddExperienceModalOpen = () => {
    setSelectedExperienceIndex(-1);
    toggleModal("experiencesCardModal");
  };

  const handleAddExperienceModalClose = useCallback(() => {
    toggleModal("experiencesCardModal");
  }, [toggleModal]);

  const handleEditExperienceModalOpen = (experienceIndex: number) => {
    setSelectedExperienceIndex(experienceIndex);
    setShowEditExperienceModal(true);
  };

  const handleEditExperienceModalClose = () => {
    setShowEditExperienceModal(false);
  };

  const handleExperienceSave = (experience: IUserExperienceApiModel) => {
    const experiences: IUserExperienceApiModel[] = cloneDeep(
      userExperiences as IUserExperienceApiModel[]
    );
    if (selectedExperienceIndex < 0) {
      experiences.push(experience);
    } else {
      experiences[selectedExperienceIndex] = experience;
    }

    setPatchUserExperiencesReq(experiences);
  };

  const handleExperienceRemove = () => {
    let experiences: IUserExperienceApiModel[] = cloneDeep(
      userExperiences as IUserExperienceApiModel[]
    );
    experiences = experiences.filter(
      (_, index) => index != selectedExperienceIndex
    );
    setExperienceRemoving(true);
    setPatchUserExperiencesReq(experiences);
  };

  const handleShowLess = () => {
    setShowMoreExperiences(false);
  };

  const handleShowMore = () => {
    setShowMoreExperiences(true);
  };

  useEffect(() => {
    setIsShowMoreExperiencesApplicable(
      !!(userExperiences && userExperiences.length > EXPERIENCES_ELLIPSE_LIMIT)
    );
  }, [userExperiences]);

  useEffect(() => {
    if (getUserExperiencesData?.data) {
      setUserExperiences(
        () =>
          getUserExperiencesData.data?.experiences as IUserExperienceApiModel[]
      );
    }
    if ((getUserExperiencesData?.data?.experiences.length || 0) > 0) {
      setUser(prev => ({
        ...prev,
        profileStatus: { ...prev.profileStatus, isExperienceAddComplete: true },
      }));
    }
  }, [getUserExperiencesData?.data, setUser]);

  useEffect(() => {
    if (putUserExperiencesReq) {
      triggerPatchUserExperiencesApi();
    }
  }, [putUserExperiencesReq, triggerPatchUserExperiencesApi]);

  useEffect(() => {
    if (putUserExperiencesData?.data) {
      setUser(prev => ({
        ...prev,
        profileStatus: { ...prev.profileStatus, isExperienceAddComplete: true },
      }));
      setUserExperiences(putUserExperiencesData.data.experiences);
      setExperienceRemoving(false);
      handleAddExperienceModalClose();
      handleEditExperienceModalClose();
    }
  }, [handleAddExperienceModalClose, putUserExperiencesData?.data, setUser]);

  useEffect(() => {
    if (putUserExperiencesStatus === "success") {
      setSnackbar?.(() => ({
        message: LABELS.SAVE_SUCCESS,
        messageType: "success",
      }));
    }
  }, [putUserExperiencesStatus, setSnackbar]);

  useEffect(() => {
    if (userExperiences) {
      if (isShowMoreExperiencesApplicable) {
        if (showMoreExperiences) {
          setUserExperiencesEllpised(userExperiences);
        } else {
          setUserExperiencesEllpised(
            userExperiences.slice(0, EXPERIENCES_ELLIPSE_LIMIT)
          );
        }
      } else {
        setUserExperiencesEllpised(userExperiences);
      }
    }
  }, [isShowMoreExperiencesApplicable, showMoreExperiences, userExperiences]);

  if (
    authUser?.id !== user.id &&
    userExperiences &&
    userExperiences.length <= 0
  ) {
    return <></>;
  }

  return (
    <Box my={1}>
      <LayoutCard>
        <LayoutCard.Header
          title={LABELS.EXPERIENCES_TITLE}
          helperText={user.isAuthUser ? LABELS.EXPERIENCE_HELPER : undefined}
        >
          {user.isAuthUser && (
            <>
              <IconButton onClick={handleAddExperienceModalOpen}>
                <AddCircleOutlineIcon color="primary" fontSize="large" />
              </IconButton>
            </>
          )}
        </LayoutCard.Header>

        <Container sx={experiencesLayoutCardContainer}>
          <Grid container spacing={2}>
            {userExperiencesEllpised?.map((experience, index) => (
              <Grid item xs={12} key={experience.companyName}>
                <ExperienceItem
                  experience={experience}
                  onEditExperienceClick={() =>
                    handleEditExperienceModalOpen(index)
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Container>

        {isShowMoreExperiencesApplicable && (
          <>
            {showMoreExperiences ? (
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

        {profileModals.experiencesCardModal && (
          <AddExperience
            showModal={profileModals.experiencesCardModal}
            onModalClose={handleAddExperienceModalClose}
            saveLoading={putUserExperiencesFetching}
            onSaveExperience={handleExperienceSave}
          />
        )}

        {showEditExperienceModal && (
          <EditExperience
            showModal={showEditExperienceModal}
            onModalClose={handleEditExperienceModalClose}
            saveLoading={!experienceRemoving && putUserExperiencesFetching}
            removeLoading={experienceRemoving && putUserExperiencesFetching}
            experience={
              userExperiences?.[
                selectedExperienceIndex
              ] as IUserExperienceApiModel
            }
            onSaveExperience={handleExperienceSave}
            onRemoveExperience={handleExperienceRemove}
          />
        )}
      </LayoutCard>
    </Box>
  );
};

const experiencesCardEditBtn: SxProps<Theme> = (theme: Theme) => ({
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

const experiencesLayoutCardContainer: SxProps<Theme> = (theme: Theme) => ({
  paddingBottom: 3,
});

export default ExperiencesCard;
function setUser() {
  throw new Error("Function not implemented.");
}
