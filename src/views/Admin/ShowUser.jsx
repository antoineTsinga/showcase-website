import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { backend } from "./../../adapters/apiCalls";

export default function ShowUser({ userId }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const { data: user } = await backend.get(`users/${userId}`);
      setUser(user);
    }

    fetchData();
  }, [userId]);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        voir plus d'info
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Cette utilisateur à pris rendez-vous"}
        </DialogTitle>
        <DialogContent>
          {user.firstName + " " + user.lastName}
          <br />
          {user.email}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
