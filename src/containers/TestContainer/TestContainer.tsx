import { REACTION_CONFIGS } from "../../constants/app";
import { useAuthContext } from "../../contexts/AuthContext";
import Feeds from "../Feeds";

const TestContainer: React.FC = () => {
  const { authUser } = useAuthContext();

  const Icon = REACTION_CONFIGS.love.icon;

  if (!authUser) {
    return <></>;
  }
  return (
    <>
      <Icon />
      <Feeds />
    </>
  );
};

export default TestContainer;
