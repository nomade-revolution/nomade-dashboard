import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import { FullOffer } from "modules/offers/domain/Offer";
import { CollabsRepository } from "modules/collabs/domain/CollabsRepository";
import {
  collabsGetAll,
  createCollab,
  deleteCollab,
  getCollab,
  getRejectedCollabReasons,
  updateCollabHistoryState,
  exportCollabs,
  editCollabById,
  getCollabsBadge,
  updateCollabNotes,
} from "modules/collabs/application/collabs";
import { FullCollab, RejectedCollab } from "modules/collabs/domain/Collabs";
import {
  FilterParams,
  PaginationStucture,
} from "sections/shared/interfaces/interfaces";
import { OrderItem } from "sections/user/UserContext/UserContext";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { UserTypes } from "modules/user/domain/User";
import { Http } from "@core";
import { COLLABS_BASE } from "modules/collabs/application/routes";

interface ContextState {
  collabs: FullCollab[];
  collab: FullCollab;
  collabRejectedReasons: RejectedCollab[];
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
  pagination: PaginationStucture;
  createLoading: boolean;
  getAllCollabs: (page: number, per_page: number, params: FilterParams) => void;
  deleteCollabById: (influencer_id: number) => void;
  updateCollabState: (
    collab_id: number,
    state_id: number,
    reject_collab_reason_id?: number,
    reject_collab_reason_text?: string,
  ) => void;
  handleAcceptWithNotes: (
    colabId: number,
    notes: string,
  ) => Promise<{ success: boolean; error?: string; partialSuccess?: boolean }>;
  getAllRejectedCollabReasons: () => void;
  setOrder: (order: OrderItem) => void;
  order: OrderItem;
  getCollabById: (collab_id: number) => void;
  addNewCollab: (collab: FormData) => void;
  exportCollabsExcel: () => void;
  editCollab: (id: number, collab: Partial<FullCollab>) => Promise<boolean>;
  badgeCount: number;
  setBadgeCount: (count: number) => void;
  getCollabsStatusBadge: () => void;
  getCollabsCompaniesStatusBadge: (companyId: number) => void;
}

export const CollabsContext = createContext<ContextState>({} as ContextState);

export const CollabsContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{ repository: CollabsRepository<FullOffer[]> }>) => {
  const [collabs, setCollabs] = useState<FullCollab[]>([]);
  const [collab, setCollab] = useState<FullCollab>({} as FullCollab);
  const [collabRejectedReasons, setCollabRejectedReasons] = useState<
    RejectedCollab[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationStucture>(
    {} as PaginationStucture,
  );
  const { token, user, selectedCompany } = useAuthContext();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderItem>({} as OrderItem);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [badgeCount, setBadgeCount] = useState<number>(0);

  const getAllCollabs = useCallback(
    async (page: number, per_page: number, params: FilterParams) => {
      setLoading(true);
      setError(null);
      const response = await collabsGetAll(repository, page, per_page, params);
      if (isHttpSuccessResponse(response)) {
        setLoading(false);
        setCollabs(response.data.colabs);
        setPagination(response.data.pagination);
      }
    },
    [repository],
  );

  const deleteCollabById = async (collab_id: number) => {
    const response = await deleteCollab(repository, collab_id);

    setIsSuccess(response.success);

    return response;
  };

  const updateCollabState = async (
    collab_id: number,
    state_id: number,
    rejected_collab_reason_id?: number,
    rejected_colab_reason_text?: string,
  ) => {
    const response = await updateCollabHistoryState(
      repository,
      collab_id,
      state_id,
      rejected_collab_reason_id,
      rejected_colab_reason_text,
    );
    if (isHttpSuccessResponse(response)) {
      setCollab(response.data);

      // Refresh badge after state change
      if (user?.type === UserTypes.company && selectedCompany) {
        getCollabsCompaniesStatusBadge(selectedCompany);
      } else {
        getCollabsStatusBadge();
      }
    }

    return response;
  };

  const getAllRejectedCollabReasons = useCallback(async () => {
    setError(null);

    const response = await getRejectedCollabReasons(repository);
    if (isHttpSuccessResponse(response)) {
      setCollabRejectedReasons(response.data);
    }
  }, [repository]);

  const getCollabById = useCallback(
    async (collab_id: number) => {
      setLoading(true);
      const response = await getCollab(repository, collab_id);

      if (isHttpSuccessResponse(response)) {
        setCollab(response.data);
      }

      setLoading(false);
    },
    [repository],
  );

  const addNewCollab = async (collab: FormData) => {
    setCreateLoading(true);
    const response = await createCollab(repository, collab);

    if (isHttpSuccessResponse(response)) {
      setCollab(response.data);
      setCreateLoading(false);
      setIsSuccess(true);

      setTimeout(() => setLoading(true), 3000);
    } else {
      setError(response.error as unknown as string);
    }

    setCreateLoading(false);
    setIsSuccess(response.success);

    return response;
  };
  const exportCollabsExcel = async () => {
    const response = await exportCollabs(repository, token);

    if (response && response instanceof Blob) {
      const href = await URL.createObjectURL(response);
      const link = document.createElement("a");
      link.href = href;
      link.download = `collabs`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(href);
    }
    return response;
  };

  const editCollab = useCallback(
    async (id: number, colab: Partial<FullCollab>): Promise<boolean> => {
      setLoading(true);
      setError(null);
      const response = await editCollabById(repository, id, colab);
      if (isHttpSuccessResponse(response)) {
        setLoading(false);
        setCollab(response.data);
        return true;
      }
      setTimeout(() => setIsSuccess(false), 2000);
      setLoading(false);
      return false;
    },
    [repository],
  );

  const getCollabsStatusBadge = useCallback(async () => {
    const response = await getCollabsBadge(repository);

    if (isHttpSuccessResponse(response)) {
      setBadgeCount(response.data);
    }

    return response;
  }, [repository, user?.type]);

  const getCollabsCompaniesStatusBadge = useCallback(
    async (companyId: number) => {
      const response = await Http.getInstance().get<number>(
        `${COLLABS_BASE}/status/company/${companyId}/badge`,
      );

      if (isHttpSuccessResponse(response)) {
        setBadgeCount(response.data);
      }

      return response;
    },
    [user?.type],
  );

  const handleAcceptWithNotes = useCallback(
    async (colabId: number, notes: string) => {
      try {
        // Step 1: Push history to state 2 using the existing working method
        const pushResponse = await updateCollabHistoryState(
          repository,
          colabId,
          2, // COLAB_PENDING_COMPANY_STATE
        );

        if (!isHttpSuccessResponse(pushResponse)) {
          return {
            success: false,
            error: "No se pudo actualizar el estado de la collab",
          };
        }

        // Step 2: Update collab with notes
        const updateResponse = await updateCollabNotes(
          repository,
          colabId,
          notes,
        );

        if (isHttpSuccessResponse(updateResponse)) {
          // Update context with the latest collab data
          setCollab(updateResponse.data);

          // Update the specific collab in the list
          setCollabs((prevCollabs) =>
            prevCollabs.map((collab) =>
              collab.id === colabId
                ? { ...collab, ...updateResponse.data }
                : collab,
            ),
          );

          // Refresh badge after successful state change
          if (user?.type === UserTypes.company && selectedCompany) {
            getCollabsCompaniesStatusBadge(selectedCompany);
          } else {
            getCollabsStatusBadge();
          }

          return { success: true };
        } else {
          // Partial success: state updated but notes failed
          setCollab(pushResponse.data);

          // Update the specific collab in the list with state change only
          setCollabs((prevCollabs) =>
            prevCollabs.map((collab) =>
              collab.id === colabId
                ? { ...collab, ...pushResponse.data }
                : collab,
            ),
          );

          // Refresh badge after state change (even if notes failed)
          if (user?.type === UserTypes.company && selectedCompany) {
            getCollabsCompaniesStatusBadge(selectedCompany);
          } else {
            getCollabsStatusBadge();
          }

          return {
            success: false,
            error: "Estado actualizado pero el comentario no se pudo guardar",
            partialSuccess: true,
          };
        }
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Error desconocido",
        };
      }
    },
    [
      repository,
      user?.type,
      selectedCompany,
      getCollabsStatusBadge,
      getCollabsCompaniesStatusBadge,
    ],
  );

  return (
    <CollabsContext.Provider
      value={{
        collabs,
        collab,
        collabRejectedReasons,
        loading,
        createLoading,
        error,
        isSuccess,
        pagination,
        getAllCollabs,
        deleteCollabById,
        updateCollabState,
        handleAcceptWithNotes,
        getAllRejectedCollabReasons,
        order,
        setOrder,
        getCollabById,
        addNewCollab,
        exportCollabsExcel,
        editCollab,
        badgeCount,
        getCollabsStatusBadge,
        getCollabsCompaniesStatusBadge,
        setBadgeCount,
      }}
    >
      {children}
    </CollabsContext.Provider>
  );
};
