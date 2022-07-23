import { NextPageWithSkeleton } from "../../interfaces/app";
import { PrivacyPolicy } from "../../containers/Legal";

const PrivacyPolicyPage: NextPageWithSkeleton = () => {
  return <PrivacyPolicy />;
};

PrivacyPolicyPage.Skeleton = PrivacyPolicy.Skeleton;

export default PrivacyPolicyPage;
