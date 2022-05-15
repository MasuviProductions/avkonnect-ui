import { SxProps } from "@mui/system";
import { Grid, Theme, Typography } from "@mui/material";
import LayoutCard from "../LayoutCard";

interface ILayoutSectionProps {
  title?: string;
  subTitle?: string;
}

const LayoutSection: React.FC<ILayoutSectionProps> = ({
  title,
  subTitle,
  children,
}) => {
  return (
    <LayoutCard>
      <Grid container px={2} spacing={2}>
        {title && (
          <Grid item xs={12}>
            <Typography variant="h6">{title}</Typography>
          </Grid>
        )}
        {subTitle && (
          <Grid item xs={12}>
            <Typography variant="body1" sx={subTitleSx}>
              {subTitle}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </LayoutCard>
  );
};

const subTitleSx: SxProps<Theme> = {
  fontWeight: 500,
};

export default LayoutSection;
