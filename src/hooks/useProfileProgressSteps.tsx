import { useEffect, useMemo, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { IUserProfileModalTypes } from "../contexts/UserProfileModalContext";
import { LABELS } from "../constants/labels";

interface IUserProfileProgressStep {
  userProgressLabel: string;
  userProgressInfo: string;
  userProgressStatusVal: boolean;
  userProgressSkippable: boolean;
  userProgressModal: IUserProfileModalTypes;
}

const useProfileProgressSteps = () => {
  const { user } = useUserContext();
  const [completedUserProfileStepsLength, setCompletedUserProfileStepsLength] =
    useState<number>(0);
  const [profileProgressCompleted, setProfileProgressCompleted] =
    useState<boolean>(true);

  const profileProgressSteps: IUserProfileProgressStep[] = useMemo(
    () => [
      {
        userProgressLabel: LABELS.USER_PROFILE_PROGRESS_PROFILE_STEP_LABEL,
        userProgressInfo: LABELS.USER_PROFILE_PROGRESS_PROFILE_STEP_INFO,
        userProgressStatusVal:
          user?.profileStatus?.isUserProfileDetailsComplete,
        userProgressSkippable: false,
        userProgressModal: "userProfileInfoCardModal" as IUserProfileModalTypes,
      },
      {
        userProgressLabel: LABELS.USER_PROFILE_PROGRESS_ABOUT_STEP_LABEL,
        userProgressInfo: LABELS.USER_PROFILE_PROGRESS_ABOUT_STEP_INFO,
        userProgressStatusVal: user?.profileStatus?.isAboutUserAddComplete,
        userProgressSkippable: false,
        userProgressModal: "aboutCardModal" as IUserProfileModalTypes,
      },
      {
        userProgressLabel: LABELS.USER_PROFILE_PROGRESS_SKILL_STEP_LABEL,
        userProgressInfo: LABELS.USER_PROFILE_PROGRESS_SKILL_STEP_INFO,
        userProgressStatusVal: user?.profileStatus?.isSkillAddComplete,
        userProgressSkippable: false,
        userProgressModal: "skillsCardModal" as IUserProfileModalTypes,
      },
      {
        userProgressLabel: LABELS.USER_PROFILE_PROGRESS_EXPERIENCE_STEP_LABEL,
        userProgressInfo: LABELS.USER_PROFILE_PROGRESS_EXPERIENCE_STEP_INFO,
        userProgressStatusVal: user?.profileStatus?.isExperienceAddComplete,
        userProgressSkippable: false,
        userProgressModal: "experiencesCardModal" as IUserProfileModalTypes,
      },
      {
        userProgressLabel: LABELS.USER_PROFILE_PROGRESS_PROJECT_STEP_LABEL,
        userProgressInfo: LABELS.USER_PROFILE_PROGRESS_PROJECT_STEP_INFO,
        userProgressStatusVal: user?.profileStatus?.isProjectAddComplete,
        userProgressSkippable: true,
        userProgressModal: "projectsCardModal" as IUserProfileModalTypes,
      },
      {
        userProgressLabel: LABELS.USER_PROFILE_PROGRESS_CERTIFICATE_STEP_LABEL,
        userProgressInfo: LABELS.USER_PROFILE_PROGRESS_CERTIFICATE_STEP_INFO,
        userProgressStatusVal: user?.profileStatus?.isCertificationAddComplete,
        userProgressSkippable: true,
        userProgressModal: "certificatesCardModal" as IUserProfileModalTypes,
      },
    ],
    [
      user?.profileStatus?.isAboutUserAddComplete,
      user?.profileStatus?.isCertificationAddComplete,
      user?.profileStatus?.isExperienceAddComplete,
      user?.profileStatus?.isProjectAddComplete,
      user?.profileStatus?.isSkillAddComplete,
      user?.profileStatus?.isUserProfileDetailsComplete,
    ]
  );

  useEffect(() => {
    const stepsLength = profileProgressSteps.reduce(
      (previousValue: number, currentValue: IUserProfileProgressStep) => {
        if (currentValue.userProgressStatusVal) {
          return ++previousValue;
        }
        return previousValue;
      },
      0
    );
    setCompletedUserProfileStepsLength(stepsLength);
  }, [profileProgressSteps]);

  useEffect(() => {
    setProfileProgressCompleted(
      Object.entries(user.profileStatus).reduce(
        (previousValue: boolean, currentValue: [string, boolean]) => {
          return currentValue[1] && previousValue;
        },
        true
      )
    );
  }, [user.profileStatus]);

  return {
    profileProgressSteps,
    completedUserProfileStepsLength,
    profileProgressCompleted,
  };
};

export default useProfileProgressSteps;
