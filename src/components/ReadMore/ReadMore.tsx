import { Grid, IconButton, Link, Theme, Typography } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { SxProps } from "@mui/system";
import { useEffect, useState } from "react";
import { getEllipsedText } from "../../utils/generic";
import { URL_MATCH_REGEX } from "../../constants/app";

const getLinkedTextIfURLIsPresent = (para: string) => {
  return para.replaceAll(
    URL_MATCH_REGEX,
    `<a href="$&"
        target="_blank"
        rel="noopener"
        style="text-decoration: underline">
        <strong>
          $&
        </strong>
    </a>`
  );
};

interface IReadMoreProps {
  text: string;
  trimLen: number;
}

const ReadMore: React.FC<IReadMoreProps> = ({ text, trimLen }) => {
  const [displayText, setDisplayText] = useState<string>();
  const ellipsedText = getEllipsedText(text, trimLen);

  const handleReadMore = () => {
    setDisplayText(text);
  };

  useEffect(() => {
    setDisplayText(ellipsedText);
  }, [ellipsedText]);

  return (
    <>
      <Grid container justifyContent="flex-end">
        <Grid item xs={12}>
          {displayText?.split("\n").map((paragraph, index) => (
            <Typography
              key={`about-paragraph-${index}`}
              variant="body2"
              sx={{ wordWrap: "break-word" }}
              dangerouslySetInnerHTML={{
                __html: getLinkedTextIfURLIsPresent(paragraph),
              }}
            />
          ))}
        </Grid>
      </Grid>

      {displayText !== text && (
        <IconButton sx={readMoreBtn} onClick={handleReadMore}>
          <ReadMoreIcon />
        </IconButton>
      )}
    </>
  );
};

const readMoreBtn: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.text.primary,
  position: "absolute",
  right: "24px",
  bottom: "2px",
  zIndex: 1,
});

export default ReadMore;
