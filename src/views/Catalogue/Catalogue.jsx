import { useEffect } from "react";
import { useItems } from "./../../common/collections";
import CatalogueBanner from "../../assets/images/CatalogueBanner.png";
import FilterMenu from "./FilterMenu";
import TableItems from "./TableItems";
import { CatalogueContextProvider } from "./CatalogueContext";
import PaginationControlled from "./Pagination";

export default function Catalogue() {
  return (
    <CatalogueContextProvider>
      <div className="" style={{ minHeight: "100vh", marginBottom: "10vmin" }}>
        <div
          className="mb-5 d-flex flex-row justify-content-center align-items-center"
          style={{ background: `url(${CatalogueBanner})`, height: "175px" }}
        >
          <h1
            style={{
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "50px",
              lineHeight: "57px",
              textAlign: "center",
              letterSpacing: " 0.02em",
              color: "#F1F1F1",
              textShadow: "2px 2px 0 var(--color-primary)",
            }}
          >
            Découvrez toutes nos créations disponible pour la vente
          </h1>
        </div>
        <div className="mb-5 d-flex flex-row justify-content-center align-items-center">
          <h2>
            Faites votre choix et discuter avec le couturier pour des
            ajustements
          </h2>
        </div>
        <div className="d-flex flex-row">
          <div
            style={{
              width: "30%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
            }}
          >
            <FilterMenu />
          </div>

          <div style={{ width: "70%" }}>
            <TableItems />
            <PaginationControlled />
          </div>
        </div>
      </div>
    </CatalogueContextProvider>
  );
}
