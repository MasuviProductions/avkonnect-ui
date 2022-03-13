import {
  Container,
  Grid,
  Typography,
  Theme,
  IconButton,
  Tooltip,
} from "@mui/material";
import { SxProps } from "@mui/system";
import InfoIcon from "@mui/icons-material/Info";

export interface ILayoutCartHeader {
  title: string;
  helperText?: string;
}
const LayoutCardHeader: React.FC<ILayoutCartHeader> = ({
  title,
  helperText,
  children,
}) => {
  return (
    <Container sx={layoutCardHeaderContainer}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="h6" py={1} fontWeight={400}>
                    {title}
                  </Typography>
                </Grid>

                {helperText && (
                  <Grid item>
                    <Tooltip title={helperText}>
                      <IconButton>
                        <InfoIcon color="primary" fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item>{children}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const layoutCardHeaderContainer: SxProps<Theme> = {
  paddingTop: 3,
  paddingBottom: 1,
};

export default LayoutCardHeader;
