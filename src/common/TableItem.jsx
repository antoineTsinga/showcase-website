import React, { useState, useEffect } from "react";

import { NotificationManager } from "react-notifications";
import { DataGridPro, GridToolbar, useGridApiRef } from "@mui/x-data-grid-pro";
import { Button, FormControlLabel, Switch } from "@mui/material";
import { MdSend } from "react-icons/md";
import { BiUpload } from "react-icons/bi";
import { Link } from "react-router-dom";

import CustomNoRowsOverlay from "./CustomNoRowsOverlay";
import { mainColor } from "@inplan/common/Form/styles";

const styles = {
  header: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    height: 80,
  },
  actionValidate: {
    minWidth: 190,
    color: "black",
    border: "2px solid black",
    cursor: "pointer",
    fontFamily: "Source Sans Pro",
    fontWeight: 700,

    "&:hover": {
      backgroundColor: "black",
      color: "#f6f6F6",
      border: "#f6f6f6",
    },
  },
  actionButton: {
    width: 200,
    display: "flex",
    justifyContent: "center",
    margin: "0px 20px",
  },
};

const columns = () => [
  {
    field: "creator",
    headerName: "Doctor",
    flex: 1,
    valueGetter: ({ row }) => row.creator?.username,
  },
  {
    field: "patient_surname",
    headerName: "Last name",
    flex: 1,
    valueGetter: ({ row }) => row.patient?.last_name,
  },
  {
    field: "patient_firstname",
    headerName: "First name",
    flex: 1,
    valueGetter: ({ row }) => row.patient?.first_name,
  },
  ...orderColumns,
  {
    field: "actions",
    type: "actions",
    headerName: "Go to the patient",
    width: 200,
    getActions: (params) => [
      <Link to={`dashboard/${params.row.patient.id}/setups`}>
        <BiUpload style={{ cursor: "pointer", fontSize: 40, padding: 8 }} />
      </Link>,
    ],
  },
];

const TaskTable = ({
  exclude,
  creator,
  pendingStatus,
  finishedStatus,
  validateStatus,
  printingButton = true,
}) => {
  const { fetchItems, unsortedItems, total, loading } = useOrders();
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowType, setSelectedRowType] = useState(null);
  const [queryParams, setQueryParams] = useState({
    limit: 25,
    offset: 0,
    filters: undefined,
    order: undefined,
    status: 1,
    creator,
  });

  const [displayPendingOrders, setDisplayPendingOrders] = useState(true);
  const [displayDelayOrders, setDisplayDelayOrders] = useState(true);

  const apiRef = useGridApiRef();

  const validate = async () => {
    const waiters = selectedRows.map((row) =>
      backend.patch(`orders/${row}`, {
        status: validateStatus(unsortedItems.find((order) => order.id === row)),
      })
    );

    await Promise.all(waiters);
    fetchItems(queryParams);
  };

  useEffect(() => {
    setQueryParams({
      ...queryParams,
      creator,
    });
  }, [creator]);

  useEffect(() => {
    setQueryParams({
      ...queryParams,
      status: displayPendingOrders ? pendingStatus : finishedStatus,
    });
  }, [displayPendingOrders]);

  useEffect(() => {
    fetchItems(queryParams);
  }, [JSON.stringify(queryParams)]);

  useEffect(() => {
    if (selectedRows.length === 0) {
      setSelectedRowType(null);
    }
    if (selectedRows.length === 1) {
      const forder = unsortedItems.find(
        (order) => order.id === selectedRows[0]
      );
      setSelectedRowType(forder.type);
    }
  }, [selectedRows]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={styles.header}>
        <div>
          <Button
            style={{ display: "none" }}
            data-test="showFilter"
            onClick={() => apiRef.current.showFilterPanel("type")}
          >
            Show Filter. Use only by test to shortcut the filter menu opening
          </Button>
          {printingButton ? (
            <Button
              style={{
                width: 200,
                display: "flex",
                justifyContent: "center",
                margin: "0px 20px",
              }}
              variant="contained"
              onClick={() => {
                selectedRows.forEach((row) => {
                  backend.post(`orders/${row}/send_to_print`);
                });
                NotificationManager.success(
                  "Models are now available in models tabs"
                );
                fetchItems(queryParams);
              }}
              data-test="launch-printing"
            >
              Launch printing
            </Button>
          ) : null}
        </div>
        <div style={styles.actionButton}>
          <Button
            variant="outlined"
            size="large"
            sx={{ ...styles.actionValidate }}
            endIcon={<MdSend />}
            disabled={!displayPendingOrders || selectedRows.length === 0}
            data-test="validate"
            onClick={() => {
              validate();
            }}
          >
            Validate orders
          </Button>
        </div>
      </div>
      <div
        className="dashboard-table-container"
        style={{ alignItems: "start" }}
      >
        <div>
          <FormControlLabel
            checked={displayPendingOrders}
            control={
              <Switch
                color="primary"
                onChange={() => {
                  setDisplayPendingOrders(!displayPendingOrders);
                }}
              />
            }
            label={displayPendingOrders ? "Pending orders" : "Finished orders"}
            labelPlacement="top"
            sx={{ color: "black" }}
          />
          <FormControlLabel
            checked={displayDelayOrders}
            control={
              <Switch
                color="primary"
                onChange={() => {
                  setDisplayDelayOrders(!displayDelayOrders);
                }}
              />
            }
            label={
              displayDelayOrders ? "Delay orders (on) " : "Delay orders (off)"
            }
            labelPlacement="top"
            sx={{ color: "black" }}
          />
        </div>
        <DataGridPro
          columns={columns().filter((c) => !exclude?.includes(c.field))}
          rows={unsortedItems}
          rowCount={total}
          checkboxSelection
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
            Toolbar: GridToolbar,
          }}
          loading={loading}
          rowsPerPageOptions={[5, 25, 50, 100]}
          pagination
          paginationMode="server"
          pageSize={queryParams.limit}
          onPageSizeChange={(size) =>
            setQueryParams({ ...queryParams, limit: size })
          }
          onPageChange={(p) => {
            setQueryParams({
              ...queryParams,
              offset: Number(p) * queryParams.limit,
            });
          }}
          filterMode="server"
          sortingMode="server"
          onSortModelChange={(model) => {
            if (model.length === 0) {
              setQueryParams({
                ...queryParams,
                order: undefined,
              });
            } else {
              const [{ field, sort }] = model;
              setQueryParams({
                ...queryParams,
                order: `${field}_${sort}`,
              });
            }
          }}
          onFilterModelChange={(listModels) => {
            setQueryParams({ ...queryParams, filters: listModels });
          }}
          onSelectionModelChange={(rowsIds) => setSelectedRows(rowsIds)}
          isRowSelectable={(model) =>
            !selectedRowType || model.row.type === selectedRowType
          }
          componentsProps={{
            row: { "data-test": "row-lab" },
            cell: { "data-test": "cell-lab" },
          }}
          autoHeight
          getRowClassName={(params) => {
            let className = params.row.is_downloaded
              ? "order-in-progress-allrows order-in-progress-not-editable-row"
              : "order-in-progress-allrows";
            const today = new Date();
            if (
              displayDelayOrders &&
              params.row?.deadline !== null &&
              today > new Date(params.row?.deadline)
            ) {
              className = `${className} outdated-order-deadline`;
            }

            return className;
          }}
          sx={{
            "& svg[data-value='true']": { fill: mainColor },
            width: "100%",
          }}
          apiRef={apiRef}
        />
      </div>
    </div>
  );
};

export default TaskTable;
