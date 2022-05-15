import { Box, Button, Container, Theme, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { SxProps } from "@mui/system";
import { useRouter } from "next/router";
import { APP_ROUTES } from "../constants/app";
import { LABELS } from "../constants/labels";

const PageNotFound404: React.FC = () => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push(APP_ROUTES.ROOT.route);
  };

  return (
    <Container maxWidth="md">
      <Box mt={5} textAlign="center" sx={f04BoxSx}>
        <ErrorOutlineIcon sx={errorIconSx} />
        <Typography variant="h3">{LABELS.PAGE_NOT_FOUND_UH_OH}</Typography>
        <Box my={2}>
          <Typography variant="h5">{LABELS.PAGE_NOT_FOUND_SNOOP}</Typography>
        </Box>
        <Typography variant="h6">{LABELS.PAGE_NOT_FOUND_404}</Typography>
        <Box mt={2}>
          <Button variant="outlined" onClick={handleHomeClick}>
            {LABELS.GO_HOME_BTN}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const f04BoxSx: SxProps<Theme> = (theme: Theme) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "16px",
  borderRadius: "12px",
});

const errorIconSx: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.primary.main,
  fontSize: "100px",
  animation: "swing ease-in-out 0.5s infinite alternate",
  "@keyframes swing": {
    "0%": { transform: "rotate(10deg)" },
    "100%": { transform: "rotate(-10deg)" },
  },
});

export default PageNotFound404;
