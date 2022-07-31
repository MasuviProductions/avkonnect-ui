import { Box, Grid, SxProps, Theme, Typography } from "@mui/material";
import { getCurrentYear } from "../../../utils/generic";
import Link from "next/link";
import { LABELS } from "../../../constants/labels";
import { APP_ROUTES } from "../../../constants/app";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const SideFooter: React.FC = () => {
  return (
    <Box>
      <Grid container mt={2} justifyContent="center" textAlign="center">
        <Grid item mr={2}>
          <Link href={APP_ROUTES.LEGAL_PRIVACY_POLICY.route} passHref>
            <Typography sx={linkSx}>Privacy Policy</Typography>
          </Link>
        </Grid>
        <Grid item mr={2}>
          <Link href={APP_ROUTES.ABOUT.route} passHref>
            <Typography sx={linkSx}>About Us</Typography>
          </Link>
        </Grid>
        <Grid item mr={2}>
          <Link href={LABELS.COMPANY_WA_LINK} passHref>
            <Typography sx={linkSx}>Whatsapp Us</Typography>
          </Link>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Grid container justifyContent="center">
            <Grid item mr={2}>
              <Link href={LABELS.COMPANY_FACEBOOK_LINK} passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <FacebookIcon sx={facebookIconSx} />
                </a>
              </Link>
            </Grid>
            <Grid item mr={2}>
              <Link href={LABELS.COMPANY_INSTAGRAM_LINK} passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <InstagramIcon sx={instagramIconSx} />
                </a>
              </Link>
            </Grid>
            <Grid item mr={2}>
              <Link href={LABELS.COMPANY_TWITTER_LINK} passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <TwitterIcon sx={twitterIconSx} />
                </a>
              </Link>
            </Grid>
            <Grid item mr={2}>
              <Link href={LABELS.COMPANY_LINKEDIN_LINK} passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon sx={linkedinIconSx} />
                </a>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} ml={1}>
          <Typography sx={copyrightSx}>
            AVKonnect. &copy; {getCurrentYear()}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const linkSx: SxProps<Theme> = (theme: Theme) => ({
  fontSize: "12px",
  color: theme.palette.text.primary,
  ":hover": {
    cursor: "pointer",
    textShadow: `0px 0px 1px ${theme.palette.text.primary}`,
  },
});

const facebookIconSx: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.text.secondary,
  ":hover": {
    cursor: "pointer",
    color: "#4267B2",
  },
});

const instagramIconSx: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.text.secondary,
  ":hover": {
    cursor: "pointer",
    color: "#fb3958",
  },
});

const twitterIconSx: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.text.secondary,
  ":hover": {
    cursor: "pointer",
    color: "#1DA1F2",
  },
});

const linkedinIconSx: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.text.secondary,
  ":hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "3px",
    color: "#0077B5",
  },
});

const copyrightSx: SxProps<Theme> = (theme: Theme) => ({
  fontSize: "13px",
  color: theme.palette.text.primary,
});

export default SideFooter;
