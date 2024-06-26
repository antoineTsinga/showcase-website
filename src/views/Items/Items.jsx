import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { backend } from "../../adapters/apiCalls";
import { useAppContext } from "../../AppContext";
import Appointment from "./Appointment";
import CardItem from "./CardItem";

const Items = () => {
  const [cart, setCart] = useState({});
  const { user } = useAppContext();
  const [sum, setSum] = useState(0);

  const basUrl = "../../assets/images/image-items/";

  useEffect(() => {
    if (!user.id) return;

    let sum = 0;
    cart?.items?.forEach((item) => {
      sum += item.estimatedPrice;
    });

    setSum(sum);
  }, [cart]);

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

  async function deleteItem(item) {
    const items2 = cart.items.filter((item1) => item1.id !== item.id);
    backend
      .put(`carts/${cart.id}`, {
        ...cart,
        items: items2.map((item) => item.id),
      })
      .then((res) => {
        console.log(res);
      });

    setCart({
      ...cart,
      items: items2,
    });
  }

  return (
    <div style={{ backgroundColor: "rgb(240, 240, 240)", minHeight: "100vh" }}>
      <h1
        style={{ textAlign: "center", fontWeight: "bold", paddingTop: "60px" }}
      >
        Vos articles
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "row",
          justifyContent: "space-between",
          padding: "30px",
          paddingBottom: "40px",
          alignItems: "center",
          paddingTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "start",
            padding: "30px",
            paddingBottom: "40px",
            lineHeight: "75px",
            paddingTop: "20px",
            width: "80%",
          }}
        >
          {cart.items ? (
            cart?.items?.map((item, index) => (
              <CardItem key={index} item={item} deleteItem={deleteItem} />
            ))
          ) : (
            <h1>Votre panier est vide</h1>
          )}
        </div>
        <Card
          sx={{
            minWidth: 275,
            border: "1px solid #000",
            width: "100px",
            padding: "20px",
            height: "250px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            marginLeft: "20px",
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="#000" gutterBottom>
              Sous total({cart?.items?.length} articles sélectionnés) : {sum} €
            </Typography>

            <Typography variant="body2">
              <Appointment cart={cart} client_id={user.id} />
            </Typography>
            <Typography variant="body2" style={{ textAlign: "center" }}>
              OU
            </Typography>
            <Typography variant="body2">
              <Button
                variant="contained"
                style={{ width: "100%", backgroundColor: "#000" }}
              >
                <a
                  href="mailto:cloe@onix.fr"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Envoyer un message
                </a>
              </Button>
            </Typography>
            <Typography variant="body2">
              *Certains actions engendrerons la validation de votre panier
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Items;
