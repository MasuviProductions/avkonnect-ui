import {
  Box,
  Container,
  Grid,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { getCurrentYear } from "../../../utils/generic";
import Link from "next/link";
import { LABELS } from "../../../constants/labels";
import { APP_ROUTES } from "../../../constants/app";
import Image from "next/image";
import { PNG } from "../../../assets/PNG";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const BottomFooter: React.FC = () => {
  return (
    <Box sx={bottomFooterBoxSx}>
      <Container maxWidth="lg">
        <Grid container alignItems="center" textAlign="center">
          <Grid item p={2} md={4} sm={4} xs={12} mt={1}>
            <Link href={APP_ROUTES.ROOT.route} passHref>
              <Image
                src={PNG.AvkDeskLogo}
                alt={LABELS.TITLE_LOGO}
                width="150"
                height="50"
              />
            </Link>
          </Grid>
          <Grid item md={4} sm={4} xs={12} mb={1}>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <Typography color="secondary" variant="subtitle2">
                  Useful Links
                </Typography>
              </Grid>
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
                  <a target="_blank" rel="noopener noreferrer">
                    <Typography sx={linkSx}>Message Us</Typography>
                  </a>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} sm={4} xs={12} mt={1}>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <Typography color="secondary" variant="subtitle2">
                  Follow Us
                </Typography>
              </Grid>
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
          <Grid item xs={12} mb={1} mt={1}>
            <Typography sx={copyrightSx}>
              AVKonnect. &copy; {getCurrentYear()}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const bottomFooterBoxSx: SxProps<Theme> = (theme: Theme) => ({
  width: "100%",
  backgroundColor: theme.palette.navbar.main,
  borderRadius: "6px 6px 0px 0px",
  boxShadow: `0px 0px 5px ${theme.palette.navbar.main}`,
});

const linkSx: SxProps<Theme> = (theme: Theme) => ({
  fontSize: "13px",
  color: theme.palette.text.secondary,
  ":hover": {
    cursor: "pointer",
    textShadow: `0px 0px 2px ${theme.palette.text.secondary}`,
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
    backgroundColor: theme.palette.background.default,
    borderRadius: "3px",
    color: "#0077B5",
  },
});

const copyrightSx: SxProps<Theme> = (theme: Theme) => ({
  fontSize: "13px",
  color: theme.palette.text.secondary,
});

export default BottomFooter;
2;
