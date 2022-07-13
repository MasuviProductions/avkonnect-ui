import AboutUs from "../../containers/About-us/AboutUs";
import { NextPageWithSkeleton } from "../../interfaces/app";
const About: NextPageWithSkeleton = () => {
  return <AboutUs />;
};
About.Skeleton = AboutUs.Skeleton;

export default About;
