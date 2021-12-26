import React from "react";
import {
  Divider,
  Grid,
  IconButton,
  Link,
  Theme,
  Typography,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useUserContext } from "../../../../contexts/UserContext";
import { IUserSkillSetApiModel } from "../../../../interfaces/api/external";
import { LABELS } from "../../../../constants/labels";
import SkillEndorsers from "./SkillEndorsers";

interface ISkillItemProps {
  skillset: IUserSkillSetApiModel;
  loading?: boolean;
  onAddEndorsement?: (
    customKey: string,
    skillName: string,
    rating: number,
    relationshipWithUser: string
  ) => void;
  customKey: string;
  onRemoveEndorsement?: (customKey: string, skillName: string) => void;
}

const SkillItem: React.FC<ISkillItemProps> = ({
  skillset,
  loading = false,
  customKey,
  onAddEndorsement,
  onRemoveEndorsement,
}) => {
  const { user } = useUserContext();
  const { authUser } = useAuthContext();

  const [hasUserEndorsed, setHasUserEndorsed] = useState<boolean>(false);
  const [showSkillModal, setShowSkillModal] = useState<boolean>(false);

  const handleShowSkillModalOpen = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowSkillModal(true);
  };

  const handleShowSkillModalClose = () => {
    setShowSkillModal(false);
  };

  const handleUnendorseUserSkill = () => {
    onRemoveEndorsement?.(customKey, skillset.name);
  };

  const handleEndorseUserSkill = () => {
    // TODO: Take input from user using a popup
    onAddEndorsement?.(customKey, skillset.name, 5, "NA");
  };

  const getEndorsementString = (): string => {
    if (skillset.endorsers.length <= 0) {
      return "";
    }
    if (hasUserEndorsed) {
      if (skillset.endorsers.length === 1) {
        return `${LABELS.ENDORSEMENT_YOU} ${LABELS.ENDORSEMENT_HAVE} ${LABELS.GIVEN_ENDORSEMENT}`;
      } else {
        return `${LABELS.ENDORSEMENT_YOU} ${LABELS.ENDORSEMENT_AND} ${
          skillset.endorsers.length - 1
        } ${LABELS.ENDORSEMENT_CONNECTIONS} ${LABELS.ENDORSEMENT_HAVE}
            ${LABELS.GIVEN_ENDORSEMENT}`;
      }
    } else {
      if (skillset.endorsers.length === 1) {
        return `${skillset.endorsers[0].name} ${LABELS.ENDORSEMENT_HAS} ${LABELS.GIVEN_ENDORSEMENT}`;
      } else {
        return `${skillset.endorsers[0].name} ${LABELS.ENDORSEMENT_AND}
            ${skillset.endorsers.length - 1} ${
          LABELS.ENDORSEMENT_CONNECTIONS
        } ${LABELS.ENDORSEMENT_HAVE} ${LABELS.GIVEN_ENDORSEMENT}`;
      }
    }
  };

  useEffect(() => {
    setHasUserEndorsed(false);
    skillset.endorsers.every((endorser) => {
      if (endorser.endorserId === authUser?.id) {
        setHasUserEndorsed(true);
        return false;
      }
      return true;
    });
  }, [authUser, skillset.endorsers]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid container alignItems="center">
            {/* TODO: Also hide when user is not a connection */}
            {authUser?.id !== user.id && (
              <Grid item>
                {loading && (
                  <IconButton sx={skillEndorsementButton}>
                    <AutorenewIcon
                      fontSize="large"
                      sx={skillEndorseLoadingIcon}
                    />
                  </IconButton>
                )}
                {!loading && (
                  <>
                    {hasUserEndorsed ? (
                      <IconButton
                        sx={skillEndorsementButton}
                        onClick={handleUnendorseUserSkill}
                      >
                        <CheckCircleIcon
                          fontSize="large"
                          sx={skillEndorsedIcon}
                        />
                      </IconButton>
                    ) : (
                      <IconButton
                        sx={skillEndorsementButton}
                        onClick={handleEndorseUserSkill}
                      >
                        <AddCircleOutlineIcon
                          fontSize="large"
                          sx={skillUnEndorsedIcon}
                        />
                      </IconButton>
                    )}
                  </>
                )}
              </Grid>
            )}
            <Grid item py={1}>
              <Link
                href="#"
                color="text.primary"
                onClick={handleShowSkillModalOpen}
              >
                {skillset.name}
              </Link>
            </Grid>

            <>
              {skillset.endorsers.length > 0 && (
                <Grid item>
                  <Link
                    color="text.secondary"
                    onClick={handleShowSkillModalOpen}
                    sx={skillEndorsementCount}
                  >{`\u2027 ${skillset.endorsers.length}`}</Link>
                </Grid>
              )}
              <Grid item xs={12}>
                <Link color="text.secondary" onClick={handleShowSkillModalOpen}>
                  <Typography variant="body2">
                    {getEndorsementString()}
                  </Typography>
                </Link>
              </Grid>
            </>
          </Grid>
        </Grid>

        <Grid item xs={12} py={2}>
          <Divider sx={skillDivider} />
        </Grid>
      </Grid>

      {showSkillModal && (
        <SkillEndorsers
          title={`${skillset.name} (${skillset.endorsers.length})`}
          endorsers={skillset.endorsers}
          showModal={showSkillModal}
          onModalClose={handleShowSkillModalClose}
        />
      )}
    </>
  );
};

const skillEndorsementCount: SxProps<Theme> = (theme: Theme) => ({
  marginLeft: 1,
});

const skillDivider: SxProps<Theme> = (theme: Theme) => ({
  backgroundColor: theme.palette.text.secondary,
});

const skillEndorsementButton: SxProps<Theme> = (theme: Theme) => ({
  padding: 0,
  marginRight: 1,
});

const skillEndorseLoadingIcon: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.text.secondary,
});

const skillEndorsedIcon: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.success.main,
});

const skillUnEndorsedIcon: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.text.secondary,
});

export default SkillItem;
