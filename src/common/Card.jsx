import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard({
  title,
  content,
  image,
  alt,
  children,
}) {
  return (
    <Card sx={{ height: "400px", maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia component="img" height="250" image={image} alt={alt} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      {children}
    </Card>
  );
}
