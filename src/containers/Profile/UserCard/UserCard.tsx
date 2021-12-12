import { Avatar, Grid, Link, Theme, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { SxProps } from "@mui/system";
import Image from "next/image";
import LayoutCard from "../../../components/LayoutCard";
import { JPG } from "../../../assets/JPG";

interface IUserCardProps {
  displayPictureUrl: string;
  backgroundPictureUrl: string;
  email: string;
  name: string;
  currentPosition: string;
  headline: string;
  dateOfBirth: number;
  aboutUser: string;
}

const UserCard: React.FC<IUserCardProps> = ({
  displayPictureUrl,
  backgroundPictureUrl,
  email,
  name,
  currentPosition,
  headline,
  dateOfBirth,
}) => {
  return (
    <>
      <LayoutCard>
        <Grid container>
          <Grid item xs={12}>
            <Image
              src={backgroundPictureUrl || JPG.UserBGPlaceholder}
              alt="backgroundPicture"
              width={4}
              height={1}
              layout="responsive"
            />
          </Grid>
          <Grid container p={3}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} sx={userAvatarContainer}>
                  <Avatar alt={name} src={displayPictureUrl} sx={userAvatar}>
                    {name[0]}
                  </Avatar>
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                  <Grid container alignContent="flex-end">
                    <Grid>
                      <Typography variant="h5">{name}</Typography>
                    </Grid>
                    <Grid px={1}>
                      <Link href={`mailto:${email}`}>
                        <EmailIcon fontSize="large" />
                      </Link>
                    </Grid>
                  </Grid>
                  <Typography variant="body1">{currentPosition}</Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={6}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </LayoutCard>
    </>
  );
};

const userAvatarContainer: SxProps<Theme> = {
  zIndex: 1,
  transform: "translateY(-280%)",
  height: "40px",
};

const userAvatar: SxProps<Theme> = (theme: Theme) => ({
  width: 140,
  height: 140,
  fontSize: "4rem",
  border: `3px solid ${theme.palette.background.default}`,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
});

export default UserCard;
