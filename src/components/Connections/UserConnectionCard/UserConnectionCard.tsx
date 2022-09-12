import { Avatar, Button, Grid, Theme, Typography } from "@mui/material";
import { SxProps, SystemStyleObject } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import { compile } from "path-to-regexp";
import { useEffect, useState } from "react";
import { JPG } from "../../../assets/JPG";
import { APP_ROUTES } from "../../../constants/app";
import { LABELS } from "../../../constants/labels";
import useConnection from "../../../hooks/useConnection";
import { IUserConnectionApiResponse } from "../../../interfaces/api/external";
import { ReactFCWithSkeleton } from "../../../interfaces/app";
import { getMUIEllipsedSx, usernameToColor } from "../../../utils/generic";
import LayoutCard from "../../LayoutCard";
import WithdrawConnectionModal from "../WithdrawConnectionModal";
import UserConnectionCardSkeleton from "./UserConnectionCardSkeleton";

interface IUserConnectionCardProps {
  connectionId: string;
  connection: IUserConnectionApiResponse;
  name: string;
  headline?: string;
  backgroundImageUrl?: string;
  displayPictureUrl?: string;
  connectionsUpdatedAt: Date;
  cardType:
    | "connectionRequest"
    | "connectionPending"
    | "connectionRemove"
    | "connectionWithdraw";
  onConnectionUpdate?: (
    connectionId: string,
    connection?: IUserConnectionApiResponse
  ) => void;
}

const UserConnectionCard: ReactFCWithSkeleton<IUserConnectionCardProps> = ({
  connectionId,
  connection,
  name,
  headline,
  backgroundImageUrl,
  displayPictureUrl,
  cardType,
  connectionsUpdatedAt,
  onConnectionUpdate,
}) => {
  const router = useRouter();

  const {
    userConnectionState,
    lastAction,
    lastActionAt,
    createUserConnection,
    rejectUserConnection,
    acceptUserConnection,
  } = useConnection(connection.connecteeId);

  const [showWithdrawConnectionModal, setShowWithdrawConnectionModal] =
    useState(false);

  const handleUserAvatarSx = (theme: Theme): SystemStyleObject<Theme> => {
    return userAvatar(
      theme,
      displayPictureUrl
        ? theme.palette.background.default
        : usernameToColor(name)
    );
  };

  const handleWithdrawConnectionModalOpen = () => {
    setShowWithdrawConnectionModal(true);
  };

  const handleWithdrawConnectionModalClose = () => {
    setShowWithdrawConnectionModal(false);
  };

  const handleProfileClick = () => {
    router.push(
      compile(APP_ROUTES.PROFILE.route)({ id: connection.connecteeId })
    );
  };

  useEffect(() => {
    if (lastAction && lastActionAt > connectionsUpdatedAt) {
      onConnectionUpdate?.(connectionId, userConnectionState.data);
    }
  }, [
    onConnectionUpdate,
    userConnectionState.data,
    connectionId,
    lastAction,
    lastActionAt,
    connectionsUpdatedAt,
  ]);

  return (
    <>
      <LayoutCard withBorder>
        <Grid
          container
          sx={userConnectionCardContainer}
          justifyContent="center"
        >
          <Grid item xs={12} sx={userBackgroundContainer}>
            <Image
              src={backgroundImageUrl || JPG.UserBGPlaceholder}
              alt="backgroundPicture"
              width={4}
              height={1}
              layout="responsive"
              priority
            />
          </Grid>

          <Grid item xs={12} px={1}>
            <Grid
              container
              justifyContent="center"
              sx={userDetailContainerSx}
              px={1}
            >
              <Grid item onClick={handleProfileClick}>
                <Avatar
                  alt={name}
                  src={displayPictureUrl}
                  sx={handleUserAvatarSx}
                >
                  {name[0]}
                </Avatar>
              </Grid>
              <Grid
                item
                xs={12}
                pt={1}
                onClick={handleProfileClick}
                sx={hoverPointerSx}
              >
                <Typography
                  variant="body1"
                  textAlign="center"
                  color="text.primary"
                  sx={getMUIEllipsedSx(1)}
                >
                  {name}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                px={2}
                onClick={handleProfileClick}
                sx={hoverPointerSx}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  sx={getMUIEllipsedSx(2, 40)}
                >
                  {headline || "--"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={1} py={1}>
                  {cardType === "connectionRequest" && (
                    <>
                      <Grid item>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={createUserConnection}
                        >
                          {LABELS.CONNECTION_CONNECT}
                        </Button>
                      </Grid>
                    </>
                  )}

                  {cardType === "connectionPending" && (
                    <>
                      <Grid item>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={acceptUserConnection}
                        >
                          {LABELS.CONNECTION_ACCEPT}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          size="small"
                          color="error"
                          onClick={rejectUserConnection}
                        >
                          {LABELS.CONNECTION_REJECT}
                        </Button>
                      </Grid>
                    </>
                  )}

                  {cardType === "connectionRemove" && (
                    <>
                      <Grid item>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={rejectUserConnection}
                        >
                          {LABELS.CONNECTION_UNCONNECT}
                        </Button>
                      </Grid>
                    </>
                  )}

                  {cardType === "connectionWithdraw" && (
                    <>
                      <Grid item>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={handleWithdrawConnectionModalOpen}
                        >
                          {LABELS.CONNECTION_PENDING}
                        </Button>
                      </Grid>

                      {showWithdrawConnectionModal && (
                        <WithdrawConnectionModal
                          connectorId={connection.connecteeId}
                          showModal={showWithdrawConnectionModal}
                          onModalClose={handleWithdrawConnectionModalClose}
                        />
                      )}
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </LayoutCard>
    </>
  );
};

UserConnectionCard.Skeleton = UserConnectionCardSkeleton;

const userConnectionCardContainer: SxProps<Theme> = {
  height: 240,
  position: "relative",
};

const userBackgroundContainer: SxProps<Theme> = (theme: Theme) => ({
  borderRight: `1px solid ${theme.palette.background.paper}`,
  borderLeft: `1px solid ${theme.palette.background.paper}`,
  borderTop: `1px solid ${theme.palette.background.paper}`,
  borderRadius: "0.4rem 0.4rem 0 0",
  img: {
    borderRadius: "0.4rem 0.4rem 0 0",
  },
});

const userDetailContainerSx: SxProps<Theme> = {
  zIndex: 1,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};

const userAvatar = (theme: Theme, color: string): SystemStyleObject<Theme> => {
  return {
    width: 100,
    height: 100,
    fontSize: "4rem",
    border: `3px solid ${theme.palette.background.default}`,
    backgroundColor: color,
    color: theme.palette.getContrastText(color),
    cursor: "pointer",
  };
};

const hoverPointerSx: SxProps<Theme> = {
  ":hover": {
    cursor: "pointer",
  },
};

export default UserConnectionCard;
