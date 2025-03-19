import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UsersDetailPageStyled from "./UsersDetailPageStyled";
import Loader from "sections/shared/components/Loader/Loader";
import GoBackButton from "sections/shared/components/GoBackButton/GoBackButton";
import ActionButton from "sections/shared/components/ActionButton/ActionButton";
import theme from "assets/styles/theme";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { FaEdit } from "react-icons/fa";
import EditUserForm from "./components/EditUserForm/EditUserForm";
import { useUserContext } from "sections/user/UserContext/useUserContext";
import UserDetailData from "./components/UserDetailData/UserDetailData";

const UsersDetailPage = (): React.ReactElement => {
  const { loading, getUser, userData } = useUserContext();
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);

  const { id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    getUser(+id!);
  }, [getUser, id]);

  const handleOnSubmit = () => {
    setIsEditFormOpen(false);
    getUser(+id!);
  };

  if (loading) return <Loader width="20px" height="20px" />;

  return (
    <UsersDetailPageStyled className="influencer-detail">
      <GoBackButton />
      <section className="influencer-detail__header">
        <div className="influencer-detail__title">
          <h2>Usuario</h2>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {user.type === "Nomade" && (
            <ActionButton
              onClick={() => setIsEditFormOpen(true)}
              text="Editar usuario"
              icon={<FaEdit />}
              color={theme.colors.darkBlue}
            />
          )}
          {/* {user.type === "Nomade" && (
                    <ActionButton
                      onClick={handleDeleteButton}
                      text="Borrar"
                      icon={<FaRegTrashCan />}
                      color={theme.colors.red}
                    />
                  )} */}
        </div>
      </section>

      {userData ? (
        <section className="influencer-detail__info">
          <UserDetailData user={userData} />
        </section>
      ) : null}

      {/* <DialogDeleteConfirm
        handleClose={() => setIsDialogOpen(false)}
        open={isDialogOpen}
        sectionId={influencer.id!}
        pageName={SectionTypes.influencers}
      /> */}

      <ReusableModal
        children={
          userData ? (
            <EditUserForm initialState={userData} onSubmit={handleOnSubmit} />
          ) : (
            <></>
          )
        }
        openModal={isEditFormOpen}
        setIsModalOpen={setIsEditFormOpen}
        type="client"
      />
    </UsersDetailPageStyled>
  );
};

export default UsersDetailPage;
