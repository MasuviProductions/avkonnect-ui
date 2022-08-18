import { Hidden, Theme } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import API_ENDPOINTS from "../../../../constants/api";
import { useAboutResourceContext } from "../../../../contexts/AboutResourceContext";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { ICreateCommentApiRequest } from "../../../../interfaces/api/external";
import { createComment } from "../../../../utils/api";

import AddCommentDesktop from "./AddCommentDesktop";
import AddCommentHandheld from "./AddCommentHandheld";

interface IAddCommentProps {
  inputFeed?: string;
  isFocused?: boolean;
  onCommentFieldBlur?: () => void;
}

const AddComment: React.FC<IAddCommentProps> = ({
  inputFeed,
  isFocused,
  onCommentFieldBlur,
}) => {
  const { accessToken } = useAuthContext();
  const { id, type, incrementCommentsCount } = useAboutResourceContext();

  const [commentReqBody, setCommentReqBody] = useState<
    ICreateCommentApiRequest | undefined
  >();

  const {
    data: createCommentResData,
    refetch: triggerCreateCommentApi,
    status: createCommentStatus,
    isFetching: createCommentFetching,
    remove: clearCreateCommentQueryData,
  } = useQuery(
    `POST:${API_ENDPOINTS.CREATE_COMMENT.key}-${id}`,
    () =>
      createComment(
        accessToken as string,
        commentReqBody as ICreateCommentApiRequest
      ),
    { cacheTime: 0, refetchInterval: false, enabled: !!commentReqBody }
  );

  const handleCommentSubmit = () => {
    setCommentReqBody({
      resourceId: id,
      resourceType: type,
      comment: {
        text: `Test comment ${Math.ceil(Math.random() * 1000)} `,
        mediaUrls: [],
      },
    });
  };

  useEffect(() => {
    if (createCommentResData?.data) {
      incrementCommentsCount();
      //Callback to supply data to parent
      setCommentReqBody(undefined);
      clearCreateCommentQueryData();
    }
  }, [
    clearCreateCommentQueryData,
    createCommentResData,
    incrementCommentsCount,
  ]);

  return (
    <>
      <Hidden mdUp>
        <AddCommentHandheld
          isFocused={isFocused}
          onSubmitComment={handleCommentSubmit}
          inputFeed={inputFeed}
          onCommentFieldBlur={onCommentFieldBlur}
        />
      </Hidden>

      <Hidden mdDown>
        <AddCommentDesktop />
      </Hidden>
    </>
  );
};

export default AddComment;
