import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { PNG } from "../../assets/PNG";
import { APP_ROUTES } from "../../constants/app";
import { LABELS } from "../../constants/labels";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import AboutUsSkeleton from "./AboutUsSkeleton";
import { compile } from "path-to-regexp";

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
            About Us
          </Typography>
        </Grid>
        <Grid item xs={8} sm={10} mt={3}>
          <Typography color="text.primary" textAlign="center">
            Avkonnect is the brain child of masuvi productions Pvt Ltd (founded
            in 2017) our founder{" "}
            <Link
              href={compile(APP_ROUTES.PROFILE.route)({
                id: "29bb8d33-4a51-4850-abc2-c04c15f3d679",
              })}
              passHref
            >
              <Button color="primary" variant="text" size="small">
                Vishveshwara Guthal
              </Button>
            </Link>{" "}
            being an active member in film industry from the age of 16 and a
            software engineer by education conceived the idea of an automated
            platform dedicated to media fraternity avkonnect which provides
            ample scope and opportunities to aspiring media professionals and
            media houses to get to know each other and do meaningful
            professional collaboration, AVkonnect brings customise solution to
            aspiring actors, filmmakers, news anchors, event managers,
            influencers, content creators etc to utilise to their benefit
          </Typography>
        </Grid>
        <Grid item mt={6}>
          <Typography color="text.primary" textAlign="center" variant="h3">
            Our Vision
          </Typography>
        </Grid>

        <Grid item xs={8} sm={10} mt={3}>
          <Typography color="text.primary" textAlign="center">
            Build economic opportunities for every member in the media industry
            and enhance the coherence at every stage of production.
          </Typography>
        </Grid>

        <Grid item mt={6}>
          <Typography color="text.primary" textAlign="center" variant="h3">
            Our Mission
          </Typography>
        </Grid>

        <Grid item xs={8} sm={10} mt={3}>
          <Typography color="text.primary" textAlign="center">
            1. Collaborate with relevant stakeholders Frequently to increase
            footprints in the media of fraternity.
          </Typography>
        </Grid>
        <Grid item xs={8} sm={10} mt={1}>
          <Typography color="text.primary" textAlign="center">
            2. Provide employment opportunities without any logistical barriers.
          </Typography>
        </Grid>
        <Grid item xs={8} sm={10} mt={1}>
          <Typography color="text.primary" textAlign="center">
            3. Create a platform to synergize coherent growth between the media
            entities.
          </Typography>
        </Grid>
        <Grid item mt={5}>
          <Typography color="text.primary" textAlign="center">
            by
          </Typography>
          <Typography color="primary" textAlign="center" variant="h5">
            Masuvi Productions
          </Typography>
        </Grid>

        <Grid item xs={4} md={2}>
          <Image src={PNG.MadeInIndia} alt={LABELS.MADE_IN_INDIA} />
        </Grid>
      </Grid>
    </Container>
  );
};
AboutUs.Skeleton = AboutUsSkeleton;

export default AboutUs;
