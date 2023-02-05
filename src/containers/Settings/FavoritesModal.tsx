import { BlockOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Container,
  Grid,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery } from "react-query";
import CustomButton from "../../components/CustomButton";
import LayoutCard from "../../components/LayoutCard";
import ModalLayout, { IModal } from "../../components/ModalLayout/ModalLayout";
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

interface IFavoritesModalProps extends IModal {
  favorites?: IUserAvatarApiModel[];
  handleAddRemoveUsers?: (
    user: IUserAvatarApiModel,
    operation: IFieldOperationValue
  ) => void;
  isLoading: boolean;
}

const FavoritesModal: React.FC<IFavoritesModalProps> = ({
  showModal,
  onModalClose,
  favorites,
  handleAddRemoveUsers,
  isLoading,
}) => {
  return (
    <>
      <ModalLayout
        title={LABELS.SETTINGS_FAVORITES}
        showModal={showModal}
        onModalClose={onModalClose}
      >
        <Container>
          <Grid container py={2} spacing={3}>
            <Grid item xs={12}>
              <SearchBar
                isLoading={isLoading}
                addRemoveEnable
                usersList={favorites}
                handleAddRemoveClick={handleAddRemoveUsers}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography>{LABELS.FAVORITE_USERS}</Typography>
            </Grid>
            <Grid item container spacing={2} xs={12}>
              {favorites?.length ? (
                favorites.map((user) => (
                  <Grid item xs={12} sm={6} md={3} key={user.id}>
                    <LayoutCard withBorder withBoxShadow>
                      <Box p={2}>
                        <VerticalUserMiniCard
                          id={user.id}
                          name={user.name}
                          headline={user.headline}
                          displayPictureUrl={user.displayPictureUrl}
                          onCardClick={() => {}}
                          handleAddRemoveClick={handleAddRemoveUsers}
                          usersList={favorites}
                          actionLabel={LABELS.UNFAVORITE}
                        />
                      </Box>
                    </LayoutCard>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} minHeight={200}>
                  <Typography pt={10} textAlign="center">
                    {LABELS.FAVORITE_USERS_INSTRUCTIONS}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Container>
      </ModalLayout>
    </>
  );
};

export default FavoritesModal;
