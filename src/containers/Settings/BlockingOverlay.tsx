import {
  Autocomplete,
  Box,
  Container,
  Grid,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { AddCircle, RemoveCircle, BlockOutlined } from "@mui/icons-material";
import { SxProps } from "@mui/system";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery } from "react-query";
import CustomButton from "../../components/CustomButton";
import LayoutCard from "../../components/LayoutCard";
import SpinLoader from "../../components/SpinLoader";
import UserMiniCard from "../../components/UserMiniCard";
import VerticalUserMiniCard from "../../components/UserMiniCard/VerticalUserMiniCard";
import VerticalUserMiniCardSkeleton from "../../components/UserMiniCard/VerticalUserMiniCardSkeleton";
import API_ENDPOINTS from "../../constants/api";
import {
  FEEDBACK_TEXT_FIELDS_CONFIG,
  IFeedbackTextFields,
} from "../../constants/forms/feedback";
import { LABELS } from "../../constants/labels";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { IFieldOperationValue } from "../../contexts/UserSettingsContext";
import useTextFieldsWithValidation from "../../hooks/useTextFieldsWithValidation";
import {
  IUserAvatarApiModel,
  IUserFeedbackApiResponse,
} from "../../interfaces/api/external";
import { postUserFeedback } from "../../utils/api";
import SearchBar from "../Header/SearchBar";
import Search from "../Search";
import ViewOverlay, { IOverlay } from "../../components/ViewOverlay/ViewOverlay";

interface IBlockingOverlayProps extends IOverlay {
  blockedUsers?: IUserAvatarApiModel[];
  handleAddRemoveUsers?: (
    user: IUserAvatarApiModel,
    operation: IFieldOperationValue
  ) => void;
  isLoading?: boolean;
}

const BlockingOverlay: React.FC<IBlockingOverlayProps> = ({
  showOverlay,
  onOverlayClose,
  blockedUsers,
  handleAddRemoveUsers,
  isLoading,
}) => {
  return (
    <>
      <ViewOverlay
        HeaderElement={
          <SearchBar
            isLoading={isLoading}
            addRemoveEnable
            addIcon={<BlockOutlined />}
            usersList={blockedUsers}
            handleAddRemoveClick={handleAddRemoveUsers}
          />
        }
        showOverlay={showOverlay}
        onOverlayClose={onOverlayClose}
      >
        <Container>
          <Grid container py={2} spacing={3}>
            <Grid item xs={12}>
              <Typography>{LABELS.BLOCKED_USERS}</Typography>
            </Grid>
            <Grid item container spacing={2} xs={12}>
              {blockedUsers?.length ? (
                blockedUsers.map((user) => (
                  <Grid item xs={6} sm={6} md={3} key={user.id}>
                    <LayoutCard withBorder withBoxShadow>
                      <Box p={2}>
                        <VerticalUserMiniCard
                          id={user.id}
                          name={user.name}
                          headline={user.headline}
                          displayPictureUrl={user.displayPictureUrl}
                          onCardClick={() => {}}
                          handleAddRemoveClick={handleAddRemoveUsers}
                          usersList={blockedUsers}
                          actionLabel={LABELS.UNBLOCK}
                        />
                      </Box>
                    </LayoutCard>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} minHeight={200}>
                  <Typography pt={10} textAlign="center">
                    {LABELS.BLOCKED_USERS_INSTRUCTIONS}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Container>
      </ViewOverlay>
    </>
  );
};

// const userCard: SxProps<Theme> = (theme: Theme) => ({
//   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//   transition: "box-shadow 0.3s ease-in-out",
//   "&:hover": {
//     boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//   },
// });

export default BlockingOverlay;
