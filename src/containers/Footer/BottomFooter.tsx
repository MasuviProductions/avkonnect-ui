import {
  Box,
  Container,
  Grid,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { getCurrentYear } from "../../utils/generic";
import Link from "next/link";
import { LABELS } from "../../constants/labels";
import { APP_ROUTES } from "../../constants/app";
import Image from "next/image";
import { PNG } from "../../assets/PNG";
import FooterSocialMediaIcon from "../../components/FooterSocialMediaIcon";

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
                <Typography sx={miniHeadingSx} variant="subtitle1">
                  {LABELS.LINKS_HEADER}
                </Typography>
              </Grid>
              <Grid item mr={2}>
                <Link href={APP_ROUTES.LEGAL_PRIVACY_POLICY.route} passHref>
                  <Typography sx={linkSx}>
                    {LABELS.PRIVACY_POLICY_TITLE}
                  </Typography>
                </Link>
              </Grid>
              <Grid item mr={2}>
                <Link href={APP_ROUTES.ABOUT.route} passHref>
                  <Typography sx={linkSx}>{LABELS.ABOUT_US}</Typography>
                </Link>
              </Grid>
              <Grid item mr={2}>
                <Link href={LABELS.COMPANY_WA_LINK} passHref>
                  <a target="_blank" rel="noopener noreferrer">
                    <Typography sx={linkSx}>
                      {LABELS.WHATSAPP_US_TITLE}
                    </Typography>
                  </a>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} sm={4} xs={12} mt={1}>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <Typography sx={miniHeadingSx} variant="subtitle1">
                  {LABELS.FOLLOW_US_HEADER}
                </Typography>
              </Grid>
              <Grid item mr={2}>
                <FooterSocialMediaIcon socialMedia="facebook" />
              </Grid>
              <Grid item mr={2}>
                <FooterSocialMediaIcon socialMedia="instagram" />
              </Grid>
              <Grid item mr={2}>
                <FooterSocialMediaIcon socialMedia="twitter" />
              </Grid>
              <Grid item mr={2}>
                <FooterSocialMediaIcon socialMedia="linkedin" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mb={1} mt={1}>
            <Typography sx={copyrightSx}>
              {LABELS.TITLE}. &copy; {getCurrentYear()}
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

const miniHeadingSx: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.navbar.contrastText,
  fontWeight: "600",
});

const copyrightSx: SxProps<Theme> = (theme: Theme) => ({
  fontSize: "13px",
  color: theme.palette.text.secondary,
});

export default BottomFooter;
