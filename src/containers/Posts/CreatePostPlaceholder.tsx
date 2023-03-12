import { Avatar, Box, Button, Grid, SxProps, Theme } from "@mui/material";
import PenIcon from "@mui/icons-material/CreateTwoTone";
import LayoutCard from "../../components/LayoutCard";
import { userAvatarSx } from "../../styles/sx";
import { usernameToColor } from "../../utils/generic";
import { useAuthContext } from "../../contexts/AuthContext";
import { LABELS } from "../../constants/labels";

interface ICreatePostPlaceholderProps {
  onOpenPostEditor: () => void;
}

const CreatePostPlaceholder: React.FC<ICreatePostPlaceholderProps> = ({
  onOpenPostEditor,
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
            sx={createPostBtnSx}
            onClick={onOpenPostEditor}
            fullWidth
          >
            <Box component="span" mt={0.5}>
              <PenIcon sx={writeIconSx} />
            </Box>
            <Box component="span" ml={1}>
              {LABELS.CREATE_POST_PLACEHOLDER}
            </Box>
          </Button>
        </Grid>
      </Grid>
    </LayoutCard>
  );
};

const createPostBtnSx: SxProps<Theme> = (theme: Theme) => ({
  backgroundColor: theme.palette.background.paper,
  borderColor: theme.palette.text.primary,
  color: theme.palette.text.primary,
  borderRadius: "18px",
  justifyContent: "flex-start !important",
  textTransform: "initial",
});

const writeIconSx: SxProps<Theme> = {
  fontSize: "14px",
};

export default CreatePostPlaceholder;
