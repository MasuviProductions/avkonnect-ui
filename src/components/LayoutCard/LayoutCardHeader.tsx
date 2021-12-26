import { Container, Grid, Typography, Theme, IconButton } from "@mui/material";
import { SxProps } from "@mui/system";

export interface ILayoutCartHeader {
  title: string;
}
const LayoutCardHeader: React.FC<ILayoutCartHeader> = ({ title, children }) => {
  return (
    <Container sx={layoutCardHeaderContainer}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6" py={1} fontWeight={400}>
                {title}
              </Typography>
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
