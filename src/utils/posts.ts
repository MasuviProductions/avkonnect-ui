import { TEXT_MATCH_REGEX_WITH_USERID } from "../constants/app";
import { IRelatedUserInfoResponseModel } from "../interfaces/api/external";

export const getSourceNameFromSourceId = (
  sourceId: string,
  relatedSourceInfo: IRelatedUserInfoResponseModel[]
): string => {
  let srcName = "";
  relatedSourceInfo.forEach(source => {
    if (!srcName && source.id === sourceId) {
      srcName = source.name;
    }
  });
  return srcName;
};

export const getSourceImageFromSourceId = (
  sourceId: string,
  relatedSourceInfo: IRelatedUserInfoResponseModel[]
): string => {
  let srcImgUrl = "";
  relatedSourceInfo.forEach(source => {
    if (!srcImgUrl && source.id === sourceId) {
      srcImgUrl = source.displayPictureUrl;
    }
  });
  return srcImgUrl;
};

export const getSourceHeadlineFromSourceId = (
  sourceId: string,
  relatedSourceInfo: IRelatedUserInfoResponseModel[]
): string => {
  let srcHeadline = "";
  relatedSourceInfo.forEach(source => {
    if (!srcHeadline && source.id === sourceId) {
      srcHeadline = source.headline;
    }
  });
  return srcHeadline;
};

export const getLinkedUserTextIfUserIdIsPresent = (
  text: string,
  relatedSourceInfo: IRelatedUserInfoResponseModel[]
) => {
  let finalLinkText = text;
  let linkedUsers = text.match(TEXT_MATCH_REGEX_WITH_USERID);
  linkedUsers?.forEach(linkedUser => {
    let linkId = linkedUser.replace("@user_", "");
    let link = `<a href="/profile/${linkId}" target="_blank" rel="noopener" class="avkUserLink"> ${getSourceNameFromSourceId(
      linkId,
      relatedSourceInfo
    )}</a>`;
    finalLinkText = finalLinkText.replace(linkedUser, link);
  });
  return finalLinkText;
};
