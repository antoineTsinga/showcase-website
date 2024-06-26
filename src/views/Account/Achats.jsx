import React, { useEffect, useState } from "react";
import { backend } from "../../adapters/apiCalls";
import { useAppContext } from "../../AppContext";
import { Accordion, Card } from "react-bootstrap";
import { CardContent, CardMedia, Typography } from "@mui/material";

const Achats = () => {
  const [orders, setOrder] = useState([]);
  const { user } = useAppContext();
  useEffect(() => {
    if (!user?.id) return;
    backend.get("/orders/all/" + user.id).then((result) => {
      console.log(result.data);
      setOrder(result.data);
    });
  }, []);
  return (
    <div style={{ width: "75%" }}>
      <h1>Mes Achats</h1>
      {orders.map((order) => (
        <Accordion defaultActiveKey="0" key={order.id}>
          <Accordion.Item eventKey="data">
            <Accordion.Header>
              {new Date(order.createdAt).toLocaleString()}
            </Accordion.Header>
            <Accordion.Body>
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
                {order.items.map((item) => (
                  <div style={{ marginRight: "1%" }}>
                    <Card sx={{ maxWidth: 345, margin: "5px" }}>
                      <CardMedia
                        component="img"
                        height="140px"
                        image={
                          process.env.PUBLIC_URL + `/image-items/${item.image}`
                        }
                        alt={item.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Prix estimé* : {item.estimatedPrice} €
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
  );
};

export default Achats;
