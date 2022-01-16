import { Button, Container, Grid, IconButton, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import LayoutCard from "../../../components/LayoutCard";
import API_ENDPOINTS from "../../../constants/api";
import { PROJECTS_ELLIPSE_LIMIT } from "../../../constants/app";
import { LABELS } from "../../../constants/labels";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { useUserContext } from "../../../contexts/UserContext";
import { IUserProjectApiModel } from "../../../interfaces/api/external";
import { getUserProjects, putUserProjects } from "../../../utils/api";
import AddProject from "./AddProject";
import EditProject from "./EditProject";
import ProjectItem from "./ProjectItem";
import cloneDeep from "lodash.clonedeep";

const ProjectsCard: React.FC = () => {
  const { user } = useUserContext();
  const { authUser, accessToken } = useAuthContext();
  const { setSnackbar } = useSnackbarContext();

  const [showMoreProjects, setShowMoreProjects] = useState<boolean>(false);
  const [isShowMoreProjectsApplicable, setIsShowMoreProjectsApplicable] =
    useState<boolean>(false);
  const [showAddProjectModal, setShowAddProjectModal] =
    useState<boolean>(false);
  const [showEditProjectModal, setShowEditProjectModal] =
    useState<boolean>(false);
  const [userProjectsEllpised, setUserProjectsEllpised] =
    useState<IUserProjectApiModel[]>();
  const [userProjects, setUserProjects] = useState<IUserProjectApiModel[]>();
  const [patchUserProjectsReq, setPatchUserProjectsReq] =
    useState<IUserProjectApiModel[]>();
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(-1);
  const [projectRemoving, setProjectRemoving] = useState<boolean>(false);

  const {
    data: getUserProjectsData,
    error: getUserProjectsError,
    status: getUserProjectsStatus,
    refetch: triggerGetUserProjectsApi,
  } = useQuery(`${API_ENDPOINTS.USER_PROJECTS.key}:${user.id}`, () =>
    getUserProjects(accessToken as string, user?.id as string)
  );

  const {
    data: patchUserProjectsData,
    error: patchUserProjectsError,
    status: patchUserProjectsStatus,
    isFetching: patchUserProjectsFetching,
    refetch: triggerPatchUserProjectsApi,
  } = useQuery(
    `${API_ENDPOINTS.USER_PROJECTS.key}${user.id}`,
    () =>
      putUserProjects(
        accessToken as string,
        user?.id as string,
        patchUserProjectsReq as IUserProjectApiModel[]
      ),
    { enabled: false, cacheTime: 0 }
  );

  const handleAddProjectModalOpen = () => {
    setSelectedProjectIndex(-1);
    setShowAddProjectModal(true);
  };

  const handleAddProjectModalClose = () => {
    setShowAddProjectModal(false);
  };

  const handleEditProjectModalOpen = (projectIndex: number) => {
    setSelectedProjectIndex(projectIndex);
    setShowEditProjectModal(true);
  };

  const handleEditProjectModalClose = () => {
    setShowEditProjectModal(false);
  };

  const handleProjectSave = (project: IUserProjectApiModel) => {
    const projects: IUserProjectApiModel[] = cloneDeep(
      userProjects as IUserProjectApiModel[]
    );
    if (selectedProjectIndex < 0) {
      projects.push(project);
    } else {
      projects[selectedProjectIndex] = project;
    }

    setPatchUserProjectsReq(projects);
  };

  const handleProjectRemove = () => {
    let projects: IUserProjectApiModel[] = cloneDeep(
      userProjects as IUserProjectApiModel[]
    );
    projects = projects.filter((_, index) => index != selectedProjectIndex);
    setProjectRemoving(true);
    setPatchUserProjectsReq(projects);
  };

  const handleShowLess = () => {
    setShowMoreProjects(false);
  };

  const handleShowMore = () => {
    setShowMoreProjects(true);
  };

  useEffect(() => {
    setIsShowMoreProjectsApplicable(
      !!(userProjects && userProjects.length > PROJECTS_ELLIPSE_LIMIT)
    );
  }, [userProjects]);

  useEffect(() => {
    if (getUserProjectsData?.data) {
      setUserProjects(
        () => getUserProjectsData.data?.projects as IUserProjectApiModel[]
      );
    }
  }, [getUserProjectsData?.data]);

  useEffect(() => {
    if (patchUserProjectsReq) {
      triggerPatchUserProjectsApi();
    }
  }, [patchUserProjectsReq, triggerPatchUserProjectsApi]);

  useEffect(() => {
    if (patchUserProjectsData?.data) {
      setUserProjects(patchUserProjectsData.data.projects);
      setProjectRemoving(false);
      handleAddProjectModalClose();
      handleEditProjectModalClose();
    }
  }, [patchUserProjectsData?.data]);

  useEffect(() => {
    if (patchUserProjectsStatus === "success") {
      setSnackbar?.(() => ({
        message: LABELS.SAVE_SUCCESS,
        messageType: "success",
      }));
    }
  }, [patchUserProjectsStatus, setSnackbar]);

  useEffect(() => {
    if (userProjects) {
      if (isShowMoreProjectsApplicable) {
        if (showMoreProjects) {
          setUserProjectsEllpised(userProjects);
        } else {
          setUserProjectsEllpised(
            userProjects.slice(0, PROJECTS_ELLIPSE_LIMIT)
          );
        }
      } else {
        setUserProjectsEllpised(userProjects);
      }
    }
  }, [isShowMoreProjectsApplicable, showMoreProjects, userProjects]);

  if (authUser?.id !== user.id && userProjects && userProjects.length <= 0) {
    return <></>;
  }

  return (
    <>
      <LayoutCard>
        <LayoutCard.Header title={LABELS.PROJECTS_TITLE}>
          {user.isAuthUser && (
            <>
              <Button
                color="primary"
                variant="outlined"
                onClick={handleAddProjectModalOpen}
              >
                {LABELS.ADD_PROJECT}
              </Button>
            </>
          )}
        </LayoutCard.Header>

        <Container sx={projectsLayoutCardContainer}>
          <Grid container spacing={2}>
            {userProjectsEllpised?.map((project, index) => (
              <Grid item xs={12} key={project.name}>
                <ProjectItem
                  project={project}
                  onEditProjectClick={() => handleEditProjectModalOpen(index)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>

        {isShowMoreProjectsApplicable && (
          <>
            {showMoreProjects ? (
              <Button onClick={handleShowLess} sx={showMoreOrLessButton}>
                {LABELS.SHOW_LESS_SKILLS}
                <ArrowCircleUpOutlinedIcon
                  sx={showMoreOrLessIcon}
                  fontSize="small"
                />
              </Button>
            ) : (
              <Button onClick={handleShowMore} sx={showMoreOrLessButton}>
                {LABELS.SHOW_MORE_SKILLS}
                <ArrowDropDownCircleOutlinedIcon
                  sx={showMoreOrLessIcon}
                  fontSize="small"
                />
              </Button>
            )}
          </>
        )}

        {showAddProjectModal && (
          <AddProject
            showModal={showAddProjectModal}
            onModalClose={handleAddProjectModalClose}
            saveLoading={patchUserProjectsFetching}
            onSaveProject={handleProjectSave}
          />
        )}

        {showEditProjectModal && (
          <EditProject
            showModal={showEditProjectModal}
            onModalClose={handleEditProjectModalClose}
            saveLoading={!projectRemoving && patchUserProjectsFetching}
            removeLoading={projectRemoving && patchUserProjectsFetching}
            project={
              userProjects?.[selectedProjectIndex] as IUserProjectApiModel
            }
            onSaveProject={handleProjectSave}
            onRemoveProject={handleProjectRemove}
          />
        )}
      </LayoutCard>
    </>
  );
};

const projectsCardEditBtn: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.text.primary,
  marginLeft: 2,
});

const showMoreOrLessButton: SxProps<Theme> = (theme: Theme) => ({
  width: "100%",
  padding: 2,
});

const showMoreOrLessIcon: SxProps<Theme> = (theme: Theme) => ({
  marginX: 1,
});

const projectsLayoutCardContainer: SxProps<Theme> = (theme: Theme) => ({
  paddingBottom: 3,
});

export default ProjectsCard;