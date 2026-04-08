import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { toCleanQueryString } from "sections/shared/utils/queryParams/queryParams";

interface PaginationProps {
  pageName: string;
  current_page: number;
  last_page: number;
  per_page?: number;
  filterParams: string;
  customerId?: number;
  id?: number;
}

const PaginationComponent = ({
  current_page,
  last_page,
  pageName,
  filterParams,
  id,
}: PaginationProps): React.ReactElement => {
  const [page, setPage] = useState<number>(current_page);
  const navigate = useNavigate();
  const location = useLocation();

  const currentQuery = toCleanQueryString(
    new URLSearchParams(
      filterParams && filterParams.length > 0
        ? filterParams
        : location.search.replace(/^\?/, ""),
    ),
  );
  const querySuffix = currentQuery ? `?${currentQuery}` : "";

  const handlePaginationChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    navigate(`/${pageName}/${id ? `${id}/` : ""}page/${value}${querySuffix}`);
  };

  useEffect(() => {
    if (current_page <= last_page) return;
    pageName !== "" &&
      navigate(
        `/${pageName}/${id ? `${id}/` : ""}page/${last_page}${querySuffix}`,
      );

    if (!current_page && pageName !== "")
      navigate(`/${pageName}/${id ? `${id}/` : ""}page/1${querySuffix}`);
  }, [last_page, current_page, navigate, pageName, id, querySuffix]);

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
          bgcolor: "#335d53",
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
