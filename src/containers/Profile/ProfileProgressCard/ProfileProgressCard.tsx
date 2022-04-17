import React, { useState } from "react";
import { ReactFCWithSkeleton } from "../../../interfaces/app";
import ProfileProgressCardSkeleton from "./ProfileProgressCardSkeleton";
import { LABELS } from "../../../constants/labels";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Hidden,
  Typography,
  Theme,
} from "@mui/material";
import LayoutCard from "../../../components/LayoutCard";
import LayoutCardHeader from "../../../components/LayoutCard/LayoutCardHeader";
import { SxProps } from "@mui/system";
import useProfileProgressSteps from "../../../hooks/useProfileProgressSteps";
import { useUserProfileModalContext } from "../../../contexts/UserProfileModalContext";
import { useUserContext } from "../../../contexts/UserContext";
import { useAuthContext } from "../../../contexts/AuthContext";

interface IProfileProgressCardProps {}

const ProfileProgressCard: ReactFCWithSkeleton<IProfileProgressCardProps> =
  () => {
    const { user } = useUserContext();
    const { authUser } = useAuthContext();

    const [currentProfileProgressStep, setCurrentProfileProgressStep] =
      useState<number>(0);

    const { profileProgressSteps, profileProgressCompleted } =
      useProfileProgressSteps();
    const { editModalType } = useUserProfileModalContext();

    const handleActiveProfileProgressClick = (index: number) => () => {
      setCurrentProfileProgressStep(index);
      editModalType(profileProgressSteps[index].userProgressModal, true);
    };
    if (authUser?.id !== user.id) {
      return <></>;
    }

    return (
      <Box>
        {profileProgressCompleted ? (
          <></>
        ) : (
          <LayoutCard>
            <Box my={1}>
              <LayoutCardHeader
                title={LABELS.USER_PROFILE_PROGRESS_INCOMPLETE}
              ></LayoutCardHeader>
              <Box mx={2} pl={1}>
                <Typography variant="subtitle2">
                  {LABELS.USER_PROFILE_PROGRESS_INCOMPLETE_INFO}
                </Typography>
              </Box>
              <Hidden mdUp>
                <Box py={2} sx={profileStepperVertBoxSx}>
                  <Stepper
                    activeStep={currentProfileProgressStep}
                    orientation={"vertical"}
                    sx={profileProgressStepperSx}
                  >
                    {profileProgressSteps.map((progressStep, index) => (
                      <Step
                        key={index}
                        completed={progressStep.userProgressStatusVal}
                      >
                        <StepLabel
                          onClick={handleActiveProfileProgressClick(index)}
                        >
                          {progressStep.userProgressLabel}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Hidden>
              <Hidden mdDown>
                <Box py={2} sx={profileStepperHorizBoxSx}>
                  <Stepper
                    alternativeLabel
                    nonLinear
                    activeStep={currentProfileProgressStep}
                    orientation={"horizontal"}
                    sx={profileProgressStepperSx}
                  >
                    {profileProgressSteps.map((progressStep, index) => (
                      <Step
                        key={index}
                        completed={progressStep.userProgressStatusVal}
                      >
                        <StepLabel
                          onClick={handleActiveProfileProgressClick(index)}
                        >
                          {progressStep.userProgressLabel}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Hidden>
            </Box>
          </LayoutCard>
        )}
      </Box>
    );
  };

ProfileProgressCard.Skeleton = ProfileProgressCardSkeleton;

const profileStepperHorizBoxSx: SxProps<Theme> = () => ({
  ":hover": {
    cursor: "pointer",
  },
});

const profileStepperVertBoxSx: SxProps<Theme> = () => ({
  paddingX: "16px",
});

const profileProgressStepperSx: SxProps<Theme> = (theme: Theme) => ({
  ".MuiStep-horizontal > .MuiStepLabel-horizontal > .MuiStepLabel-iconContainer > .MuiSvgIcon-fontSizeMedium.MuiStepIcon-root > text, .MuiStep-vertical > .MuiStepLabel-vertical > .MuiStepLabel-iconContainer > .MuiSvgIcon-fontSizeMedium.MuiStepIcon-root > text":
    {
      fill: `${theme.palette.text.primary}`,
    },
});

export default ProfileProgressCard;
