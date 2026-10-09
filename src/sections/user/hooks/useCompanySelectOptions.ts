import { useCallback, useEffect, useRef, useState } from "react";
import { Company } from "modules/user/domain/User";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";

export const useCompanySelectOptions = (enabled: boolean) => {
  const { fetchCompanyOptions } = useCompanyContext();
  const [companyOptions, setCompanyOptions] = useState<Company[]>([]);
  const [companyLoading, setCompanyLoading] = useState(enabled);
  const abortRef = useRef<AbortController | null>(null);

  const loadCompanyOptions = useCallback(
    async (search?: string) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setCompanyLoading(true);
      try {
        const companies = await fetchCompanyOptions(search, controller.signal);
        if (controller.signal.aborted) return;
        setCompanyOptions(companies);
      } catch {
        if (controller.signal.aborted) return;
        setCompanyOptions([]);
      } finally {
        if (!controller.signal.aborted) {
          setCompanyLoading(false);
        }
      }
    },
    [fetchCompanyOptions],
  );

  useEffect(() => {
    if (!enabled) {
      abortRef.current?.abort();
      setCompanyOptions([]);
      setCompanyLoading(false);
      return;
    }

    void loadCompanyOptions();
    return () => {
      abortRef.current?.abort();
    };
  }, [enabled, loadCompanyOptions]);

  const searchCompanies = useCallback(
    (text: string) => {
      if (text.length > 2) {
        void loadCompanyOptions(text);
      }
    },
    [loadCompanyOptions],
  );

  const onCompanySearchChange = useCallback(
    (text: string) => {
      if (text.length < 3) {
        void loadCompanyOptions();
      }
    },
    [loadCompanyOptions],
  );

  return {
    companyOptions,
    companyLoading,
    searchCompanies,
    onCompanySearchChange,
  };
};
