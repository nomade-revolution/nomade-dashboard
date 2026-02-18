import React, { useState, useCallback } from "react";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
import { Company } from "modules/user/domain/User";
import { isHttpSuccessResponse } from "sections/shared/utils/typeGuards/typeGuardsFunctions";
import Loader from "sections/shared/components/Loader/Loader";
import { AssignExistingCompanyModalStyled } from "./AssignExistingCompanyModalStyled";

interface AssignExistingCompanyModalProps {
  open: boolean;
  onClose: () => void;
  currentUserId: number;
  onSuccess: () => void;
}

type ConfirmMode = "no_user" | "has_user";

interface ConfirmState {
  company: Company;
  mode: ConfirmMode;
}

export const AssignExistingCompanyModal = ({
  open,
  onClose,
  currentUserId,
  onSuccess,
}: AssignExistingCompanyModalProps): React.ReactElement => {
  const {
    getCompaniesWithParams,
    companies,
    fetchCompanyById,
    editCompanyCms,
    loading,
  } = useCompanyContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);
  const [assigning, setAssigning] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(() => {
    const term = searchTerm.trim();
    if (term.length >= 2) {
      setHasSearched(true);
      getCompaniesWithParams({ filters: { search: term } });
    }
  }, [searchTerm, getCompaniesWithParams]);

  const assignCompanyToUser = useCallback(
    async (companyId: number) => {
      setAssigning(true);
      const formData = new FormData();
      formData.append("user_id", String(currentUserId));
      const response = await editCompanyCms(formData, companyId);
      setAssigning(false);
      if (isHttpSuccessResponse(response)) {
        setConfirmState(null);
        setSearchTerm("");
        setHasSearched(false);
        onSuccess();
        onClose();
      } else {
        alert(
          "Error al asignar la empresa. " +
            (response.error ? String(response.error) : ""),
        );
      }
    },
    [currentUserId, editCompanyCms, onSuccess, onClose],
  );

  const handleSelectCompany = useCallback(
    async (company: Company) => {
      const companyWithUsers = await fetchCompanyById(company.id);
      if (!companyWithUsers) return;
      const hasUser =
        companyWithUsers.users && companyWithUsers.users.length > 0;
      setConfirmState({
        company: companyWithUsers,
        mode: hasUser ? "has_user" : "no_user",
      });
    },
    [fetchCompanyById],
  );

  const handleConfirm = useCallback(() => {
    if (confirmState) {
      assignCompanyToUser(confirmState.company.id);
    }
  }, [confirmState, assignCompanyToUser]);

  const handleCloseConfirm = useCallback(() => {
    setConfirmState(null);
  }, []);

  const assignedUser =
    confirmState?.company?.users && confirmState.company.users.length > 0
      ? confirmState.company.users[0]
      : null;

  return (
    <>
      <ReusableModal openModal={open} setIsModalOpen={onClose} type="client">
        <AssignExistingCompanyModalStyled>
          <h3 className="assign-modal__title">Asignar cliente existente</h3>
          <div className="assign-modal__search-row">
            <input
              type="text"
              className="assign-modal__input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Buscar por nombre o NIF..."
              aria-label="Buscar empresa"
            />
            <button
              type="button"
              className="assign-modal__search-btn"
              onClick={handleSearch}
              disabled={searchTerm.trim().length < 2}
            >
              Buscar
            </button>
          </div>
          {loading && (
            <div style={{ padding: "20px", textAlign: "center" }}>
              <Loader width="24px" height="24px" />
            </div>
          )}
          {!loading && hasSearched && companies.length > 0 && (
            <ul className="assign-modal__list">
              {companies.map((c) => (
                <li
                  key={c.id}
                  className="assign-modal__list-item"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectCompany(c)}
                  onKeyDown={(e) => e.key === "Enter" && handleSelectCompany(c)}
                >
                  <strong>{c.company_name || c.company}</strong>
                  {c.nif ? ` — ${c.nif}` : ""}
                </li>
              ))}
            </ul>
          )}
          {!loading && hasSearched && companies.length === 0 && (
            <p className="assign-modal__empty">No se encontraron empresas.</p>
          )}
        </AssignExistingCompanyModalStyled>
      </ReusableModal>

      {confirmState && (
        <ReusableModal
          openModal={Boolean(confirmState)}
          setIsModalOpen={handleCloseConfirm}
          type="client"
        >
          <AssignExistingCompanyModalStyled className="assign-modal--confirm">
            {confirmState.mode === "no_user" ? (
              <>
                <h3 className="assign-modal__title">Confirmar asignación</h3>
                <p className="assign-modal__confirm-text">
                  Esta empresa no tiene usuario vinculado. ¿Deseas asignarla a
                  este usuario?
                </p>
                <div className="assign-modal__actions">
                  <button
                    type="button"
                    className="assign-modal__btn-confirm"
                    onClick={handleConfirm}
                    disabled={assigning}
                  >
                    {assigning ? (
                      <Loader width="18px" height="18px" />
                    ) : (
                      "Confirmar"
                    )}
                  </button>
                  <button
                    type="button"
                    className="assign-modal__btn-cancel"
                    onClick={handleCloseConfirm}
                    disabled={assigning}
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="assign-modal__title">Reasignar empresa</h3>
                <p className="assign-modal__confirm-text">
                  La empresa actualmente está asignada a:
                </p>
                <div className="assign-modal__confirm-user">
                  {[assignedUser?.name, assignedUser?.surname]
                    .filter(Boolean)
                    .join(" ") || assignedUser?.email}
                  {assignedUser?.email && (
                    <div className="assign-modal__confirm-user-email">
                      {assignedUser.email}
                    </div>
                  )}
                </div>
                <p className="assign-modal__confirm-text">Si continúas:</p>
                <ul className="assign-modal__confirm-list">
                  <li>El usuario anterior será desvinculado.</li>
                  <li>
                    Si no tiene más empresas, será dado de baja (soft delete).
                  </li>
                </ul>
                <p className="assign-modal__confirm-text">¿Deseas continuar?</p>
                <div className="assign-modal__actions">
                  <button
                    type="button"
                    className="assign-modal__btn-confirm"
                    onClick={handleConfirm}
                    disabled={assigning}
                  >
                    {assigning ? (
                      <Loader width="18px" height="18px" />
                    ) : (
                      "Confirmar reasignación"
                    )}
                  </button>
                  <button
                    type="button"
                    className="assign-modal__btn-cancel"
                    onClick={handleCloseConfirm}
                    disabled={assigning}
                  >
                    Cancelar
                  </button>
                </div>
              </>
            )}
          </AssignExistingCompanyModalStyled>
        </ReusableModal>
      )}
    </>
  );
};

export default AssignExistingCompanyModal;
