import { Box, Grid, Avatar, Typography, SxProps, Theme } from "@mui/material";
import { EntryComponentProps } from "@draft-js-plugins/mention/lib/MentionSuggestions/Entry/Entry";
import { getMUIElipsedSx, usernameToColor } from "../../../utils/generic";
import { userAvatarSx } from "../../../styles/sx";
import { SystemStyleObject } from "@mui/system";

type ITagSuggestionsItemProps = EntryComponentProps;

const TagSuggestionsItem: React.FC<ITagSuggestionsItemProps> = (props) => {
  const { mention, theme, searchValue, isFocused, ...parentProps } = props;
  const { name, title, avatar } = mention;

  return (
    <>
      <Box {...parentProps}>
        <Grid
          container
          alignItems="center"
          sx={suggestionItemContainerSx}
          p={1}
        >
          <Grid item>
            <Avatar
              alt={name}
              src={avatar}
              sx={userAvatarSx(usernameToColor(name), 40)}
            >
              {name[0]}
            </Avatar>
          </Grid>
          <Grid item xs px={1}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="body2">{name}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" sx={headlineSx}>
                  {title || "--"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const suggestionItemContainerSx: SxProps<Theme> = (theme: Theme) => ({
  width: "100%",
  borderRadius: 0,
});

const headlineSx = (theme: Theme): SystemStyleObject<Theme> => ({
  ...(getMUIElipsedSx(1) as SystemStyleObject<Theme>),
  color: theme.palette.text.secondary,
  fontSize: "12px",
});

export default TagSuggestionsItem;
