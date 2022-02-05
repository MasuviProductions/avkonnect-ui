import React from "react";
import {
  Divider,
  Grid,
  Hidden,
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
import { useCallback } from "react";
import SkillEndorserInput from "./SkillEndorserInput";

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
  const [endorsementString, setEndorsementString] = useState<string>("");
  const [showSkillEndorsementModal, setShowSkillEndorsementModal] =
    useState<boolean>(false);

  const handleShowSkillEndorsementModalOpen = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowSkillEndorsementModal(true);
  };

  const handleShowSkillEndorsementModalClose = () => {
    setShowSkillEndorsementModal(false);
  };

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

  const handleEndorseUserSkill = (rating?: number, relationship?: string) => {
    onAddEndorsement?.(
      customKey,
      skillset.name,
      rating || 3,
      relationship || "NA"
    );

    handleShowSkillEndorsementModalClose();
  };

  const getEndorsementString = useCallback((): string => {
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
  }, [hasUserEndorsed, skillset.endorsers]);

  useEffect(() => {
    setEndorsementString(getEndorsementString());
  }, [getEndorsementString]);

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
                        onClick={handleShowSkillEndorsementModalOpen}
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
                color="text.primary"
                onClick={handleShowSkillModalOpen}
                sx={skillField}
                component="button"
                disabled={skillset.endorsers.length <= 0}
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
                    component="button"
                  >{`\u2027 ${skillset.endorsers.length}`}</Link>
                </Grid>
              )}
              <Hidden smDown>
                {endorsementString && (
                  <Grid item xs={12}>
                    <Link
                      color="text.secondary"
                      sx={skillEndorsementLinks}
                      onClick={handleShowSkillModalOpen}
                      component="button"
                    >
                      <Typography variant="body2">
                        {endorsementString}
                      </Typography>
                    </Link>
                  </Grid>
                )}
              </Hidden>
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

      {showSkillEndorsementModal && (
        <SkillEndorserInput
          showModal={showSkillEndorsementModal}
          onModalClose={handleShowSkillEndorsementModalClose}
          onSave={handleEndorseUserSkill}
          onSkip={handleEndorseUserSkill}
        />
      )}
    </>
  );
};

const skillEndorsementLinks: SxProps<Theme> = {
  ":not(:hover)": {
    textDecoration: "none",
  },

  "&[disabled]": {
    textDecoration: "none",
    cursor: "text",
  },
};

const skillField: SxProps<Theme> = (theme: Theme) => ({
  ...skillEndorsementLinks,
  [theme.breakpoints.down("sm")]: {
    fontWeight: "bold",
  },
});

const skillEndorsementCount: SxProps<Theme> = {
  ...skillEndorsementLinks,
  marginLeft: 1,
};

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
