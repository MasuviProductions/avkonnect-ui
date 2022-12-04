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
import SearchBar from "../Header/SearchBar";

interface IBlockingModalProps extends IModal {}

const BlockingModal: React.FC<IBlockingModalProps> = ({
  showModal,
  onModalClose,
}) => {
  return (
    <>
      <ModalLayout
        title={LABELS.SETTINGS_BLOCKING_INFO}
        showModal={showModal}
        onModalClose={onModalClose}
      >
        <Container>
          blocking info
          {/* <SearchBar/> */}
        {/*  <Grid container py={2} spacing={3}>
            //  <Grid item xs={12} md={6}>
            //   <TextField
            //     value={textFields.subject.value}
            //     label={textFields.subject.label}
            //     onChange={event => onFieldValueChange(event, "subject")}
            //     onBlur={onFieldValueBlur("subject")}
            //     sx={textField}
            //     required={textFields.subject.isRequired}
            //     error={textFields.subject.isError || false}
            //     color={
            //       textFields.subject.messageType === "warning"
            //         ? "warning"
            //         : undefined
            //     }
            //     helperText={textFields.subject.message}
            //   />
            // </Grid>

            // <Grid item xs={12} md={6}>
            //   <Autocomplete
            //     disablePortal
            //     value={textFields.feedbackType.value}
            //     options={textFields.feedbackType.options as Readonly<string[]>}
            //     sx={textField}
            //     renderInput={params => (
            //       <TextField
            //         label={textFields.feedbackType.label}
            //         required={textFields.feedbackType.isRequired}
            //         error={textFields.feedbackType.isError || false}
            //         color={
            //           textFields.feedbackType.messageType === "warning"
            //             ? "warning"
            //             : undefined
            //         }
            //         helperText={textFields.feedbackType.message}
            //         {...params}
            //       />
            //     )}
            //     onChange={(event, value) =>
            //       onFieldValueChange(event, "feedbackType", value)
            //     }
            //     filterSelectedOptions
            //   />
            // </Grid>

            // <Grid item xs={12}>
            //   <TextField
            //     multiline
            //     rows={3}
            //     value={textFields.description.value}
            //     label={textFields.description.label}
            //     onChange={event => onFieldValueChange(event, "description")}
            //     onBlur={onFieldValueBlur("description")}
            //     sx={textField}
            //     required={textFields.description.isRequired}
            //     error={textFields.description.isError || false}
            //     color={
            //       textFields.description.messageType === "warning"
            //         ? "warning"
            //         : undefined
            //     }
            //     helperText={textFields.description.message}
            //   />
            // </Grid>

            // <Grid item xs={12}>
            //   <Grid container justifyContent="flex-end" py={3}>
            //     <Grid item>
            //       <CustomButton
            //         loading={userFeedbackLoading}
            //         disabled={
            //           !isFormInitialized || !isFormValid || userFeedbackLoading
            //         }
            //         onClick={handleSubmitFeedback}
            //       >
            //         {LABELS.SUBMIT}
            //       </CustomButton>
            //     </Grid>
            //   </Grid>
            // </Grid>
          </Grid> */}
        </Container>
      </ModalLayout>
    </>
  )
}

export default BlockingModal