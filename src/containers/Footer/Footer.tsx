import { IFooterType } from "../../interfaces/app";
import BottomFooter from "./BottomFooter";
import SideFooter from "./SideFooter";

interface IFooterProps {
  footerType: IFooterType;
}

const Footer: React.FC<IFooterProps> = ({ footerType }) => {
  switch (footerType) {
    case "bottom":
      return <BottomFooter />;
    case "side":
      return <SideFooter />;
    default:
      return <SideFooter />;
  }
};

export default Footer;
