import { ITabMenuItem } from "../../interfaces/app";
import HorizontalTabView from "./HorizontalTabView";
import VerticalTabView from "./VerticalTabView";

interface ITabViewProps {
  menuTitle?: string;
  tabs: ITabMenuItem[];
  defaultTab: string;
  direction: "vertical" | "horizontal";
  onTabRender: (tabId: string) => JSX.Element;
}

export const TabView: React.FC<ITabViewProps> = ({
  menuTitle,
  tabs,
  direction,
  defaultTab,
  onTabRender,
}) => {
  switch (direction) {
    case "vertical": {
      return (
        <VerticalTabView
          menuTitle={menuTitle}
          tabs={tabs}
          defaultTab={defaultTab}
          onTabRender={onTabRender}
        />
      );
    }
    case "horizontal": {
      return (
        <HorizontalTabView
          menuTitle={menuTitle}
          tabs={tabs}
          defaultTab={defaultTab}
          onTabRender={onTabRender}
        />
      );
    }
    default:
      return <></>;
  }
};

export default TabView;
