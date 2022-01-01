import { IconButton, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import LinkIcon from "@mui/icons-material/Link";
import { LABELS } from "../../constants/labels";
import { useEffect, useMemo, useState } from "react";

interface IShareButtonProps {
  title?: string;
  url?: string;
}
const ShareButton: React.FC<IShareButtonProps> = ({ title, url }) => {
  const shareTitle = title || LABELS.TITLE;
  const [shareUrl, setShareUrl] = useState(url || "");

  const navigatorShareObj = useMemo(
    () => ({
      title: shareTitle,
      url: shareUrl,
    }),
    [shareTitle, shareUrl]
  );

  const handleShareClick = () => {
    navigator.share(navigatorShareObj);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!url) {
        setShareUrl(window.location.href);
      }
    }
  }, [url]);

  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <>
      {(navigator as any).canShare?.(navigatorShareObj) ? (
        <Tooltip title={LABELS.SHARE_PROFILE}>
          <IconButton color="secondary" onClick={handleShareClick}>
            <ShareIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={LABELS.COPY_PROFILE_LINK}>
          <IconButton color="secondary" onClick={handleCopyClick}>
            <LinkIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default ShareButton;
