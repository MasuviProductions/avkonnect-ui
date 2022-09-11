import { Avatar, Box, Button, Grid, SxProps, Theme } from "@mui/material";
import PenIcon from "@mui/icons-material/CreateTwoTone";
import LayoutCard from "../../components/LayoutCard";
import { userAvatarSx } from "../../styles/sx";
import { usernameToColor } from "../../utils/generic";
import { useAuthContext } from "../../contexts/AuthContext";
import { LABELS } from "../../constants/labels";

interface ICreatePostPanelProps {
  postEditorOpen: () => void;
}

const CreatePostPanel: React.FC<ICreatePostPanelProps> = ({
  postEditorOpen,
}) => {
  const { authUser } = useAuthContext();

  return (
    <LayoutCard>
      <Grid container spacing={2} px={1} pb={2} alignItems="center">
        <Grid item ml={0.4} mr={0.8}>
          <Avatar
            alt={authUser?.name}
            src={authUser?.displayPictureUrl}
            sx={userAvatarSx(usernameToColor(authUser?.name as string), 50)}
          >
            {authUser?.name[0]}
          </Avatar>
        </Grid>
        <Grid item md={10} xs={9}>
          <Button
            variant="outlined"
            color="success"
            sx={createPostBtnSx}
            onClick={postEditorOpen}
          >
            {LABELS.CREATE_POST_PLACEHOLDER}
            <Box component="span">
              <PenIcon />
            </Box>
          </Button>
        </Grid>
      </Grid>
    </LayoutCard>
  );
};

const createPostBtnSx: SxProps<Theme> = (theme: Theme) => ({
  width: "100%",
  backgroundColor: theme.palette.background.default,
  borderRadius: "18px",
  justifyContent: "flex-start !important",
  textTransform: "initial",
});

export default CreatePostPanel;
