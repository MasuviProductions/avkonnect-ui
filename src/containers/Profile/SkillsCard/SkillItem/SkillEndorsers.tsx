import { Box } from "@mui/material";
import ModalLayout, {
  IModalLayoutProps,
} from "../../../../components/ModalLayout/ModalLayout";
import UserStrip from "../../../../components/UserStrip";
import { IUserSkillEndorserApiModel } from "../../../../interfaces/api/external";

interface ISkillEndorsersProps extends IModalLayoutProps {
  title: string;
  endorsers: IUserSkillEndorserApiModel[];
}

const SkillEndorsers: React.FC<ISkillEndorsersProps> = ({
  title,
  endorsers,
  showModal,
  onModalClose,
}) => {
  return (
    <>
      <ModalLayout
        title={title}
        maxWidth="sm"
        showModal={showModal}
        onModalClose={onModalClose}
      >
        {endorsers.map((endorser) => (
          <Box key={endorser.endorserId} p={2}>
            <UserStrip
              id={endorser.endorserId}
              name={endorser.name as string}
              headline={endorser.headline as string}
              displayPictureUrl={endorser.displayPictureUrl as string}
            />
          </Box>
        ))}
      </ModalLayout>
    </>
  );
};

export default SkillEndorsers;
