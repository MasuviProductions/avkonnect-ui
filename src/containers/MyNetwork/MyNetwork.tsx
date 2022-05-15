import PeopleIcon from "@mui/icons-material/People";
import { useCallback } from "react";
import { LABELS } from "../../constants/labels";
import { ITabMenuItem, ReactFCWithSkeleton } from "../../interfaces/app";
import MyNetworkSkeleton from "./MyNetworkSkeleton";
import TabView from "../../components/TabView";
import { useAuthContext } from "../../contexts/AuthContext";
import LayoutSection from "../../components/LayoutSection";
import ExistingConnections from "./Connections/ExistingConnections";
import PendingConnections from "./Connections/PendingConnections";
import SentConnections from "./Connections/SentConnections";
import { Forward, PersonAdd } from "@mui/icons-material";
import { Hidden } from "@mui/material";

const MyNetwork: ReactFCWithSkeleton = () => {
  const { authUser } = useAuthContext();

  const networkPanelItems = (trimTitle?: boolean) =>
    getMetworkPanelItems(authUser?.connectionCount as number, trimTitle);

  const onTabRender = useCallback((tabId: string) => {
    switch (tabId) {
      case "connections": {
        return (
          <>
            <LayoutSection>
              <ExistingConnections />
            </LayoutSection>
          </>
        );
      }

      case "pending": {
        return (
          <LayoutSection>
            <PendingConnections />
          </LayoutSection>
        );
      }

      case "sent": {
        return (
          <LayoutSection>
            <SentConnections />
          </LayoutSection>
        );
      }
      default:
        return <></>;
    }
  }, []);

  return (
    <>
      <Hidden mdDown>
        <TabView
          menuTitle={LABELS.MANAGE_NETWORK}
          tabs={networkPanelItems()}
          defaultTab={networkPanelItems()[0].id}
          onTabRender={onTabRender}
          direction="vertical"
        />
      </Hidden>

      <Hidden mdUp>
        <TabView
          menuTitle={LABELS.MANAGE_NETWORK}
          tabs={networkPanelItems(true)}
          defaultTab={networkPanelItems(true)[0].id}
          onTabRender={onTabRender}
          direction="horizontal"
        />
      </Hidden>
    </>
  );
};

MyNetwork.Skeleton = MyNetworkSkeleton;

const getMetworkPanelItems = (
  connectionCount: number,
  trimTitle: boolean | undefined = false
): ITabMenuItem[] => {
  return [
    {
      id: "connections",
      title: `${trimTitle ? "" : `${LABELS.CONNECTION_CONNECTIONS} `}(${
        connectionCount || 0
      })`,
      icon: <PeopleIcon />,
    },
    {
      id: "pending",
      title: `${trimTitle ? "" : LABELS.CONNECTION_PENDING}`,
      icon: <PersonAdd />,
    },
    {
      id: "sent",
      title: `${trimTitle ? "" : LABELS.CONNECTION_SENT}`,
      icon: <Forward />,
    },
  ];
};

export default MyNetwork;
