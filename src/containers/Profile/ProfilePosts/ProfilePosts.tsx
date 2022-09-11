import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import LayoutCard from "../../../components/LayoutCard";
import API_ENDPOINTS from "../../../constants/api";
import { useAuthContext } from "../../../contexts/AuthContext";
import ResourceProvider from "../../../contexts/ResourceContext";
import { useUserContext } from "../../../contexts/UserContext";
import useInfiniteLoading from "../../../hooks/useInfiniteLoading";
import {
  IGetPostInfoApiModel,
  IRelatedSource,
} from "../../../interfaces/api/external";
import { ReactFCWithSkeleton } from "../../../interfaces/app";
import { getUserPosts } from "../../../utils/api";
import { transformUsersListToUserIdUserMap } from "../../../utils/transformers";
import Feed from "../../Feeds/Feed";
import ProfilePostsSkeleton from "./ProfilePostsSkeleton";

interface IProfilePostsProps {}

const ProfilePosts: ReactFCWithSkeleton<IProfilePostsProps> = () => {
  const { accessToken, authUser } = useAuthContext();
  const { user } = useUserContext();

  const [upToDateUserPosts, setUpToDateUserPosts] = useState<
    IGetPostInfoApiModel[]
  >([]);
  const [relatedSourcesMap, setRelatedSourcesMap] = useState<
    Record<string, IRelatedSource>
  >({});

  const [nextPageNumber, setNextPageNumber] = useState<number>(1);

  const {
    data: getUserPostsData,
    isFetching: getUserPostsFetching,
    refetch: triggerGetUserPostsApi,
    remove: clearGetUserPostsQuery,
  } = useQuery(
    `${API_ENDPOINTS.GET_USER_POSTS.key}-${user.id}`,
    () => getUserPosts(accessToken as string, user.id, 1, nextPageNumber),
    {
      enabled: false,
      cacheTime: 0,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );

  const infiniteLoadCallback = useCallback(() => {
    if (nextPageNumber) {
      if (getUserPostsData?.data?.postsInfo.length) {
        triggerGetUserPostsApi();
      }
    }
  }, [getUserPostsData?.data, nextPageNumber, triggerGetUserPostsApi]);

  const infiniteLoadRef = useInfiniteLoading(
    getUserPostsFetching,
    infiniteLoadCallback
  );

  const mergePosts = useCallback((newPosts: IGetPostInfoApiModel[]) => {
    setUpToDateUserPosts((prev) => [...prev, ...newPosts]);
  }, []);

  const handleUpdateResourceMap = useCallback(
    (relatedSources: IRelatedSource[]) => {
      setRelatedSourcesMap((prev) => {
        const sourcesMap = transformUsersListToUserIdUserMap(
          relatedSources
        ) as Record<string, IRelatedSource>;
        const updatedRelatedSourcesMap = {
          ...prev,
          ...sourcesMap,
        };
        return updatedRelatedSourcesMap;
      });
    },
    []
  );

  const handleDeletePost = (postId: string) => {
    setUpToDateUserPosts((prev) =>
      prev.filter((post) => post.postId !== postId)
    );
  };

  const handleUpdateResource = () => {};

  useEffect(() => {
    if (authUser?.id) {
      triggerGetUserPostsApi();
    }
  }, [authUser?.id, triggerGetUserPostsApi]);

  useEffect(() => {
    if (getUserPostsData?.data) {
      mergePosts(getUserPostsData.data.postsInfo);
      handleUpdateResourceMap(getUserPostsData?.data?.relatedSources || []);
      const totalPages = getUserPostsData?.pagination?.totalPages;
      const currentPage = getUserPostsData?.pagination?.page;

      if (!totalPages || !currentPage) {
        setNextPageNumber(0);
      } else {
        setNextPageNumber(totalPages > currentPage ? currentPage + 1 : 0);
      }
    }
  }, [
    getUserPostsData?.data,
    getUserPostsData?.pagination?.page,
    getUserPostsData?.pagination?.totalPages,
    handleUpdateResourceMap,
    mergePosts,
  ]);

  return (
    <Grid container pt={1.5} spacing={1.5}>
      <Grid item xs={12}>
        <LayoutCard>
          <LayoutCard.Header title="Posts" />
        </LayoutCard>
      </Grid>

      {upToDateUserPosts?.map((feed, index) => (
        <Grid
          item
          xs={12}
          key={index}
          ref={
            index === upToDateUserPosts.length - 1 ? infiniteLoadRef : undefined
          }
        >
          <ResourceProvider
            id={feed.postId}
            type="post"
            content={feed.contents.slice(-1)[0]}
            sourceId={feed.sourceId}
            sourceType={feed.sourceType}
            reactionsCount={feed.activity.reactionsCount}
            loadedComments={[]}
            commentsCount={feed.activity.commentsCount}
            userReaction={feed.sourceActivity?.reaction}
            createdAt={feed.createdAt}
            updatedAt={feed.updatedAt}
            relatedSourceMap={relatedSourcesMap}
            onDeleteResource={handleDeletePost}
            onUpdateResource={handleUpdateResource}
          >
            <Feed />
          </ResourceProvider>
        </Grid>
      ))}
    </Grid>
  );
};

ProfilePosts.Skeleton = ProfilePostsSkeleton;

export default ProfilePosts;
