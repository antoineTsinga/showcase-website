import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function SpacingGrid({ nbrchild, spacing, style }) {
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={spacing}>
      <Grid item xs={12}>
        <Grid
          container
          spacing={spacing}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          {nbrchild.map((value, key) => (
            <Grid
              className="d-flex flex-column justify-content-center"
              key={key}
              item
              style={{
                ...style,
              }}
            >
              {value}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
