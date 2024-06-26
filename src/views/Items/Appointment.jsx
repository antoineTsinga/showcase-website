import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DatePicker from "react-datepicker";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { backend } from "../../adapters/apiCalls";
import { NotificationManager } from "react-notifications";
import useCollection from "../../common/useCollection";
import { useFashionCollections } from "../../common/collections";

export default function Appointment({ cart, client_id }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newItem, setNewItem] = useState({
    appointment: "2022-06-01T18:20",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(e) {
    e.preventDefault();

    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  }

  async function saveItem() {
    setLoading(true);
    await backend
      .post("/orders", {
        ...newItem,
        client_id,
        items: cart.items.map((item) => item.id),
      })
      .then(({ status }) => {
        setLoading(false);
        if (status !== 200) return;
        NotificationManager.success("Comment validé");
      })
      .catch(() => {
        setLoading(false);
      });
    setLoading(false);
  }

  return (
    <div>
      <Button
        variant="contained"
        style={{ width: "100%", backgroundColor: "#000" }}
        onClick={saveItem}
      >
        Valider le panier
      </Button>
    </div>
  );
}
