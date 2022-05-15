import { Box, Grid, Button, Theme, Typography } from "@mui/material";
import React from "react";
import { LABELS } from "../../../constants/labels";

import Image from "next/image";
import { SVG } from "../../../assets/SVG";
export interface IOAuthSignFormProps {}

const OAuthSignForm: React.FC<IOAuthSignFormProps> = () => {
  return (
    <Box m={2}>
      <Button variant="outlined" color="primary" sx={{ width: "80%" }}>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item>
            <Typography variant="body1">{LABELS.GOOGLE_SIGN}</Typography>
          </Grid>
          <Grid item mt={1}>
            <Image
              src={SVG.GoogleLogo}
              alt={LABELS.GOOGLE_LOGO}
              width="30"
              height="30"
            />
          </Grid>
        </Grid>
      </Button>
    </Box>
  );
};

export default OAuthSignForm;
