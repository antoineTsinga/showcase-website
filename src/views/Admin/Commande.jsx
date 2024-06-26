import React, { useEffect, useState } from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import {
  useFashionCollections,
  useItems,
  useOrders,
} from "./../../common/collections";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { BsFillCloudUploadFill } from "react-icons/bs";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialog from "../../common/Dialogue";
import CustomNoRowsOverlay from "./../../common/CustomNoRowsOverlay";
import ShowUser from "./ShowUser";

export default function ManageOrder() {
  const apiRef = useGridApiRef();

  const {
    unsortedItems: data,
    fetchItems,
    updateItem,
    loading: isLoading,
    total,
  } = useOrders();

  const columns = [
    {
      field: "client",
      headerName: "Client",

      flex: 1,
    },
    {
      field: "appointment",
      headerName: "RDV",
      type: "dateTime",

      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Créé le",
      type: "dateTime",

      flex: 1,
    },

    {
      field: "items",
      headerName: "Articles",
      hide: true,
      flex: 1,
    },
    {
      field: "action",
      flex: 2,
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking7
        };
        console.log(params);

        const id = params.row.client;
        return <ShowUser userId={id} />;
      },
    },
  ];

  // Some API clients return undefined while loading
  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [queryParams, setQueryParams] = useState({
    "Page-Size": 5,
    "Page-Number": 0,
  });

  const [change, setChange] = useState(0);

  useEffect(() => {
    async function fetchData() {
      await fetchItems({}, { ...queryParams });
    }
    fetchData();
  }, [queryParams, change]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        rowCount={total}
        loading={isLoading}
        rowsPerPageOptions={[5]}
        pagination
        page={queryParams["Page-Number"]}
        pageSize={queryParams["Page-Size"]}
        paginationMode="server"
        onPageSizeChange={(size) =>
          setQueryParams({ ...queryParams, "Pige-Size": size })
        }
        onPageChange={(page) => {
          setQueryParams({
            ...queryParams,
            "Page-Number": page,
          });
        }}
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        columns={columns}
        apiRef={apiRef}
      />
    </div>
  );
}
