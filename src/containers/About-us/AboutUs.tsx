import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { PNG } from "../../assets/PNG";
import { APP_ROUTES } from "../../constants/app";
import { LABELS } from "../../constants/labels";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import AboutUsSkeleton from "./AboutUsSkeleton";
import { compile } from "path-to-regexp";
import Footer from "../Footer";

interface IAboutUsProps {}

const AboutUs: ReactFCWithSkeleton<IAboutUsProps> = () => {
  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Grid item mt={6}>
          <Typography color="text.primary" textAlign="center" variant="h3">
            {LABELS.ABOUT_US}
          </Typography>
        </Grid>
        <Grid item xs={8} sm={10} mt={3}>
          <Typography variant="h6" color="text.primary" textAlign="center">
            {LABELS.ABOUT_US_INTRO}
            <Link
              href={compile(APP_ROUTES.PROFILE.route)({
                id: "29bb8d33-4a51-4850-abc2-c04c15f3d679",
              })}
              passHref
            >
              <Button color="primary" variant="text" size="large">
                {LABELS.VISHVESHWARA}
              </Button>
            </Link>
            {LABELS.ABOUT_INTRO_2}
          </Typography>
        </Grid>
        <Grid item mt={6}>
          <Typography color="text.primary" textAlign="center" variant="h3">
            {LABELS.OUR_VISION}
          </Typography>
        </Grid>

        <Grid item xs={8} sm={10} mt={3}>
          <Typography color="text.primary" textAlign="center">
            {LABELS.OUR_VISION_DESCRIPTION}
          </Typography>
        </Grid>

        <Grid item mt={6}>
          <Typography color="text.primary" textAlign="center" variant="h3">
            {LABELS.OUR_MISSION}
          </Typography>
        </Grid>

        <Grid item xs={8} sm={10} mt={3}>
          <Typography color="text.primary" textAlign="center">
            {LABELS.OUR_MISSION_1}
          </Typography>
        </Grid>
        <Grid item xs={8} sm={10} mt={1}>
          <Typography color="text.primary" textAlign="center">
            {LABELS.OUR_MISSION_2}
          </Typography>
        </Grid>
        <Grid item xs={8} sm={10} mt={1}>
          <Typography color="text.primary" textAlign="center">
            {LABELS.OUR_MISSION_3}
          </Typography>
        </Grid>
        <Grid item mt={5}>
          <Typography color="text.primary" textAlign="center">
            {LABELS.BY}
          </Typography>
          <Typography color="primary" textAlign="center" variant="h5">
            {LABELS.MASUVI}
          </Typography>
        </Grid>

        <Grid item xs={4} md={2}>
          <Image src={PNG.MadeInIndia} alt={LABELS.MADE_IN_INDIA} />
        </Grid>
      </Grid>
      <Box mt={1}>
        <Footer footerType="bottom" />
      </Box>
    </Container>
  );
};
AboutUs.Skeleton = AboutUsSkeleton;

export default AboutUs;
