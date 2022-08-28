import { Link, Typography } from "@mui/material";
import { compile } from "path-to-regexp";
import { ReactNodeArray } from "react";
import reactStringReplace from "react-string-replace";
import { APP_ROUTES, HASHTAG_REGEX, UUID_REGEX_STRING } from "../constants/app";
import { IRelatedSource } from "../interfaces/api/external";
import { decoratedLinkSx } from "../styles/sx";

export const parseContentText = (
  contentText: string,
  relatedSourceMap: Record<string, IRelatedSource>
) => {
  // NOTE: Refer https://www.npmjs.com/package/react-string-replace for usage

  // NOTE: Ignore deprecation warning as reactStringReplace expects ReactNodeArray
  let replacedText: ReactNodeArray;

  const userTagRegex = new RegExp(`@user_` + `(${UUID_REGEX_STRING})`, "g");
  replacedText = reactStringReplace(contentText, userTagRegex, (match, i) => {
    const sourceId = match;
    const relatedSource = relatedSourceMap[sourceId];
    return (
      <Link
        key={i}
        href={compile(APP_ROUTES.PROFILE.route)({ id: sourceId })}
        sx={decoratedLinkSx()}
      >
        {relatedSource?.name}
      </Link>
    );
  });

  const hashTagRegex = HASHTAG_REGEX;
  replacedText = reactStringReplace(replacedText, hashTagRegex, (match, i) => {
    return <Typography sx={decoratedLinkSx()}>{`#${match}`}</Typography>;
  });

  return replacedText;
};
