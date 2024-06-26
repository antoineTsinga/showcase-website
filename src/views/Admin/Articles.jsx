import { Button } from "@mui/material";
import React from "react";
import AddCollections from "./AddCollections";
import AddItems from "./AddItems";
import ManageItems from "./ManageItems";

const Articles = () => {
  return (
    <div style={{ width: "80%" }}>
      <h1>Mes articles</h1>
      <div className="d-flex flex-row">
        <AddItems />
        <AddCollections />
      </div>

      <ManageItems />
    </div>
  );
};

export default Articles;
