import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { IFooterSocialMedia } from "../constants/forms/generic";
import { SxProps, Theme } from "@mui/material";
import { LABELS } from "../constants/labels";
import Link from "next/link";
import { SystemStyleObject } from "@mui/system";

interface IFooterSocialMediaIcon {
  socialMedia: IFooterSocialMedia;
}

const FooterSocialMediaIcon: React.FC<IFooterSocialMediaIcon> = ({
  socialMedia,
}) => {
  switch (socialMedia) {
    case "facebook":
      return (
        <Link href={LABELS.COMPANY_FACEBOOK_LINK} passHref>
          <a target="_blank" rel="noopener noreferrer">
            <FacebookIcon sx={facebookIconSx} />
          </a>
        </Link>
      );
    case "instagram":
      return (
        <Link href={LABELS.COMPANY_INSTAGRAM_LINK} passHref>
          <a target="_blank" rel="noopener noreferrer">
            <InstagramIcon sx={instagramIconSx} />
          </a>
        </Link>
      );
    case "twitter":
      return (
        <Link href={LABELS.COMPANY_TWITTER_LINK} passHref>
          <a target="_blank" rel="noopener noreferrer">
            <TwitterIcon sx={twitterIconSx} />
          </a>
        </Link>
      );
    case "linkedin":
      return (
        <Link href={LABELS.COMPANY_LINKEDIN_LINK} passHref>
          <a target="_blank" rel="noopener noreferrer">
            <LinkedInIcon sx={linkedinIconSx} />
          </a>
        </Link>
      );
    default:
      return <></>;
  }
};

const iconSx = (theme: Theme, color: string): SystemStyleObject<Theme> => ({
  color: theme.palette.text.secondary,
  ":hover": {
    cursor: "pointer",
    color: color,
  },
});

const facebookIconSx = (theme: Theme): SystemStyleObject<Theme> => {
  return iconSx(theme, "#4267B2");
};

const instagramIconSx = (theme: Theme): SystemStyleObject<Theme> => {
  return iconSx(theme, "#fb3958");
};

const twitterIconSx = (theme: Theme): SystemStyleObject<Theme> => {
  return iconSx(theme, "#1DA1F2");
};

const linkedinIconSx: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.text.secondary,
  ":hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "3px",
    color: "#0077B5",
  },
});

export default FooterSocialMediaIcon;
