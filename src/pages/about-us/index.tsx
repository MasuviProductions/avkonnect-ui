import AboutUs from "../../containers/About-us/AboutUs";
import { NextPageWithSkeleton } from "../../interfaces/app";
const AboutUsPage: NextPageWithSkeleton = () => {
  return <AboutUs />;
};
AboutUsPage.Skeleton = AboutUs.Skeleton;

export default AboutUsPage;
