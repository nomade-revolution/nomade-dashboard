const useActions = () => {
  const handleIsDialogOpen = (setter: (value: boolean) => void) => {
    setter(true);
  };

  const handleIsDialogClosed = (setter: (value: boolean) => void) => {
    setter(false);
  };
  return {
    handleIsDialogOpen,
    handleIsDialogClosed,
  };
};

export default useActions;
