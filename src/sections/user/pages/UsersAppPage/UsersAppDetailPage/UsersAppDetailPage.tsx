import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UsersAppDetailPageStyled from "./UsersAppDetailPageStyled";
import Loader from "sections/shared/components/Loader/Loader";
import GoBackButton from "sections/shared/components/GoBackButton/GoBackButton";
import ActionButton from "sections/shared/components/ActionButton/ActionButton";
import theme from "assets/styles/theme";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { FaEdit } from "react-icons/fa";
import EditUserAppForm from "./components/EditUserAppForm/EditUserAppForm";
import { useUserContext } from "sections/user/UserContext/useUserContext";
import UserDetailData from "./components/UserAppDetailData/UserAppDetailData";
// import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
// import { STATES_OPTIONS } from "sections/influencer/pages/InfluencerDetailPage/InfluencerDetailPage";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import DashboardCardListMobile from "sections/shared/components/DashboardCardListMobile/DashboardCardListMobile";
import { companyFromUsersTableHeaderSections } from "sections/company/utils/companySections";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import DialogDeleteConfirm from "sections/shared/components/DialogDeleteConfirm/DialogDeleteConfirm";
import AddCompanyForm from "./components/AddCompanyForm/AddCompanyForm";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
// import useActions from "sections/shared/hooks/useActions/useActions";

const UsersAppDetailPage = (): React.ReactElement => {
  const { loading, getUser, userData } = useUserContext();
  const { postBaseCompany } = useCompanyContext();

  // const { handleIsDialogOpen } = useActions();

  const [isAddCompanyFormOpen, setIsAddCompanyFormOpen] =
    useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [isDialogEditStateOpen, setIsDialogEditStateOpen] =
    useState<boolean>(false);
  const [userState /*setUserState*/] = useState<number>(0);
  const { id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    getUser(+id!);
  }, [getUser, id]);

  const handleOnSubmit = () => {
    setIsEditFormOpen(false);
    getUser(+id!);
  };

  const handleCreateNewClient = async (data: FormData) => {
    data.append("user_id", id!);
    const res = await postBaseCompany(data);
    // @ts-expect-error TODO fix this
    if (res.success) {
      setIsAddCompanyFormOpen(false);
      getUser(+id!);
    }
  };

  // const handleModifyStateButton = (event: SelectChangeEvent<string>) => {
  //   const newValue = parseInt(event.target.value);
  //   setUserState(newValue);
  //   handleIsDialogOpen(setIsDialogEditStateOpen);
  // };

  // TODO por rellenar cuando venga
  //  const currentState = STATES_OPTIONS.find(
  //     (state) => state.id === String(userData?.state?.id),
  //   )?.id;

  if (loading) return <Loader width="20px" height="20px" />;

  return (
    <ReusablePageStyled className="dashboard">
      <UsersAppDetailPageStyled className="influencer-detail">
        <GoBackButton />
        <section className="influencer-detail__header">
          <div className="influencer-detail__title">
            <h2>Usuario (Empresa)</h2>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {/* TODO restaurar cuando venga el estado actual */}
            {/* {user.type === "Nomade" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={currentState}
                label="Estado"
                onChange={handleModifyStateButton}
              >
                {STATES_OPTIONS.map((state) => (
                  <MenuItem value={state.id} disabled={state.id === "1"}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            ) : null} */}
            {user.type === "Nomade" && (
              <ActionButton
                onClick={() => setIsAddCompanyFormOpen(true)}
                text="Añadir cliente"
                icon={<FaEdit />}
                color={theme.colors.darkBlue}
              />
            )}
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

        {userData ? (
          <div style={{ width: "100%" }}>
            <h2 style={{ marginBottom: "10px" }}>Empresas</h2>
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <DashboardTable
                bodySections={userData.companies || []}
                headerSections={companyFromUsersTableHeaderSections}
                pageName={SectionTypes.customers}
              />
            </section>
            <div className="list-mobile">
              <DashboardCardListMobile
                bodySections={user.companies || []}
                headerSections={companyFromUsersTableHeaderSections}
                pageName={SectionTypes.customers}
              />
            </div>
          </div>
        ) : null}

        {/* <DialogDeleteConfirm
        handleClose={() => setIsDialogOpen(false)}
        open={isDialogOpen}
        sectionId={influencer.id!}
        pageName={SectionTypes.influencers}
      /> */}

        {userData ? (
          <DialogDeleteConfirm
            handleClose={() => setIsDialogEditStateOpen(false)}
            open={isDialogEditStateOpen}
            sectionId={userData.id!}
            accept_state_id={userState}
            type="modifyState"
            pageName={SectionTypes.usersApp}
            successText="Estado modificado"
          />
        ) : null}

        <ReusableModal
          children={
            userData ? (
              <EditUserAppForm
                initialState={userData}
                onSubmit={handleOnSubmit}
                setIsOpen={setIsEditFormOpen}
              />
            ) : (
              <></>
            )
          }
          openModal={isEditFormOpen}
          setIsModalOpen={setIsEditFormOpen}
          type="client"
        />

        <ReusableModal
          children={
            <AddCompanyForm
              onSubmit={handleCreateNewClient}
              setIsOpen={setIsAddCompanyFormOpen}
            />
          }
          openModal={isAddCompanyFormOpen}
          setIsModalOpen={setIsAddCompanyFormOpen}
          type="client"
        />
      </UsersAppDetailPageStyled>
    </ReusablePageStyled>
  );
};

export default UsersAppDetailPage;
