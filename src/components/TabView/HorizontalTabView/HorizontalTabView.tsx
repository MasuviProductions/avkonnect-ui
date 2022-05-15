import { Grid } from "@mui/material";
import { useCallback, useState } from "react";
import { ITabMenuItem, ReactFCWithSkeleton } from "../../../interfaces/app";
import TabbedViewSkeleton from "./HorizontalTabViewSkeleton";
import HorizontalMenu from "./HorizontalMenu";

interface IHorizontalTabViewProps {
  menuTitle?: string;
  tabs: ITabMenuItem[];
  defaultTab: string;
  onTabRender: (tabId: string) => JSX.Element;
}

const HorizontalTabView: ReactFCWithSkeleton<IHorizontalTabViewProps> = ({
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
      <Grid item xs={12}>
        <HorizontalMenu
          tabs={tabs}
          activeTabId={activeTabId}
          onTabSelect={onTabSelect}
        />
      </Grid>
      <Grid item xs={12}>
        {onTabRender(activeTabId)}
      </Grid>
    </Grid>
  );
};

HorizontalTabView.Skeleton = TabbedViewSkeleton;

export default HorizontalTabView;
