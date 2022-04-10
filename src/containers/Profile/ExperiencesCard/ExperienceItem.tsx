import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { Divider, Grid, IconButton, Theme, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { IUserExperienceApiModel } from "../../../interfaces/api/external";
import { LABELS } from "../../../constants/labels";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useUserContext } from "../../../contexts/UserContext";
import { MAX_DATE } from "../../../constants/app";
import { getLinkedTextIfURLIsPresent } from "../../../utils/generic";

interface IExperienceItemProps {
  experience: IUserExperienceApiModel;
  onEditExperienceClick?: () => void;
}

const ExperienceItem: React.FC<IExperienceItemProps> = ({
  experience,
  onEditExperienceClick,
}) => {
  const { authUser } = useAuthContext();
  const { user } = useUserContext();
  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container>
                <Grid item>
                  <Typography variant="body2">
                    <strong>{experience.companyName}</strong>
                  </Typography>
                </Grid>

                <Grid item ml={1}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >{`\u2027 ${experience.industry} ${LABELS.EXPERIENCE_INDUSTRY} \u2027 ${experience.employmentType}`}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item>
                  <Typography variant="body2" color="text.secondary">
                    {`${dayjs(experience.startDate).format("MMM YYYY")} - ${
                      experience.endDate === MAX_DATE
                        ? LABELS.PRESENT_DATE
                        : dayjs(experience.endDate).format("MMM YYYY")
                    } `}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {authUser?.id === user?.id && (
          <Grid item xs={2}>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <IconButton
                  sx={experienceEditBtn}
                  onClick={onEditExperienceClick}
                >
                  <EditIcon fontSize="medium" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12} pt={2}>
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{
              __html: getLinkedTextIfURLIsPresent(experience.description),
            }}
          />
        </Grid>

        <Grid item xs={12} py={2}>
          <Divider sx={experienceDivider} />
        </Grid>
      </Grid>
    </>
  );
};

const experienceEditBtn: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.text.primary,
});

const experienceDivider: SxProps<Theme> = (theme: Theme) => ({
  backgroundColor: theme.palette.text.secondary,
});

export default ExperienceItem;
