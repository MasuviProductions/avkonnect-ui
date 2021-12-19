import { useState } from "react";
import { SxProps } from "@mui/system";
import { Container, Typography, Theme, Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { LABELS } from "../../../constants/labels";
import LayoutCard from "../../../components/LayoutCard";
import EditAboutUser from "../EditAboutUser";
import { useUserContext } from "../../../contexts/UserContext";
import ReadMore from "../../../components/ReadMore/ReadMore";

interface IAboutCartProps {}

const AboutCard: React.FC<IAboutCartProps> = () => {
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
    <>
      <LayoutCard>
        <Container sx={aboutCardContainer}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6" py={1} fontWeight={400}>
                    {LABELS.ABOUT_FIELD_LABEL}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    sx={aboutCardEditBtn}
                    onClick={handleAboutModalOpen}
                  >
                    <EditIcon fontSize="medium" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>

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
    </>
  );
};

const aboutCardContainer: SxProps<Theme> = {
  paddingY: 3,
};

const aboutCardEditBtn: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.text.primary,
});

export default AboutCard;
