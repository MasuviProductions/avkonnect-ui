import { Box, Grid, Avatar, Typography, SxProps, Theme } from "@mui/material";
import { useRouter } from "next/router";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import {
  getEllipsedText,
  getTimeAgo,
  usernameToColor,
} from "../../../../utils/generic";
import { compile } from "path-to-regexp";
import { APP_ROUTES } from "../../../../constants/app";
import { userAvatarSx } from "../../../../styles/sx";
import { useAuthContext } from "../../../../contexts/AuthContext";

const FeedHeader: React.FC = () => {
  const router = useRouter();
  const { relatedSourceMap, sourceId, createdAt } = useResourceContext();
  const { authUser } = useAuthContext();

  const handleProfileRedirectClick = () => {
    router.push(compile(APP_ROUTES.PROFILE.route)({ id: sourceId }));
  };
  return (
    <Grid
      container
      py={1}
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item display="flex" alignItems="center">
        <Avatar
          alt={relatedSourceMap[sourceId].name}
          src={relatedSourceMap[sourceId].displayPictureUrl}
          onClick={handleProfileRedirectClick}
          sx={userAvatarSx(usernameToColor(authUser?.name as string), 45)}
        />
        <Box
          ml={1}
          mt={0.5}
          onClick={handleProfileRedirectClick}
          sx={profileRedirectSx}
        >
          <Typography
            lineHeight={relatedSourceMap[sourceId].headline ? 0.5 : 1.3}
          >
            {relatedSourceMap[sourceId].name}
          </Typography>
          <Typography variant="caption" lineHeight={0.5}>
            {getEllipsedText(relatedSourceMap[sourceId].headline, 35)}
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontSize: "10px" }}
            lineHeight={relatedSourceMap[sourceId].headline ? 0.7 : 1.6}
            component="div"
          >
            {getTimeAgo(createdAt)}
          </Typography>
        </Box>
      </Grid>
      <Grid item display="flex" justifyContent="flex-end" alignItems="center">
        <MoreHorizIcon fontSize="large" sx={morePostOptionsSx} />
      </Grid>
    </Grid>
  );
};

const profileRedirectSx: SxProps<Theme> = {
  "&:hover": {
    cursor: "pointer",
  },
};

const morePostOptionsSx: SxProps<Theme> = (theme: Theme) => ({
  padding: "8px",
  fontSize: "42px",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.background.default,
    borderRadius: "50%",
  },
});

export default FeedHeader;
