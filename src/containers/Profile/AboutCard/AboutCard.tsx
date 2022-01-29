import { useState } from "react";
import { SxProps } from "@mui/system";
import { Container, Theme, Grid, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { LABELS } from "../../../constants/labels";
import LayoutCard from "../../../components/LayoutCard";
import EditAboutUser from "../EditAboutUser";
import { useUserContext } from "../../../contexts/UserContext";
import ReadMore from "../../../components/ReadMore/ReadMore";
import { ReactFCWithSkeleton } from "../../../interfaces/app";
import AboutCardSkeleton from "./AboutCardSkeleton";

interface IAboutCartProps {}

const AboutCard: ReactFCWithSkeleton<IAboutCartProps> = () => {
  const { user } = useUserContext();
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);

  const handleAboutModalOpen = () => {
    setShowAboutModal(true);
  };

  const handleAboutModalClose = () => {
    setShowAboutModal(false);
  };

  if (!user.aboutUser) {
    return <></>;
  }

  return (
    <Box my={1}>
      <LayoutCard>
        <LayoutCard.Header title={LABELS.ABOUT_FIELD_LABEL}>
          {user.isAuthUser && (
            <IconButton sx={aboutCardEditBtn} onClick={handleAboutModalOpen}>
              <EditIcon fontSize="medium" />
            </IconButton>
          )}
        </LayoutCard.Header>
        <Container sx={aboutCardContainer}>
          <Grid container>
            <Grid item xs={12} mt={1}>
              <ReadMore text={user.aboutUser} trimLen={380} />
            </Grid>
          </Grid>
        </Container>

        {showAboutModal && (
          <EditAboutUser
            showModal={showAboutModal}
            onModalClose={handleAboutModalClose}
          />
        )}
      </LayoutCard>
    </Box>
  );
};

AboutCard.Skeleton = AboutCardSkeleton;

const aboutCardContainer: SxProps<Theme> = {
  paddingBottom: 3,
};

const aboutCardEditBtn: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.text.primary,
});

export default AboutCard;
