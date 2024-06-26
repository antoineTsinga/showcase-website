import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
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
import { useFashionCollections } from "./../../common/collections";

export default function AddItems() {
  const { fetchItems: fetchFashionCollection, items: collections } =
    useFashionCollections();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    estimatedPrice: 0,
    image: "",
    fashionCollection: 0,
    category: 0,
    genre: 0,
    inGallery: true,
    inCatalog: true,
  });

  useEffect(() => {
    fetchFashionCollection({}, { "Page-Size": 5, "Page-Number": 0 });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(e) {
    e.preventDefault();

    console.log(e);

    if (e.target.name === "inGallery" || e.target.name === "inCatalog") {
      setNewItem({ ...newItem, [e.target.name]: e.target.checked });
    } else {
      setNewItem({ ...newItem, [e.target.name]: e.target.value });
    }
  }

  function changeFile(e) {
    console.log(e);
  }

  async function saveItem() {
    setLoading(true);
    await backend
      .post("/items", { ...newItem })
      .then(({ status }) => {
        setLoading(false);
        if (status !== 200) return;
        NotificationManager.success("Article créé");
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Ajouter un article
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ajouter un article"}
        </DialogTitle>
        <DialogContent>
          <div className="container">
            <div className="row">
              <div className="col">
                <div>
                  <Box
                    component="img"
                    sx={{
                      height: "105px",
                      width: "194px",
                      marginBottom: 5,
                    }}
                    src={newItem.image}
                    alt="Logo Studeat"
                  />
                </div>
                <div>
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      name="image"
                      onChange={handleChange}
                      hidden
                    />
                    <Button variant="contained" component="span">
                      Ajouter une image
                    </Button>
                  </label>
                </div>
              </div>
              <div className="col d-flex flex-column ">
                <TextField
                  className="mb-2"
                  label="Nom"
                  variant="outlined"
                  name="name"
                  value={newItem.name}
                  onChange={handleChange}
                />
                <TextField
                  label="Prix estimé"
                  type="number"
                  variant="outlined"
                  name="estimatedPrice"
                  value={newItem.estimatedPrice}
                  onChange={handleChange}
                />
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="inGallery"
                        checked={newItem.inGallery}
                        onChange={handleChange}
                      />
                    }
                    label="Dans la galérie :"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="inCatalog"
                        checked={newItem.inCatalog}
                        onChange={handleChange}
                      />
                    }
                    label="Dans le catalogue :"
                    labelPlacement="start"
                  />
                </div>
              </div>

              <div className="w-100">
                <div
                  className="d-flex flex-row "
                  style={{
                    width: "100%",

                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "40%",
                    }}
                  >
                    <InputLabel id="genreLabel">Genre</InputLabel>
                    <Select
                      style={{
                        width: "100%",
                      }}
                      labelId="genreLabel"
                      id="genre"
                      label="Genre"
                      name="genre"
                      value={newItem.genre}
                      onChange={handleChange}
                    >
                      <MenuItem value={0}>HOMME</MenuItem>
                      <MenuItem value={1}>FEMME</MenuItem>
                      <MenuItem value={2}>ENFANT</MenuItem>
                    </Select>
                  </div>
                  <div
                    style={{
                      width: "40%",
                    }}
                  >
                    <InputLabel id="categoryLabel">Catergories</InputLabel>
                    <Select
                      style={{
                        width: "100%",
                      }}
                      labelId="categoryLabel"
                      id="demo-simple-select1"
                      label="Category"
                      name="category"
                      value={newItem.category}
                      onChange={handleChange}
                    >
                      <MenuItem value={0}>CHEMISES</MenuItem>
                      <MenuItem value={1}>JEANS</MenuItem>
                      <MenuItem value={2}>ENSEMBLES</MenuItem>
                      <MenuItem value={3}>VESTES</MenuItem>
                      <MenuItem value={4}>BAS</MenuItem>
                      <MenuItem value={5}>TOPS</MenuItem>
                      <MenuItem value={6}>ACCESSOIRES</MenuItem>
                    </Select>
                  </div>
                  <div
                    style={{
                      width: "40%",
                    }}
                  >
                    <InputLabel id="collectionLabel">Collections</InputLabel>
                    <Select
                      style={{
                        width: "100%",
                      }}
                      labelId="collectionLabel"
                      id="fashionCollection"
                      label="collection"
                      name="fashionCollection"
                      value={newItem.fashionCollection}
                      onChange={handleChange}
                    >
                      {collections.map((collection) => (
                        <MenuItem value={collection.id}>
                          {collection.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          {!loading ? (
            <Button
              onClick={(e) => {
                handleClose(e);
                saveItem();
              }}
            >
              Enregistrer
            </Button>
          ) : (
            <Button disable>Chargement...</Button>
          )}
          <Button onClick={handleClose} autoFocus>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
