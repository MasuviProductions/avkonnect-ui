import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { compile } from "path-to-regexp";
import { PNG } from "../../assets/PNG";
import { APP_ROUTES } from "../../constants/app";
import { LABELS } from "../../constants/labels";
import { useAuthContext } from "../../contexts/AuthContext";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import Feeds from "./Feeds";
import HomeSkeleton from "./HomeSkeleton";

interface IHomeProps {}

const Home: ReactFCWithSkeleton<IHomeProps> = () => {
  const { authUser } = useAuthContext();

  if (!authUser) return <></>;

  return (
    <Container>
      <Feeds />
      {/* <Grid
        container
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Grid item mt={6}>
          <Typography color="text.primary" textAlign="center" variant="h3">
            Home feeds
          </Typography>
        </Grid>

        <Grid item xs={8} sm={4} mt={8}>
          <Typography color="text.primary" textAlign="center">
            While new features are on the way,
          </Typography>

          <Typography color="text.primary" textAlign="center">
            you can setup your
          </Typography>
        </Grid>

        <Grid item xs={8} sm={4}>
          <Grid container justifyContent="center" my={1}>
            <Grid item>
              <Link
                href={compile(APP_ROUTES.PROFILE.route)({
                  id: authUser.id,
                })}
                passHref
              >
                <Button color="primary" variant="outlined" size="small">
                  profile
                </Button>
              </Link>
            </Grid>
          </Grid>

          <Typography color="text.primary" textAlign="center">
            to join people from the media fraternity
          </Typography>
        </Grid>

        <Grid item mt={20}>
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
      </Grid> */}
    </Container>
  );
};
Home.Skeleton = HomeSkeleton;

export default Home;
