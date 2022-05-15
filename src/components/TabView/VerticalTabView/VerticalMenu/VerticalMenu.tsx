import { Grid } from "@mui/material";
import LayoutSection from "../../../LayoutSection";
import { ITabMenuItem, ReactFCWithSkeleton } from "../../../../interfaces/app";
import VerticalMenuItem from "./VerticalMenuItem";
import NetworkPanelSkeleton from "./VerticalMenuSkeleton";

interface IVerticalMenuProps {
  title?: string;
  tabs: ITabMenuItem[];
  activeTabId: string;
  onTabSelect: (tabId: string) => void;
}

const VerticalMenu: ReactFCWithSkeleton<IVerticalMenuProps> = ({
  title,
  tabs,
  activeTabId,
  onTabSelect,
}) => {
  return (
    <>
      <LayoutSection subTitle={title}>
        <Grid container spacing={1} pb={2}>
          <Grid item xs={12}>
            {tabs.map((tab) => (
              <VerticalMenuItem
                panelItem={tab}
                isActive={activeTabId === tab.id}
                onItemSelect={onTabSelect}
                key={`side-panel-${tab.id}`}
              >
                {tab.icon}
              </VerticalMenuItem>
            ))}
          </Grid>
        </Grid>
      </LayoutSection>
    </>
  );
};

VerticalMenu.Skeleton = NetworkPanelSkeleton;

export default VerticalMenu;
