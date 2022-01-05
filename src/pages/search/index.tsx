import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import Search from "../../containers/Search";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  IProtectedPageProps,
  NextPageWithSkeleton,
} from "../../interfaces/app";
import { handleServerSideAuthenticationRedirect } from "../../utils/generic";

interface ISearchPageData {}

type ISearchPageProps = IProtectedPageProps<ISearchPageData>;

const SearchPage: NextPageWithSkeleton = () => {
  const route = useRouter();
  const searchString = route.query["key"] as string;
  const { accessToken } = useAuthContext();
  if (!accessToken) return <></>;

  return <Search searchString={searchString || ""} />;
};
SearchPage.Skeleton = Search.Skeleton;

export const getServerSideProps: GetServerSideProps<ISearchPageProps> = async (
  context: any
) => {
  const handlerSSRProps = async (
    session: Session
  ): Promise<GetServerSidePropsResult<ISearchPageProps>> => {
    return {
      props: { session, data: {}, error: null },
    };
  };

  return await handleServerSideAuthenticationRedirect(context, handlerSSRProps);
};

export default SearchPage;
