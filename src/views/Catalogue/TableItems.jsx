import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { backend } from "../../adapters/apiCalls";
import { useAppContext } from "../../AppContext";
import ActionAreaCard from "../../common/Card";
import { useCart, useItems } from "../../common/collections";
import { useCatalogueContext } from "./CatalogueContext";

export default function TableItems({ params }) {
  const { items, fetchCatalogueItems } = useCatalogueContext();
  const { user } = useAppContext();
  const [cart, setCart] = useState({});

  const basUrl = "../../assets/images/image-items/";

  useEffect(() => {
    if (!user.id) return;
    async function fetchData() {
      let cart1 = {};
      await backend.get(`carts/${user?.cart?.id}`).then(({ status, data }) => {
        if (status !== 200) return;
        cart1 = data;
      });

      setCart(cart1);
    }
    fetchData();
  }, [user]);

  async function addToCart(item) {
    backend
      .put(`carts/${cart.id}`, {
        ...cart,
        items: [...cart.items.map((item) => item.id), item.id],
      })
      .then((res) => {});

    setCart({
      ...cart,
      items: [...cart.items, item],
    });
  }

  async function deleteItem(item) {
    const items2 = cart.items.filter((item1) => item1.id !== item.id);
    backend
      .put(`carts/${cart.id}`, {
        ...cart,
        items: items2.map((item) => item.id),
      })
      .then((res) => {});

    setCart({
      ...cart,
      items: items2,
    });
  }

  function inCart(item2) {
    return cart.items?.filter((item1) => item1.id === item2.id)?.length > 0;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {items.map((item) => (
        <Card key={item.id} sx={{ margin: "10px" }}>
          <CardMedia
            component="img"
            image={process.env.PUBLIC_URL + `/image-items/${item.image}`}
            alt={item.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`A partir de ${item.estimatedPrice}€`}
            </Typography>
          </CardContent>
          <CardActions>
            {!inCart(item) ? (
              <Button
                className="btn-primary"
                variant="contained"
                sx={{
                  marginBottom: 2,
                  bgcolor: "var(--color-secondary) !important",
                }}
                style={{ fontFamily: "$font" }}
                onClick={() => addToCart(item)}
              >
                Ajouter au panier
              </Button>
            ) : (
              <Button
                className="btn-primary"
                variant="contained"
                sx={{
                  marginBottom: 2,
                  bgcolor: "var(--color-danger) !important",
                }}
                style={{ fontFamily: "$font" }}
                onClick={() => deleteItem(item)}
              >
                Retirer du panier
              </Button>
            )}
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
