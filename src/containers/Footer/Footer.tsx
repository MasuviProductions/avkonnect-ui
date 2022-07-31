import { IFooterType } from "../../interfaces/app";
import BottomFooter from "./FooterType/BottomFooter";
import SideFooter from "./FooterType/SideFooter";

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
