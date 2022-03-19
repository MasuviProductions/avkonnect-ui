import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { IGender } from "../constants/forms/user-info/user-info";

interface IGenderIcon {
  gender: IGender;
}

const GenderIcon: React.FC<IGenderIcon> = ({ gender }) => {
  switch (gender) {
    case "Male":
      return <MaleIcon />;
    case "Female":
      return <FemaleIcon />;
    case "Others":
      return <TransgenderIcon />;
    default:
      return <TransgenderIcon />;
  }
};

export default GenderIcon;
