import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { Divider, Grid, IconButton, Theme, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { IUserProjectApiModel } from "../../../interfaces/api/external";
import { LABELS } from "../../../constants/labels";
import UserMiniCard from "../../../components/UserMiniCard";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useUserContext } from "../../../contexts/UserContext";
import { MAX_DATE } from "../../../constants/app";
import { getLinkedTextIfURLIsPresent } from "../../../utils/generic";

interface IProjectItemProps {
  project: IUserProjectApiModel;
  onEditProjectClick?: () => void;
}

const ProjectItem: React.FC<IProjectItemProps> = ({
  project,
  onEditProjectClick,
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
                    <strong>{project.name}</strong>
                  </Typography>
                </Grid>
                <Grid item ml={1}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >{`\u2027 ${project.industry} ${LABELS.PROJECT_INDUSTRY}`}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item>
                  <Typography variant="body2">
                    {` ${project.companyName}`}
                  </Typography>
                </Grid>
                <Grid item ml={1}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >{`\u2027 ${project.employmentType}`}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {authUser?.id === user?.id && (
          <Grid item xs={2}>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <IconButton sx={projectEditBtn} onClick={onEditProjectClick}>
                  <EditIcon fontSize="medium" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary">
            {`${dayjs(project.startDate).format("MMM YYYY")} - ${
              project.endDate === MAX_DATE
                ? LABELS.PRESENT_DATE
                : dayjs(project.endDate).format("MMM YYYY")
            } `}
          </Typography>
        </Grid>

        <Grid item xs={12} pt={2}>
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{
              __html: getLinkedTextIfURLIsPresent(project.description),
            }}
          />
        </Grid>

        {project.collaborators && project.collaborators.length > 0 && (
          <>
            <Grid item xs={12} mt={2}>
              <Typography variant="body2">
                <strong>{LABELS.PROJECT_COLLOBORATORS}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {project.collaborators.map(collaborator => (
                  <Grid item key={collaborator.id} py={1}>
                    <UserMiniCard
                      id={collaborator.id}
                      name={collaborator.name}
                      headline={collaborator.headline}
                      displayPictureUrl={collaborator.displayPictureUrl}
                      onlyThumbnail
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </>
        )}

        <Grid item xs={12} py={2}>
          <Divider sx={projectDivider} />
        </Grid>
      </Grid>
    </>
  );
};

const projectEditBtn: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.text.primary,
  marginLeft: 2,
});

const projectDivider: SxProps<Theme> = (theme: Theme) => ({
  backgroundColor: theme.palette.text.secondary,
});

export default ProjectItem;
