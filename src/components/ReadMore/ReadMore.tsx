import { Grid, IconButton, Theme, Typography } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { SxProps } from "@mui/system";
import { useEffect, useState } from "react";

interface IReadMoreProps {
  text: string;
  trimLen: number;
}

const getEllipsedText = (text: string, len: number): string => {
  if (text.length <= len) {
    return text;
  }
  return `${text.substring(0, len)}...`;
};

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
          <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
            {displayText}
          </Typography>
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
