import { Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import UserConnectionCard from "../../../components/Connections/UserConnectionCard";
import API_ENDPOINTS from "../../../constants/api";
import { LABELS } from "../../../constants/labels";
import { useAuthContext } from "../../../contexts/AuthContext";
import useInfiniteLoading from "../../../hooks/useInfiniteLoading";
import useRemountKey from "../../../hooks/useRemountKey";
import {
  IUserConnectionApiResponse,
  IUserConnectionsApiResponse,
} from "../../../interfaces/api/external";
import { getUserConnections } from "../../../utils/api";
import ConnectionsSkeleton from "./ConnectionsSkeleton";

const PendingConnections: React.FC = () => {
  const { authUser, accessToken } = useAuthContext();
  const { remountKey } = useRemountKey(4);

  const [upToDateUserConnections, setUpToDateUserUserConnections] =
    useState<IUserConnectionsApiResponse>([]);

  const [nextConnectionSearchKey, setNextConnectionSearchKey] =
    useState<Record<string, unknown>>();

  const {
    data: getUserConnectionsData,
    status: getUserConnectionsStatus,
    refetch: triggerGetUserConnectionsApi,
    isFetching: getUserConnectionsFetching,
    dataUpdatedAt: getUserConnectionsDataUpdatedAt,
  } = useQuery(
    `GET- ${API_ENDPOINTS.USER_CONNECTIONS.key}:${authUser?.id}:CONNECTED:${remountKey}`,
    () =>
      getUserConnections(
        accessToken as string,
        authUser?.id as string,
        "pending",
        20,
        nextConnectionSearchKey
          ? encodeURI(JSON.stringify(nextConnectionSearchKey))
          : undefined
      ),
    {
      enabled: false,
      cacheTime: 0,
    }
  );

  const infiniteLoadCallback = useCallback(() => {
    if (upToDateUserConnections.length > 0 && nextConnectionSearchKey) {
      if (authUser) {
        triggerGetUserConnectionsApi();
      }
    }
  }, [
    authUser,
    nextConnectionSearchKey,
    triggerGetUserConnectionsApi,
    upToDateUserConnections.length,
  ]);

  const infiniteLoadRef = useInfiniteLoading(
    getUserConnectionsFetching,
    infiniteLoadCallback
  );

  const onConnectionUpdate = (
    connectionId: string,
    connection?: IUserConnectionApiResponse
  ) => {
    if (!connection || connection.isConnected) {
      setUpToDateUserUserConnections((prev) =>
        prev.filter((conn) => conn.id != connectionId)
      );
    }
  };

  useEffect(() => {
    if (authUser) {
      triggerGetUserConnectionsApi();
    }
  }, [authUser, triggerGetUserConnectionsApi]);

  useEffect(() => {
    if (getUserConnectionsData) {
      setUpToDateUserUserConnections((prev) => {
        return [
          ...prev,
          ...(getUserConnectionsData?.data as IUserConnectionsApiResponse),
        ];
      });
      setNextConnectionSearchKey(
        getUserConnectionsData.dDBPagination?.nextSearchStartFromKey
      );
    }
  }, [getUserConnectionsData, getUserConnectionsDataUpdatedAt]);

  if (getUserConnectionsStatus === "loading") {
    return <ConnectionsSkeleton />;
  }

  return (
    <>
      <Grid container p={1} pb={2} spacing={1}>
        {getUserConnectionsStatus === "success" &&
          upToDateUserConnections.length <= 0 && (
            <Grid item xs={12}>
              <Typography>{LABELS.CONNECTION_NO_PENDING_REQUESTS}</Typography>
            </Grid>
          )}
        {upToDateUserConnections?.map((connection, index) => (
          <Grid
            key={connection.id}
            item
            xs={6}
            md={4}
            lg={3}
            ref={
              index === upToDateUserConnections.length - 1
                ? infiniteLoadRef
                : undefined
            }
          >
            <UserConnectionCard
              connectionId={connection.id}
              connection={connection}
              name={connection.connecteeInfo?.name as string}
              headline={connection.connecteeInfo?.headline}
              displayPictureUrl={connection.connecteeInfo?.displayPictureUrl}
              backgroundImageUrl={connection.connecteeInfo?.backgroundImageUrl}
              cardType="connectionPending"
              onConnectionUpdate={onConnectionUpdate}
              connectionsUpdatedAt={new Date(getUserConnectionsDataUpdatedAt)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PendingConnections;
