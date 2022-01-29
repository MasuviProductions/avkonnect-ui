import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Box, Button, Container, IconButton, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import SkillItem from "./SkillItem";
import { useUserContext } from "../../../contexts/UserContext";
import LayoutCard from "../../../components/LayoutCard";
import { LABELS } from "../../../constants/labels";
import API_ENDPOINTS from "../../../constants/api";
import { getUserSkills, putUserSkills } from "../../../utils/api";
import { useAuthContext } from "../../../contexts/AuthContext";
import { IUserSkillSetApiModel } from "../../../interfaces/api/external";
import cloneDeep from "lodash.clonedeep";
import AddSkills from "./AddSkills";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import EditSkills from "./EditSkills";
import { SKILL_ELLIPSE_LIMIT } from "../../../constants/app";

const SkillsCard: React.FC = () => {
  const { user } = useUserContext();
  const { authUser, accessToken } = useAuthContext();
  const { setSnackbar } = useSnackbarContext();

  const [showMoreSkills, setShowMoreSkills] = useState<boolean>(false);
  const [isShowMoreSkillsApplicable, setIsShowMoreSkillsApplicable] =
    useState<boolean>(false);
  const [skillUnderUpdate, setSkillUnderUpdate] = useState<string>("");
  const [showAddSkillsModal, setShowAddSkillsModal] = useState<boolean>(false);
  const [showEditSkillsModal, setShowEditSkillsModal] =
    useState<boolean>(false);
  const [userSkillsetsEllpised, setUserSkillsetsEllpised] =
    useState<IUserSkillSetApiModel[]>();
  const [userSkillsets, setUserSkillsets] = useState<IUserSkillSetApiModel[]>();
  const [patchUserSkillReq, setPatchUserSkillReq] =
    useState<IUserSkillSetApiModel[]>();

  const {
    data: getUserSkillsData,
    error: getUserSkillsError,
    status: getUserSkillsStatus,
    refetch: triggerGetUserSkillsApi,
  } = useQuery(`${API_ENDPOINTS.USER_SKILLS.key}:${user.id}`, () =>
    getUserSkills(accessToken as string, user?.id as string)
  );

  const {
    data: patchUserSkillsData,
    error: patchUserSkillsError,
    status: patchUserSkillsStatus,
    isFetching: patchUserSkillFetching,
    refetch: triggerPatchUserSkillsApi,
  } = useQuery(
    `${API_ENDPOINTS.USER_SKILLS.key}${user.id}`,
    () =>
      putUserSkills(
        accessToken as string,
        user?.id as string,
        patchUserSkillReq as IUserSkillSetApiModel[]
      ),
    { enabled: false, cacheTime: 0 }
  );

  const handleAddSkillsModalOpen = () => {
    setShowAddSkillsModal(true);
  };

  const handleAddSkillsModalClose = () => {
    setShowAddSkillsModal(false);
  };

  const handleEditSkillsModalOpen = () => {
    setShowEditSkillsModal(true);
  };

  const handleEditSkillsModalClose = () => {
    setShowEditSkillsModal(false);
  };

  const handleEndorseUserSkill = (
    customKey: string,
    skillName: string,
    rating: number,
    relationshipWithUser: string
  ) => {
    setSkillUnderUpdate(customKey);
    const updatedSkillsets = cloneDeep(userSkillsets);
    updatedSkillsets?.every((skillset) => {
      if (skillset.name === skillName) {
        skillset.endorsers.push({
          endorserId: authUser?.id as string,
          rating: rating,
          relationWithUser: relationshipWithUser,
        });
        return false;
      }
      return true;
    });
    setPatchUserSkillReq(updatedSkillsets);
  };

  const handleUnendorseUserSkill = (customKey: string, skillName: string) => {
    setSkillUnderUpdate(customKey);
    const updatedSkillsets = cloneDeep(userSkillsets);
    updatedSkillsets?.every((skillset) => {
      if (skillset.name === skillName) {
        for (let i = 0; i <= skillset.endorsers.length; i += 1) {
          if ((skillset.endorsers[i].endorserId = user.id)) {
            skillset.endorsers[i] =
              skillset.endorsers[skillset.endorsers.length - 1];
            skillset.endorsers.pop();
            break;
          }
        }
        return false;
      }
      return true;
    });
    setPatchUserSkillReq(updatedSkillsets);
  };

  const handleAddSkillSave = (skillsets: IUserSkillSetApiModel[]) => {
    setPatchUserSkillReq(skillsets);
  };

  const handleEditSkillsSave = (skillsets: IUserSkillSetApiModel[]) => {
    setPatchUserSkillReq(skillsets);
  };

  const handleShowLess = () => {
    setShowMoreSkills(false);
  };

  const handleShowMore = () => {
    setShowMoreSkills(true);
  };

  useEffect(() => {
    setIsShowMoreSkillsApplicable(
      !!(userSkillsets && userSkillsets.length > SKILL_ELLIPSE_LIMIT)
    );
  }, [userSkillsets]);

  useEffect(() => {
    if (getUserSkillsData?.data) {
      setUserSkillsets(
        () => getUserSkillsData.data?.skillSets as IUserSkillSetApiModel[]
      );
    }
  }, [getUserSkillsData?.data]);

  useEffect(() => {
    if (patchUserSkillReq) {
      triggerPatchUserSkillsApi();
    }
  }, [patchUserSkillReq, triggerPatchUserSkillsApi]);

  useEffect(() => {
    if (patchUserSkillsData?.data) {
      setUserSkillsets(patchUserSkillsData.data.skillSets);
      handleAddSkillsModalClose();
      handleEditSkillsModalClose();
    }
  }, [patchUserSkillsData?.data]);

  useEffect(() => {
    if (patchUserSkillsStatus === "success") {
      setSnackbar?.(() => ({
        message: LABELS.SAVE_SUCCESS,
        messageType: "success",
      }));
    }
  }, [patchUserSkillsStatus, setSnackbar]);

  useEffect(() => {
    if (userSkillsets) {
      if (isShowMoreSkillsApplicable) {
        if (showMoreSkills) {
          setUserSkillsetsEllpised(userSkillsets);
        } else {
          setUserSkillsetsEllpised(userSkillsets.slice(0, SKILL_ELLIPSE_LIMIT));
        }
      } else {
        setUserSkillsetsEllpised(userSkillsets);
      }
    }
  }, [isShowMoreSkillsApplicable, showMoreSkills, userSkillsets]);

  if (authUser?.id !== user.id && userSkillsets && userSkillsets.length <= 0) {
    return <></>;
  }

  return (
    <Box my={1}>
      <LayoutCard>
        <LayoutCard.Header title={LABELS.SKILLS_TITLE}>
          {user.isAuthUser && (
            <>
              <IconButton onClick={handleAddSkillsModalOpen}>
                <AddCircleOutlineIcon color="primary" fontSize="large" />
              </IconButton>

              {userSkillsets && userSkillsets.length > 0 && (
                <IconButton
                  sx={skillsCardEditBtn}
                  onClick={handleEditSkillsModalOpen}
                >
                  <EditIcon fontSize="medium" />
                </IconButton>
              )}
            </>
          )}
        </LayoutCard.Header>
        <Container sx={skillsLayoutCardContainer}>
          {userSkillsetsEllpised?.map((skillset) => (
            <SkillItem
              key={skillset.name}
              customKey={skillset.name}
              skillset={skillset}
              loading={
                patchUserSkillFetching && skillUnderUpdate === skillset.name
              }
              onAddEndorsement={handleEndorseUserSkill}
              onRemoveEndorsement={handleUnendorseUserSkill}
            />
          ))}
        </Container>

        {isShowMoreSkillsApplicable && (
          <>
            {showMoreSkills ? (
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

        {showAddSkillsModal && (
          <AddSkills
            showModal={showAddSkillsModal}
            onModalClose={handleAddSkillsModalClose}
            skillsets={userSkillsets as IUserSkillSetApiModel[]}
            onSave={handleAddSkillSave}
            loading={patchUserSkillFetching}
          />
        )}

        {showEditSkillsModal && (
          <EditSkills
            skillsets={userSkillsets as IUserSkillSetApiModel[]}
            showModal={showEditSkillsModal}
            onSave={handleEditSkillsSave}
            loading={patchUserSkillFetching}
            onModalClose={handleEditSkillsModalClose}
          />
        )}
      </LayoutCard>
    </Box>
  );
};

const skillsCardEditBtn: SxProps<Theme> = (theme: Theme) => ({
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

const skillsLayoutCardContainer: SxProps<Theme> = (theme: Theme) => ({
  paddingBottom: 3,
});

export default SkillsCard;
