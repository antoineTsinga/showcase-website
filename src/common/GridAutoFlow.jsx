import React from "react";
import Box from "@mui/material/Box";

export default function GridAutoFlow(
  { children },
  gridTemplateColumns,
  gridTemplateRows
) {
  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: gridTemplateColumns,
          gridTemplateRows: gridTemplateRows,
          gap: 1,
        }}
      >
        {/*
         *  Exemple :
         *    <Item sx={{ gridColumn: '1', gridRow: '1 / 3' }}>1</Item>
         *    <Item>2</Item>
         *    <Item>3</Item>
         *    <Item>4</Item>
         *    <Item sx={{ gridColumn: '5', gridRow: '1 / 3' }}>5</Item>
         */}

        {children}
      </Box>
    </div>
  );
}
