import { Button, Grid, Link, SxProps, Theme, Typography } from "@mui/material";
import BannedIcon from "@mui/icons-material/Block";
import { useRouter } from "next/router";
import { LABELS } from "../../../constants/labels";
import LayoutCard from "../../LayoutCard";
import { APP_ROUTES } from "../../../constants/app";

const ContentBanned: React.FC = () => {
  const router = useRouter();

  const handleHomeBtnClick = () => {
    router.push(APP_ROUTES.ROOT.route);
  };

  return (
    <LayoutCard>
      <Grid container textAlign="center" my={2} py={2}>
        <Grid item xs={12}>
          <BannedIcon sx={unavailSx} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" mb={2}>
            {LABELS.PAGE_NOT_FOUND_UH_OH}
          </Typography>
          <Typography variant="h5">{LABELS.CONTENT_BANNED_TITLE}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Link href={APP_ROUTES.LEGAL_PRIVACY_POLICY.route}>
            {LABELS.GOTO_TOS_LINK}
          </Link>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Button variant="outlined" onClick={handleHomeBtnClick}>
            {LABELS.GO_HOME_BTN}
          </Button>
        </Grid>
      </Grid>
    </LayoutCard>
  );
};

const unavailSx: SxProps<Theme> = (theme: Theme) => ({
  fill: theme.palette.error.main,
  fontSize: "100px",
  animation: "zoom ease-in-out 1.5s infinite alternate",
  "@keyframes zoom": {
    "0%": { transform: "scale(1.0)" },
    "100%": { transform: "scale(1.15)" },
  },
});

export default ContentBanned;
