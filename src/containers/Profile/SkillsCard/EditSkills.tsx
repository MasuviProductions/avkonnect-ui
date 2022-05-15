import { Grid, IconButton, Typography, Theme } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { SxProps } from "@mui/system";
import CustomButton from "../../../components/CustomButton";
import ModalLayout, {
  IModal,
} from "../../../components/ModalLayout/ModalLayout";
import { LABELS } from "../../../constants/labels";
import { IUserSkillSetApiModel } from "../../../interfaces/api/external";
import React, { useState } from "react";
import { useEffect } from "react";
import cloneDeep from "lodash.clonedeep";

interface IEditSkillsProps extends IModal {
  skillsets: IUserSkillSetApiModel[];
  loading?: boolean;
  onSave?: (skillsets: IUserSkillSetApiModel[]) => void;
}

const EditSkills: React.FC<IEditSkillsProps> = ({
  skillsets,
  loading = false,
  showModal,
  onModalClose,
  onSave,
}) => {
  const [updatedSkillsets, setUpdatedSkillsets] = useState<
    IUserSkillSetApiModel[]
  >([]);

  const handleSkillDelete = (event: React.MouseEvent, skillName: string) => {
    const matchedSkillIndex = updatedSkillsets.findIndex(
      skillset => skillset.name === skillName
    );
    if (matchedSkillIndex >= 0) {
      const newSkillsets = cloneDeep(updatedSkillsets);
      newSkillsets[matchedSkillIndex] = newSkillsets[newSkillsets.length - 1];
      newSkillsets.pop();
      setUpdatedSkillsets(newSkillsets);
    }
  };

  const handleSkillsSave = () => {
    onSave?.(updatedSkillsets);
  };

  useEffect(() => {
    setUpdatedSkillsets(skillsets);
  }, [skillsets]);

  return (
    <>
      <ModalLayout
        title={LABELS.EDIT_SKILLS}
        showModal={showModal}
        onModalClose={onModalClose}
        maxWidth="sm"
      >
        <Grid container justifyContent="flex-end" p={3}>
          <Grid item xs={12}>
            <Grid container>
              {updatedSkillsets.map(skill => (
                <Grid item xs={12} key={skill.name}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>{skill.name}</Typography>
                    </Grid>

                    <Grid item>
                      <IconButton
                        onClick={event => handleSkillDelete(event, skill.name)}
                      >
                        <DeleteForeverIcon
                          sx={skillsDeleteBtn}
                          fontSize="large"
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item mt={3}>
            <CustomButton
              onClick={handleSkillsSave}
              disabled={loading}
              loading={loading}
            >
              {LABELS.SAVE}
            </CustomButton>
          </Grid>
        </Grid>
      </ModalLayout>
    </>
  );
};

const skillsDeleteBtn: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.text.secondary,
});

export default EditSkills;
