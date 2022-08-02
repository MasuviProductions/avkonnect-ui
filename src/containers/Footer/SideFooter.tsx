import { Box, Grid, SxProps, Theme, Typography } from "@mui/material";
import { getCurrentYear } from "../../utils/generic";
import Link from "next/link";
import { LABELS } from "../../constants/labels";
import { APP_ROUTES } from "../../constants/app";
import FooterSocialMediaIcon from "../../components/FooterSocialMediaIcon";

const SideFooter: React.FC = () => {
  return (
    <Box>
      <Grid container mt={2} justifyContent="center" textAlign="center">
        <Grid item mr={2}>
          <Link href={APP_ROUTES.LEGAL_PRIVACY_POLICY.route} passHref>
            <Typography sx={linkSx}>{LABELS.PRIVACY_POLICY_TITLE}</Typography>
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
              <Typography sx={linkSx}>{LABELS.WHATSAPP_US_TITLE}</Typography>
            </a>
          </Link>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Grid container justifyContent="center">
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
        <Grid item xs={12} ml={1}>
          <Typography sx={copyrightSx}>
            {LABELS.TITLE}. &copy; {getCurrentYear()}
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

const copyrightSx: SxProps<Theme> = (theme: Theme) => ({
  fontSize: "13px",
  color: theme.palette.text.primary,
});

export default SideFooter;
