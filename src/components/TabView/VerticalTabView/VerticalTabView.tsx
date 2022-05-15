import { Box, Grid, Hidden } from "@mui/material";
import { useCallback, useState } from "react";
import { ITabMenuItem, ReactFCWithSkeleton } from "../../../interfaces/app";
import TabbedViewSkeleton from "./VerticalTabViewSkeleton";
import VerticalMenu from "./VerticalMenu";

interface IVerticalTabViewProps {
  menuTitle?: string;
  tabs: ITabMenuItem[];
  defaultTab: string;
  onTabRender: (tabId: string) => JSX.Element;
}

const VerticalTabView: ReactFCWithSkeleton<IVerticalTabViewProps> = ({
  menuTitle,
  tabs,
  defaultTab,
  onTabRender,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultTab || tabs[0]?.id
  );

  const onTabSelect = useCallback((id: string) => {
    setActiveTabId(id);
  }, []);

  return (
    <Grid container spacing={2} my={4}>
      <Grid item md={4} lg={3}>
        <VerticalMenu
          title={menuTitle}
          tabs={tabs}
          activeTabId={activeTabId}
          onTabSelect={onTabSelect}
        />
      </Grid>

      <Grid item xs={12} md={8} lg={9}>
        {onTabRender(activeTabId)}
      </Grid>
    </Grid>
  );
};

VerticalTabView.Skeleton = TabbedViewSkeleton;

export default VerticalTabView;
