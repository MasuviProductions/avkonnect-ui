import { Box, Grid, Avatar, Typography, SxProps, Theme } from "@mui/material";
import { EntryComponentProps } from "@draft-js-plugins/mention/lib/MentionSuggestions/Entry/Entry";
import { getMUIElipsedSx, usernameToColor } from "../../../utils/generic";
import { userAvatarSx } from "../../../styles/sx";
import { SystemStyleObject } from "@mui/system";

type ITagSuggestionsItemProps = EntryComponentProps;

const TagSuggestionsItem: React.FC<ITagSuggestionsItemProps> = (props) => {
  const { mention, theme, searchValue, isFocused, ...parentProps } = props;
  const { name, headline, displayPictureUrl } = mention;

  return (
    <>
      <Box {...parentProps}>
        <Grid container alignItems="center" sx={suggestionItemContainer} p={1}>
          <Grid item>
            <Avatar
              alt={name}
              src={displayPictureUrl}
              sx={userAvatarSx(usernameToColor(name), 30)}
            >
              {name[0]}
            </Avatar>
          </Grid>
          <Grid item xs={9}>
            <Grid container>
              <Grid item>
                <Typography variant="body2">{name}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">.</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" sx={getMUIElipsedSx(2)}>
                  {headline || "--"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const suggestionItemContainer: SxProps<Theme> = (theme: Theme) => ({
  width: "100%",
  borderRadius: 0,
});

export default TagSuggestionsItem;
