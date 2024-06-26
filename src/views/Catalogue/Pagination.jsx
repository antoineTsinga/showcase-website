import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useCatalogueContext } from "./CatalogueContext";
import Items from "../Items/Items";

export default function PaginationControlled() {
  const { pageTotal, setPage } = useCatalogueContext();
  const [paginationPage, setPaginationPage] = useState(1);

  const handleChange = (event, value) => {
    setPaginationPage(value);
    setPage(value - 1);
  };

  return (
    <Stack spacing={2} className="mt-5">
      <Pagination
        count={pageTotal}
        page={paginationPage}
        onChange={handleChange}
        boundaryCount={2}
      />
    </Stack>
  );
}
