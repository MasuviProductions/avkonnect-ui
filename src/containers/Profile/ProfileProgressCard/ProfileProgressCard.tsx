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

interface IProfileProgressCardProps {}

const ProfileProgressCard: ReactFCWithSkeleton<IProfileProgressCardProps> =
  () => {
    const [currentProfileProgressStep, setCurrentProfileProgressStep] =
      useState<number>(0);

    const { profileProgressSteps, profileProgressCompleted } =
      useProfileProgressSteps();
    const { toggleModal } = useUserProfileModalContext();

    const handleActiveProfileProgressClick = (index: number) => () => {
      setCurrentProfileProgressStep(index);
      toggleModal(profileProgressSteps[index].userProgressModal);
    };

    return (
      <Box my={1}>
        <LayoutCard>
          {profileProgressCompleted ? (
            <Box>
              <LayoutCardHeader
                title={LABELS.USER_PROFILE_PROGRESS_COMPLETE}
              ></LayoutCardHeader>
              <Box py={2} px={3}>
                <Typography>
                  {LABELS.USER_PROFILE_PROGRESS_COMPLETE_TEXT}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box>
              <LayoutCardHeader
                title={LABELS.USER_PROFILE_PROGRESS_INCOMPLETE}
                helperText={LABELS.USER_PROFILE_PROGRESS_INCOMPLETE_HELPER}
              ></LayoutCardHeader>
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
          )}
        </LayoutCard>
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
  marginLeft: "1rem",
});

const profileProgressStepperSx: SxProps<Theme> = () => ({
  ".MuiStep-horizontal > .MuiStepLabel-horizontal > .MuiStepLabel-iconContainer > .MuiSvgIcon-fontSizeMedium.MuiStepIcon-root > text, .MuiStep-vertical > .MuiStepLabel-vertical > .MuiStepLabel-iconContainer > .MuiSvgIcon-fontSizeMedium.MuiStepIcon-root > text":
    {
      fill: "#777 !important",
    },
});

export default ProfileProgressCard;
