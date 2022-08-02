import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import {
  Divider,
  Grid,
  IconButton,
  Theme,
  Typography,
  Link,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { IUserCertificationApiModel } from "../../../interfaces/api/external";
import { LABELS } from "../../../constants/labels";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useUserContext } from "../../../contexts/UserContext";
import { MAX_DATE } from "../../../constants/forms/generic";
import { getLinkedTextIfURLIsPresent } from "../../../utils/generic";

interface ICertificationItemProps {
  certification: IUserCertificationApiModel;
  onEditCertificationClick?: () => void;
}

const CertificationItem: React.FC<ICertificationItemProps> = ({
  certification,
  onEditCertificationClick,
}) => {
  const { authUser } = useAuthContext();
  const { user } = useUserContext();
  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container>
                <Grid item>
                  {certification.link ? (
                    <Link
                      href={certification.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography variant="body2">
                        <strong>{certification.name}</strong>
                      </Typography>
                    </Link>
                  ) : (
                    <Typography variant="body2" color="primary">
                      <strong>{certification.name}</strong>
                    </Typography>
                  )}
                </Grid>

                <Grid item ml={1}>
                  <Typography variant="body2" color="text.secondary">
                    {`\u2027 ${certification.issuerName} \u2027 ${certification.industry} ${LABELS.CERTIFICATION_INDUSTRY} `}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item>
                  <Typography variant="body2" color="text.secondary">
                    {`${dayjs(certification.issuedAt).format("MMM YYYY")} - ${
                      certification.expiresAt === MAX_DATE
                        ? LABELS.CERTIFICATION_NO_EXPIRY
                        : dayjs(certification.expiresAt).format("MMM YYYY")
                    } `}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {authUser?.id === user?.id && (
          <Grid item xs={2}>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <IconButton
                  sx={certificationEditBtn}
                  onClick={onEditCertificationClick}
                >
                  <EditIcon fontSize="medium" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12} pt={2}>
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{
              __html: getLinkedTextIfURLIsPresent(certification.description),
            }}
          />
        </Grid>

        <Grid item xs={12} py={2}>
          <Divider sx={certificationDivider} />
        </Grid>
      </Grid>
    </>
  );
};

const certificationEditBtn: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.text.primary,
});

const certificationDivider: SxProps<Theme> = (theme: Theme) => ({
  backgroundColor: theme.palette.text.secondary,
});

export default CertificationItem;
