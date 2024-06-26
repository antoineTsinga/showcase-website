import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";

/*
name =[
{label, value}
]
*/

export default function CheckboxesGroup({ title, items, setItems }) {
  // const [state, setState] = React.useState(items);

  const styleh1 = { fontStyle: "normal", fontWeight: "700", fontSize: "20px" };

  const handleChange = (event) => {
    const items2 = items.map((item) => {
      if (item.label !== event.target.name) return item;

      return { label: item.label, value: event.target.checked };
    });

    setItems(items2);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend" style={{ ...styleh1 }}>
          {title}
        </FormLabel>
        <FormGroup>
          {items.map((item) => (
            <FormControlLabel
              key={item.label}
              control={
                <Checkbox
                  key={item.label}
                  checked={item.value}
                  onChange={handleChange}
                  name={item.label}
                />
              }
              label={item.label}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
}
