import { useAuthContext } from "../../contexts/AuthContext";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import Feeds from "../Feeds";
import HomeSkeleton from "../Home/HomeSkeleton";

const TestContainer: ReactFCWithSkeleton = () => {
  const { authUser } = useAuthContext();

  if (!authUser) {
    return <></>;
  }
  return (
    <>
      <Feeds />
    </>
  );
};
TestContainer.Skeleton = HomeSkeleton;
// const TestContainer = HomeSkeleton;

export default TestContainer;
