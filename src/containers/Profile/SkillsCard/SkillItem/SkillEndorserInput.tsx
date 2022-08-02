import {
  Autocomplete,
  Grid,
  Rating,
  TextField,
  Typography,
  Theme,
  Button,
  Container,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { SyntheticEvent, useState } from "react";
import CustomButton from "../../../../components/CustomButton";
import ModalLayout, {
  IModal,
} from "../../../../components/ModalLayout/ModalLayout";
import {
  ISkillEndorseTextFields,
  SKILL_ENDORSE_RATING_LABEL,
  SKILL_ENDORSE_TEXT_FIELDS_CONFIG,
} from "../../../../constants/forms/skill";
import { LABELS } from "../../../../constants/labels";
import { useUserContext } from "../../../../contexts/UserContext";
import useTextFieldsWithValidation from "../../../../hooks/useTextFieldsWithValidation";

interface ISkillEndorserInputProps extends IModal {
  onSave?: (rating: number, relationship: string) => void;
  onSkip?: () => void;
}

const SkillEndorserInput: React.FC<ISkillEndorserInputProps> = ({
  onSave,
  onSkip,
  showModal,
  onModalClose,
}) => {
  const { user } = useUserContext();

  const {
    textFields,
    isFormInitialized,
    isFormValid,
    onFieldValueChange,
    onValidateAllFields,
  } = useTextFieldsWithValidation<ISkillEndorseTextFields>(
    SKILL_ENDORSE_TEXT_FIELDS_CONFIG
  );

  const [rating, setRating] = useState<number>(3);

  const onRatingChange = (
    _event: SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    setRating(value || 0);
  };

  const handleSubmitEndorsementDetails = () => {
    if (onValidateAllFields()) {
      onSave?.(rating, textFields.relationship.value);
    }
  };

  const handleSkipEndorsementDetails = () => onSkip?.();

  return (
    <ModalLayout showModal={showModal} onModalClose={onModalClose}>
      <Container>
        <Grid container py={2}>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h6">
                  {LABELS.ENDORSEMENT_RATING_TITLE(user.name)}
                </Typography>
              </Grid>
              <Grid item>
                <Rating
                  sx={ratingIcon}
                  value={rating}
                  onChange={onRatingChange}
                  size="large"
                />
              </Grid>

              <Grid item mx={2}>
                {SKILL_ENDORSE_RATING_LABEL[rating]}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} my={3}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6">
                  {LABELS.ENDORSEMENT_RELATIONSHIP_TITLE(user.name)}
                </Typography>
              </Grid>
              <Grid item xs={12} my={1}>
                <Autocomplete
                  disablePortal
                  value={textFields.relationship.value}
                  options={
                    textFields.relationship.options as Readonly<string[]>
                  }
                  sx={textField}
                  renderInput={params => (
                    <TextField
                      label={textFields.relationship.label}
                      required={textFields.relationship.isRequired}
                      error={textFields.relationship.isError || false}
                      color={
                        textFields.relationship.messageType === "warning"
                          ? "warning"
                          : undefined
                      }
                      helperText={textFields.relationship.message}
                      {...params}
                    />
                  )}
                  onChange={(event, value) =>
                    onFieldValueChange(event, "relationship", value)
                  }
                  filterSelectedOptions
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="flex-end" py={3}>
              <Grid item px={2}>
                <Button
                  variant="outlined"
                  onClick={handleSkipEndorsementDetails}
                >
                  {LABELS.SKIP}
                </Button>
              </Grid>
              <Grid item>
                <CustomButton
                  disabled={!isFormInitialized || !isFormValid}
                  onClick={handleSubmitEndorsementDetails}
                >
                  {LABELS.SUBMIT}
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </ModalLayout>
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
      borderColor: theme.palette.secondary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main,
    },
  },

  ".MuiButtonBase-root": {
    color: theme.palette.text.primary,
  },
});

const ratingIcon: SxProps<Theme> = (theme: Theme) => ({
  ".MuiRating-iconEmpty": {
    color: theme.palette.text.secondary,
  },
});

export default SkillEndorserInput;
