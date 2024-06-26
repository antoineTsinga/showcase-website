import React, { useEffect, useState } from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { useItems } from "./../../common/collections";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { BsFillCloudUploadFill } from "react-icons/bs";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialog from "../../common/Dialogue";
import CustomNoRowsOverlay from "../../common/CustomNoRowsOverlay";

export default function ManageItems() {
  const apiRef = useGridApiRef();

  const {
    unsortedItems: data,
    fetchItems,
    updateItem,
    deleteItem,
    loading: isLoading,
    total,
  } = useItems();

  const genres = ["Homme", "Femme", "Enfant"];
  const categories = [
    "Chemises",
    "Jeans",
    "Ensembles",
    "Vests",
    "Bas",
    "Tops",
    "Accessoires",
  ];

  const columns = [
    {
      field: "id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      editable: true,
      flex: 1,
    },
    {
      field: "estimatedPrice",
      type: "number",
      valueFormatter: ({ value }) => `${value}€`,
      editable: true,

      headerName: "estimatedPrice",
      flex: 1,
    },
    {
      field: "category",
      headerName: "category",
      type: "singleSelect",
      valueOptions: [0, 1, 2, 3, 4, 5, 6, 7],
      valueFormatter: ({ value }) => categories[value],
      valueSetter: ({ value, row }) => ({ ...row, category: value }),
      editable: true,
      flex: 1,
    },
    {
      field: "genre",
      headerName: "genre",
      type: "singleSelect",
      valueOptions: [0, 1, 2],
      valueFormatter: ({ value }) => genres[value],
      valueSetter: ({ value, row }) => ({ ...row, genre: value }),
      editable: true,
      flex: 1,
    },
    {
      field: "inGallery",
      headerName: "Gallery",
      editable: true,

      type: "boolean",
      flex: 1,
    },
    {
      field: "inCatalog",
      headerName: "Catalogue",
      type: "boolean",
      editable: true,
      flex: 1,
    },
    {
      field: "fashionCollection",
      headerName: "fashionCollection",
      hide: true,
      flex: 1,
    },
    {
      field: "image",
      headerName: "image",
      flex: 1,
      hide: true,
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

        const id = params.row.id;
        return (
          <>
            <AlertDialog>
              <IconButton color="primary" aria-label="add to shopping cart">
                <Box
                  component="img"
                  alt="Logo Studeat"
                  src={
                    process.env.PUBLIC_URL + `/image-items/${params.row.image}`
                  }
                />
              </IconButton>
            </AlertDialog>
            <DeleteIcon
              onClick={() => {
                setChange(id);
                deleteItem({ id });
              }}
            />
          </>
        );
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
        onCellEditCommit={(field, e) => {
          const item = data.filter((item1) => item1.id === field.id)[0];

          updateItem(field.id, {
            ...item,
            [field.field]: field.value,
            fashionCollection: item.fashionCollection.id,
          });
          setChange(field.id);
        }}
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
