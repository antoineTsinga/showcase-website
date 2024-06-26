import { Box } from "@mui/material";
import adminPhoto from "../../assets/images/adminPhoto.png";
import logo from "../../assets/images/logo.png";
export default function InfoAdmin() {
  return (
    <div
      className="row"
      style={{
        margin: "10px",
        padding: "20px",
        backgroundColor: "#FFFEF9",
        boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="col">
        <Box component="img" src={adminPhoto} alt="photo admin" />
        <h3 className="mt-2">Couturière, Styliste</h3>
      </div>

      <div className="col">
        <div>
          <p>
            Bonjour, je m'appelle Chloé j'ai 48 ans, <br />
            <br />
            J'ai toujours eu cette passion du dessin, des arts, de la création
            et du vêtement. Il était donc évident pour moi de réaliser mon rêve!
            <br />
            <br />
            Aujourd'hui je réalise des collections pour les professionnels sur
            tous les types de secteurs
          </p>
        </div>
        <Box component="img" width={152} height={89} src={logo} />
      </div>
    </div>
  );
}
