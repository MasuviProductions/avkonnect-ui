import SignIn from "../containers/SignIn";
import { NextPageWithSkeleton } from "../interfaces/app";

const SignInPage: NextPageWithSkeleton = () => {
  return <SignIn />;
};

SignInPage.Skeleton = SignIn.Skeleton;

export default SignInPage;
