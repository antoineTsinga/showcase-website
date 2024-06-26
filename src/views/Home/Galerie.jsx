import { Box, Button } from "@mui/material";
import galerie1 from "../../assets/images/galerie1.png";
import galerie2 from "../../assets/images/galerie2.png";
import galerie3 from "../../assets/images/galerie3.png";
import galerie4 from "../../assets/images/galerie4.png";
import galerie5 from "../../assets/images/galerie5.png";

export default function Galerie() {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div>
        <h1
          style={{
            background: "#E7E7E7",
            textAlign: "center",
          }}
        >
          Galerie
        </h1>
      </div>
      <div className="row ">
        <div className="col">
          <div className="row-6 mb-4 ">
            <Box component="img" src={galerie1} />
          </div>
          <div className="row-6 ">
            <Box component="img" src={galerie2} />
          </div>
        </div>

        <div className="col align-self-center">
          <div className="row-6 row-md-4">
            <Box component="img" src={galerie3} />
          </div>
        </div>

        <div className="col">
          <div className="row-6 mb-4">
            <Box component="img" src={galerie4} />
          </div>
          <div className="row-6">
            <Box component="img" src={galerie5} />
          </div>
        </div>
      </div>
    </div>
  );
}
