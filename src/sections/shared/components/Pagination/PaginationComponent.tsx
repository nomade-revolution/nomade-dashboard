import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface PaginationProps {
  pageName: string;
  current_page: number;
  last_page: number;
  per_page?: number;
  filterParams: string;
  customerId?: number;
}

const PaginationComponent = ({
  current_page,
  last_page,
  pageName,
  filterParams,
}: PaginationProps): React.ReactElement => {
  const [page, setPage] = useState<number>(current_page);
  const navigate = useNavigate();

  const handlePaginationChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    navigate(`/${pageName}/page/${value}?${filterParams ? filterParams : ""}`);
  };

  useEffect(() => {
    if (current_page <= last_page) return;
    navigate(`/${pageName}/page/${last_page}`);

    if (!current_page) navigate(`/${pageName}/page/1`);
  }, [last_page, current_page, navigate, pageName]);

  useEffect(() => {
    setPage(current_page);
  }, [current_page, filterParams]);

  return (
    <Pagination
      size="large"
      count={last_page}
      page={page}
      siblingCount={4}
      onChange={handlePaginationChange}
      shape="rounded"
      color="primary"
      sx={{
        "Button.MuiPaginationItem-rounded.Mui-selected": {
          bgcolor: "#8C9B6E",
          color: "white",
        },
        "Button.MuiPaginationItem-rounded": {
          bgcolor: "#F0F0F0",
          color: "#BBBBBB",
        },
      }}
    />
  );
};

export default PaginationComponent;
