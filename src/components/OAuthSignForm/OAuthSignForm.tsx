import { Box, Button, Theme, Typography } from "@mui/material";
import React from "react";
import { LABELS } from "../../constants/labels";
import { SxProps } from "@mui/system";

import Image from "next/image";
import { SVG } from "../../assets/SVG";
export interface IOAuthSignFormProps {}

const OAuthSignForm: React.FC<IOAuthSignFormProps> = () => {
  return (
    <Box m={2}>
      <Box>
        <Button variant="outlined" color="primary">
          <Box display="flex" alignItems="center" justifyContent="center" p={1}>
            <Box mr={2}>
              <Typography variant="body1">{LABELS.GOOGLE_SIGN}</Typography>
            </Box>
            <Image
              src={SVG.GoogleLogo}
              alt={LABELS.GOOGLE_LOGO}
              width="30"
              height="30"
            />
          </Box>
        </Button>
      </Box>
    </Box>
  );
};

export default OAuthSignForm;
