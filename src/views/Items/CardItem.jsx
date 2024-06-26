import React from "react";

import monImage from "../../assets/images/logo.png";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const CardItem = ({ item, deleteItem }) => {
  return (
    <div>
      <Card sx={{ maxWidth: 345, margin: "5px" }}>
        <CardMedia
          component="img"
          height="140"
          image={process.env.PUBLIC_URL + `/image-items/${item.image}`}
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
        <CardActions>
          <Button
            onClick={() => {
              deleteItem(item);
            }}
            size="small"
            style={{ color: "rgb(183, 0, 0)", marginLeft: "40px" }}
          >
            Supprimer du panier
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default CardItem;
