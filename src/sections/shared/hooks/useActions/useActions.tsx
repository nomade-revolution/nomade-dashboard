import { useLeadsContext } from "sections/leads/LeadsContext/useLeadsContext";

const useActions = () => {
  const { sendLinkForLead } = useLeadsContext();

  const handleIsDialogOpen = (setter: (value: boolean) => void) => {
    setter(true);
  };

  const handleIsDialogClosed = (setter: (value: boolean) => void) => {
    setter(false);
  };

  const handleSendLeadLink = async (section_id: number) => {
    await sendLinkForLead(section_id);
  };
  return {
    handleIsDialogOpen,
    handleIsDialogClosed,
    handleSendLeadLink,
  };
};

export default useActions;
