import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Grid,
  TextField,
  Theme,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { SyntheticEvent } from "react";
import { SxProps } from "@mui/system";
import CustomButton from "../../../components/CustomButton";
import ModalLayout, {
  IModal,
} from "../../../components/ModalLayout/ModalLayout";
import { MAX_SKILL_LIMIT } from "../../../constants/app";
import { LABELS } from "../../../constants/labels";
import { IUserSkillSetApiModel } from "../../../interfaces/api/external";
import cloneDeep from "lodash.clonedeep";
import { SKILLS_LIST } from "../../../constants/skills";

interface IAddSkillsProps extends IModal {
  skillsets: IUserSkillSetApiModel[];
  loading?: boolean;
  onSave?: (skillsets: IUserSkillSetApiModel[]) => void;
}

const AddSkills: React.FC<IAddSkillsProps> = ({
  skillsets,
  loading = false,
  onSave,
  showModal,
  onModalClose,
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [dropdownSkills, setDropdownSkills] = useState<string[]>([]);
  const [helperText, setHelperText] = useState<string>("");

  const handleSelectedSkillsChange = (
    _event: SyntheticEvent<Element, Event>,
    value: string[] | null,
    _reason: AutocompleteChangeReason,
    _details?: AutocompleteChangeDetails | undefined
  ): void => {
    if (value && skillsets.length + value.length <= MAX_SKILL_LIMIT) {
      setHelperText("");
      setSelectedSkills([...value]);
    } else {
      setHelperText(`${LABELS.MAX_SKILL_LIMIT} ${MAX_SKILL_LIMIT}`);
    }
  };

  const handleAddSkillClick = () => {
    const updatedSkillsets = cloneDeep(skillsets);
    selectedSkills.forEach((skill) => {
      updatedSkillsets?.push({
        name: skill,
        endorsers: [],
      });
    });
    onSave?.(updatedSkillsets);
  };

  useEffect(() => {
    const filteredSkills: string[] = [];
    SKILLS_LIST.forEach((skillName) => {
      const skill = skillsets.find((skillset) => skillset.name === skillName);
      if (!skill) {
        filteredSkills.push(skillName);
      }
    });
    setDropdownSkills(filteredSkills);
  }, [skillsets]);

  return (
    <>
      <ModalLayout
        title={LABELS.SKILLS_TITLE}
        maxWidth="sm"
        showModal={showModal}
        onModalClose={onModalClose}
      >
        <Grid container p={3} justifyContent="flex-end">
          <Grid item xs={12}>
            <Autocomplete
              multiple
              disablePortal
              id="combo-box-demo"
              value={selectedSkills}
              options={dropdownSkills}
              sx={skillSelectorField}
              renderInput={(params) => (
                <TextField
                  helperText={helperText}
                  error={!!helperText}
                  {...params}
                  focused
                />
              )}
              onChange={handleSelectedSkillsChange}
              filterSelectedOptions
            />
          </Grid>
          <Grid item py={3}>
            <CustomButton
              loading={loading}
              disabled={loading || selectedSkills.length <= 0}
              onClick={handleAddSkillClick}
            >
              {LABELS.SAVE}
            </CustomButton>
          </Grid>
        </Grid>
      </ModalLayout>
    </>
  );
};

const skillSelectorField: SxProps<Theme> = (theme: Theme) => ({
  width: " 100%",
  color: theme.palette.text.primary,
  "& label.Mui-focused": {
    color: theme.palette.text.primary,
  },

  ".MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.grey[500],
    },
  },

  ".MuiButtonBase-root": {
    color: theme.palette.text.primary,
  },
});

export default AddSkills;
