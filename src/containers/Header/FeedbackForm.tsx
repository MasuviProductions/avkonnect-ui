import { Autocomplete, Container, Grid, TextField, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import CustomButton from "../../components/CustomButton";
import ModalLayout, { IModal } from "../../components/ModalLayout/ModalLayout";
import API_ENDPOINTS from "../../constants/api";
import {
  FEEDBACK_TEXT_FIELDS_CONFIG,
  IFeedbackTextFields,
} from "../../constants/forms/feedback";
import { LABELS } from "../../constants/labels";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import useTextFieldsWithValidation from "../../hooks/useTextFieldsWithValidation";
import { IUserFeedbackApiResponse } from "../../interfaces/api/external";
import { postUserFeedback } from "../../utils/api";

interface IFeedbackFormProps extends IModal {}

const FeedbackForm: React.FC<IFeedbackFormProps> = ({
  showModal,
  onModalClose,
}) => {
  const [userFeedbackReq, setUserFeedbackReq] =
    useState<IUserFeedbackApiResponse>();

  const { textFields, onFieldValueChange, onFieldValueBlur } =
    useTextFieldsWithValidation<IFeedbackTextFields>(
      FEEDBACK_TEXT_FIELDS_CONFIG
    );

  const { accessToken, authUser } = useAuthContext();
  const { setSnackbar } = useSnackbarContext();

  const { status: userFeedbackStatus, isFetching: userFeedbackLoading } =
    useQuery(
      API_ENDPOINTS.USER_FEEDBACK.key,
      () =>
        postUserFeedback(
          accessToken as string,
          authUser?.id as string,
          userFeedbackReq as IUserFeedbackApiResponse
        ),
      { enabled: !!userFeedbackReq, cacheTime: 0 }
    );

  const handleSubmitFeedback = () => {
    setUserFeedbackReq({
      subject: textFields.subject.value,
      description: textFields.description.value,
      feedbackType: textFields.feedbackType.value,
    });
  };

  useEffect(() => {
    if (userFeedbackStatus === "success") {
      setSnackbar?.({
        message: LABELS.FEEDBACK_THANK_YOU,
        messageType: "success",
      });

      onModalClose();
    }

    if (userFeedbackStatus === "error") {
      setSnackbar?.({
        message: LABELS.FEEDBACK_SUBMIT_ERROR,
        messageType: "error",
      });
    }
  }, [onModalClose, setSnackbar, userFeedbackStatus]);

  return (
    <>
      <ModalLayout
        title={LABELS.FEEDBACK}
        showModal={showModal}
        onModalClose={onModalClose}
      >
        <Container>
          <Grid container py={2} spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                value={textFields.subject.value}
                label={textFields.subject.label}
                onChange={(event) => onFieldValueChange(event, "subject")}
                onBlur={(event) => onFieldValueBlur(event, "subject")}
                sx={textField}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Autocomplete
                disablePortal
                value={textFields.feedbackType.value}
                options={textFields.feedbackType.options as Readonly<string[]>}
                sx={textField}
                renderInput={(params) => (
                  <TextField
                    helperText={textFields.feedbackType.message}
                    error={!!(textFields.feedbackType.messageType === "error")}
                    label={textFields.feedbackType.label}
                    {...params}
                  />
                )}
                onChange={(event, value) =>
                  onFieldValueChange(event, "feedbackType", value)
                }
                filterSelectedOptions
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                multiline
                rows={3}
                value={textFields.description.value}
                label={textFields.description.label}
                onChange={(event) => onFieldValueChange(event, "description")}
                onBlur={(event) => onFieldValueBlur(event, "description")}
                sx={textField}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container justifyContent="flex-end" py={3}>
                <Grid item>
                  <CustomButton
                    loading={userFeedbackLoading}
                    disabled={userFeedbackLoading}
                    onClick={handleSubmitFeedback}
                  >
                    {LABELS.SUBMIT}
                  </CustomButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </ModalLayout>
    </>
  );
};

const textField: SxProps<Theme> = (theme: Theme) => ({
  width: " 100%",
  color: theme.palette.text.primary,
  "& label.Mui-focused": {
    color: theme.palette.text.primary,
  },

  ".MuiOutlinedInput-root": {
    fieldset: {
      borderColor: theme.palette.grey[500],
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.grey[500],
    },
  },

  ".MuiButtonBase-root": {
    color: theme.palette.text.primary,
  },
});

export default FeedbackForm;
