import React, { useEffect, useState } from "react";
import { ReactFCWithSkeleton } from "../../../interfaces/app";
import ProfileProgressCardSkeleton from "./ProfileProgressCardSkeleton";
import { LABELS } from "../../../constants/labels";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Typography,
  Theme,
} from "@mui/material";
import LayoutCard from "../../../components/LayoutCard";
import LayoutCardHeader from "../../../components/LayoutCard/LayoutCardHeader";
import { SxProps } from "@mui/system";
import { UserProfileProgressSteps } from "../../../constants/app";
import { useUserProfileModalContext } from "../../../contexts/UserProfileModalContext";

interface IProfileProgressCardProps {}

const ProfileProgressCard: ReactFCWithSkeleton<IProfileProgressCardProps> =
  () => {
    const [allProfileProgressCompleted, setAllProfileProgressCompleted] =
      useState<boolean>(false);
    const [currentProfileProgressStep, setCurrentProfileProgressStep] =
      useState<number>(0);

    const USER_PROFILE_PROGRESS_STEPS = UserProfileProgressSteps();
    const { toggleModal } = useUserProfileModalContext();

    const profileProgressLength = () => {
      return USER_PROFILE_PROGRESS_STEPS.length;
    };

    const completedProgressStepsLength = () => {
      let completedStepsCount: number = 0;
      USER_PROFILE_PROGRESS_STEPS.forEach(step => {
        if (step.USER_PROGRESS_STATUS_VAL === true) {
          completedStepsCount++;
        }
      });
      return completedStepsCount;
    };

    const allProfileProgressStepsCompleted = () => {
      if (completedProgressStepsLength() === profileProgressLength()) {
        setAllProfileProgressCompleted(true);
        return true;
      } else {
        return false;
      }
    };

    const finalProfileProgressStep = () => {
      return currentProfileProgressStep === profileProgressLength() - 1;
    };

    const handleCompleteProfileProgress = () => {
      toggleModal(
        USER_PROFILE_PROGRESS_STEPS[currentProfileProgressStep]
          .USER_PROGRESS_MODAL
      );
      if (finalProfileProgressStep() && !allProfileProgressStepsCompleted()) {
        USER_PROFILE_PROGRESS_STEPS.every((step, idx) => {
          if (step.USER_PROGRESS_STATUS_VAL === false) {
            setCurrentProfileProgressStep(idx);
          }
        });
      } else {
        setCurrentProfileProgressStep(currentProfileProgressStep + 1);
      }
    };

    const handleActiveProfileProgressClick = (index: number) => () => {
      setCurrentProfileProgressStep(index);
    };

    useEffect(() => {
      USER_PROFILE_PROGRESS_STEPS.forEach(step => {
        if (step.USER_PROGRESS_STATUS_VAL === true) {
          setAllProfileProgressCompleted(true);
        } else {
          setAllProfileProgressCompleted(false);
        }
      });
    }, [USER_PROFILE_PROGRESS_STEPS]);

    return (
      <Box my={1}>
        <LayoutCard>
          {allProfileProgressCompleted ? (
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
              <Box py={2} sx={profileStepperBoxSx}>
                <Stepper
                  alternativeLabel
                  nonLinear
                  activeStep={currentProfileProgressStep}
                >
                  {USER_PROFILE_PROGRESS_STEPS.map((progressStep, index) => (
                    <Step
                      key={index}
                      completed={progressStep.USER_PROGRESS_STATUS_VAL}
                    >
                      <StepLabel
                        onClick={handleActiveProfileProgressClick(index)}
                      >
                        {progressStep.USER_PROGRESS_LABEL}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              <Box m={2} py={2} sx={profileInfoDisplaySx}>
                <Typography>
                  {
                    USER_PROFILE_PROGRESS_STEPS[currentProfileProgressStep]
                      ?.USER_PROGRESS_INFO
                  }
                </Typography>
                {USER_PROFILE_PROGRESS_STEPS[currentProfileProgressStep]
                  .USER_PROGRESS_STATUS_VAL ? (
                  <Box px={2} mr={2}>
                    <Typography variant="h6">
                      {LABELS.USER_PROFILE_PROGRESS_STEP_COMPLETED}
                    </Typography>
                  </Box>
                ) : (
                  <Box px={2} mr={2}>
                    <Box mr={1} display="inline">
                      <Button
                        variant="contained"
                        onClick={handleCompleteProfileProgress}
                      >
                        {LABELS.USER_PROFILE_BUTTON_GO}
                      </Button>
                    </Box>
                    {USER_PROFILE_PROGRESS_STEPS[currentProfileProgressStep]
                      ?.USER_PROGRESS_SKIPPABLE ? (
                      <Button variant="outlined">
                        {LABELS.USER_PROFILE_BUTTON_SKIP}
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </LayoutCard>
      </Box>
    );
  };

ProfileProgressCard.Skeleton = ProfileProgressCardSkeleton;

const profileStepperBoxSx: SxProps<Theme> = () => ({
  ":hover": {
    cursor: "pointer",
  },
});

const profileInfoDisplaySx: SxProps<Theme> = () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export default ProfileProgressCard;
