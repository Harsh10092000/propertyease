import React from "react";
import { Pagination } from "@mui/material";

const AdminPagination = ({
  datalen,
  pagination,
  nPages,
  handleCurreentPage,
  recordsPerPage,
}) => {
  return (
    <>
      {datalen > 0 && pagination && datalen > recordsPerPage && (
        <Pagination
          count={nPages}
          color="primary"
          siblingCount={1}
          //page={currentPage}
          shape="rounded"
          onChange={(e, value) => handleCurreentPage(value)}
          className="col-md-6 mx-auto py-2"
        />
      )}
    </>
  );
};

export default AdminPagination;
