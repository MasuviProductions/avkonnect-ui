import { Avatar, Box, Container, Grid, Theme, Typography } from "@mui/material";
import { SxProps, SystemStyleObject } from "@mui/system";
import { compile } from "path-to-regexp";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import { APP_ROUTES } from "../../constants/app";
import { getMUIEllipsedSx, usernameToColor } from "../../utils/generic";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import VerticalUserMiniCardSkeleton from "./VerticalUserMiniCardSkeleton";
import { useCallback, useMemo } from "react";
import { userAvatarSx } from "../../styles/sx";
import { IFieldOperationValue } from "../../contexts/UserSettingsContext";
import { IUserAvatarApiModel } from "../../interfaces/api/external";
import { LABELS } from "../../constants/labels";
import CustomButton from "../CustomButton/CustomButton";

interface IVerticalUserMiniCardProps {
  id: string;
  name: string;
  headline: string;
  displayPictureUrl: string;
  onlyThumbnail?: boolean;
  onCardClick?: (id: string) => void;
  handleAddRemoveClick?: (
    user: IUserAvatarApiModel,
    operation: IFieldOperationValue
  ) => void;
  usersList?: IUserAvatarApiModel[];
  actionLabel?: string;
}

const VerticalUserMiniCard: ReactFCWithSkeleton<IVerticalUserMiniCardProps> = ({
  id,
  name,
  headline,
  displayPictureUrl,
  onlyThumbnail = false,
  onCardClick,
  handleAddRemoveClick,
  usersList,
  actionLabel,
}) => {
  const handleCardClick = () => {
    onCardClick?.(id);
  };
  const [loading, setLoading] = useState(false);
  const existingUser = usersList?.find((userInList) => userInList.id === id);

  const userCard = useMemo(
    (): JSX.Element => (
      <Grid container justifyContent="center" alignItems="center">
        <Grid pb={2} item>
          <Avatar
            alt={name}
            src={displayPictureUrl}
            sx={userAvatarSx(usernameToColor(name), onlyThumbnail ? 70 : 80)}
          >
            {name[0]}
          </Avatar>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <Typography variant="subtitle2">{name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" sx={getMUIEllipsedSx(1)}>
                {headline || "--"}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            pt={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            {actionLabel && handleAddRemoveClick && (
              <Grid item xs={12}>
                <CustomButton
                  loading={loading}
                  onClick={() => {
                    setLoading(true);
                    existingUser &&
                      handleAddRemoveClick(
                        existingUser as IUserAvatarApiModel,
                        "deletion"
                      );
                  }}
                >
                  {actionLabel}
                </CustomButton>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    ),
    [actionLabel, displayPictureUrl, existingUser, handleAddRemoveClick, headline, loading, name, onlyThumbnail]
  );

  return (
    <>
      {onCardClick ? (
        <Box onClick={handleCardClick}>{userCard}</Box>
      ) : (
        <Link href={compile(APP_ROUTES.PROFILE.route)({ id: id })} passHref>
          {userCard}
        </Link>
      )}
    </>
  );
};
VerticalUserMiniCard.Skeleton = VerticalUserMiniCardSkeleton;

const userStripContainer: SxProps<Theme> = (theme: Theme) => ({
  cursor: "pointer",
  color: theme.palette.text.primary,
});

export default VerticalUserMiniCard;
