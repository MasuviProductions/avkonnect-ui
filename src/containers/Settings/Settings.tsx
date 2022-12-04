import { Box, Button, Grid, Theme, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import LayoutCard from "../../components/LayoutCard";
import { LABELS } from "../../constants/labels";
import { ReactFCWithSkeleton } from "../../interfaces/app"
import SettingsSkeleton from "./SettingsSkeleton";
import { useEffect, useState } from "react";
import BlockingModal from "./BlockingModal";

const Settings: ReactFCWithSkeleton = () => {
  const [showBlockingModal, setShowBlockingModal] = useState<boolean>(false);
  
  const handleBlockingModalOpen = () => {
    setShowBlockingModal(true);
  };
  const handleBlockingModalClose = () => {
    setShowBlockingModal(false);
  };

  return (
    <>
      <Box mt={4}>
        <LayoutCard>
          <Grid container>
            <Grid item xs={12} m={1} p={1} >
              <Typography variant="h4">{LABELS.SETTINGS_HEADER}</Typography>
              
              <Grid item sx={titleSx} xs={12} mt={2}>
                <Typography variant="h5">{LABELS.SETTINGS_DISPLAY}</Typography>
              </Grid>
              <Grid item sx={subTitleSx} xs={12} mt={2}  >
                <Grid item>
                  <Typography variant="body1">{LABELS.SETTINGS_THEME}</Typography>
                  <Typography variant="caption" color="text.secondary" >{`${LABELS.SETTINGS_THEME_DESCRIPTION} to dark`}</Typography>
                </Grid>
                <Grid item sx={UIElementSx}>
                  UI ele Here
                </Grid>
              </Grid>
              
              <Grid item sx={titleSx} xs={12} mt={2}>
                <Typography variant="h5">{LABELS.SETTINGS_PRIVACY}</Typography>
              </Grid>
              <Grid item sx={subTitleSx} xs={12} mt={2}>
                <Grid item>
                  <Typography variant="body1">{LABELS.SETTINGS_LOCATION}</Typography>
                  <Typography variant="caption" color="text.secondary" >{LABELS.SETTINGS_LOCATION_DESCRIPTION}</Typography>
                </Grid>
                <Grid item sx={UIElementSx}>
                  UI ele here
                </Grid>
              </Grid>
              <Grid item sx={subTitleSx} xs={12} mt={2}>
                <Grid item>
                  <Typography variant="body1">{LABELS.SETTINGS_DOB}</Typography>
                  <Typography variant="caption" color="text.secondary" >{LABELS.SETTINGS_DOB_DESCRIPTION}</Typography>
                </Grid>
                <Grid item sx={UIElementSx}>
                  UI ele here
                </Grid>
              </Grid>
              <Grid item sx={subTitleSx} xs={12} mt={2}>
                <Grid item>
                  <Typography variant="body1">{LABELS.SETTINGS_GENDER}</Typography>
                  <Typography variant="caption" color="text.secondary" >{LABELS.SETTINGS_GENDER_DESCRIPTION}</Typography>
                </Grid>
                <Grid item sx={UIElementSx}>
                  UI ele here
                </Grid>
              </Grid>
              <Grid item sx={subTitleSx} xs={12} mt={2}>
                <Grid item>
                  <Typography variant="body1">{LABELS.SETTINGS_PROFILE_PHOTO}</Typography>
                  <Typography variant="caption" color="text.secondary" >{LABELS.SETTINGS_PROFILE_PHOTO_DESCRIPTION}</Typography>
                </Grid>
                <Grid item sx={UIElementSx}>
                  UI ele here
                </Grid>
              </Grid>

              <Grid item sx={titleSx} xs={12} mt={2}>
                <Typography variant="h5">{LABELS.SETTINGS_VISIBILITY}</Typography>
              </Grid>
              <Grid item sx={subTitleSx} xs={12} mt={2}  >
                <Grid item>
                  <Typography variant="body1">{LABELS.SETTINGS_ACTIVE_STATUS}</Typography>
                  <Typography variant="caption" color="text.secondary" >{LABELS.SETTINGS_ACTIVE_STATUS_DESCRIPTION}</Typography>
                </Grid>
                <Grid item sx={UIElementSx}>
                  UI ele Here
                </Grid>
              </Grid>
              <Grid item sx={subTitleSx} xs={12} mt={2}>
                <Grid item>
                  <Typography variant="body1">{LABELS.SETTINGS_BLOCKING_INFO}</Typography>
                  <Typography variant="caption" color="text.secondary" >{LABELS.SETTINGS_BLOCKING_INFO_DESCRIPTION}</Typography>
                </Grid>
                <Grid item sx={UIElementSx}>
                  <Button onClick={handleBlockingModalOpen}>
                    {LABELS.SETTINGS_BLOCK_UNBLOCK_USERS}
                    <ArrowForwardIcon />
                  </Button>
                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </LayoutCard>
      </Box>
    
      {showBlockingModal && (
        <>
          <BlockingModal
            showModal={showBlockingModal}
            onModalClose={handleBlockingModalClose}
          />
        </>
      )}
    </>
  )
}

const titleSx: SxProps<Theme> = (theme: Theme) => ({
  borderBottom: `2px solid ${theme.palette.secondary.dark}`,
});
const subTitleSx: SxProps<Theme> = (theme: Theme) => ({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
});
const UIElementSx: SxProps<Theme> = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
});

Settings.Skeleton = SettingsSkeleton;

export default Settings