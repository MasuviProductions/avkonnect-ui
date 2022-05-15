import { Grid } from "@mui/material";
import LayoutSection from "../../../LayoutSection";
import { ITabMenuItem, ReactFCWithSkeleton } from "../../../../interfaces/app";
import HorizontalMenuItem from "./HorizontalMenuItem";
import NetworkPanelSkeleton from "./HorizontalMenuSkeleton";

interface IHorizontalMenuProps {
  tabs: ITabMenuItem[];
  activeTabId: string;
  onTabSelect: (tabId: string) => void;
}

const HorizontalMenu: ReactFCWithSkeleton<IHorizontalMenuProps> = ({
  tabs,
  activeTabId,
  onTabSelect,
}) => {
  return (
    <>
      <LayoutSection>
        <Grid container pb={2} flexDirection="row" justifyContent="flex-start">
          {tabs.map((tab) => (
            <Grid item key={`side-panel-${tab.id}`} xs={4}>
              <HorizontalMenuItem
                panelItem={tab}
                isActive={activeTabId === tab.id}
                onItemSelect={onTabSelect}
              >
                {tab.icon}
              </HorizontalMenuItem>
            </Grid>
          ))}
        </Grid>
      </LayoutSection>
    </>
  );
};

HorizontalMenu.Skeleton = NetworkPanelSkeleton;

export default HorizontalMenu;
