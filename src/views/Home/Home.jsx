import React, { useEffect, useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import BannerFemme from "../../assets/images/BannerFemme.png";
import BannerHomme from "../../assets/images/bannerHomme.png";
import SpacingGrid from "./SpacingGrig";
import RecipeReviewCard from "../../common/RecipeReviewCard";
import modelCardFemme from "../../assets/images/modelCardfemme.png";
import modelCardHomme from "../../assets/images/modelCardhomme.png";
import modelCardEnfant from "../../assets/images/modelCardenfant.png";
import ActionAreaCard from "./../../common/Card";
import creationImg from "./../../assets/images/creations.png";
import hautDeGamme from "./../../assets/images/hautDeGamme.png";
import accessoires from "./../../assets/images/accessoires.png";
import Galerie from "./Galerie";
import { Link, useNavigate } from "react-router-dom";
import InfoAdmin from "./InfoAdmin";
import Avis from "./Avis";

export default function Home() {
  const primary = "var(--color-tertiary)";
  const style = {
    btn: {
      border: "2px solid var(--color-white)",
      color: "var(--color-white)",
      fontWeight: "bold",
      fontSize: "1em",
      bottom: "30%",
      backgroundColor: "rgb(0,0,0,0.2)",

      "&:hover": {
        backgroundColor: primary,
        border: "3px solid " + primary,
      },
    },
  };

  const navigate = useNavigate();
  return (
    <div>
      <div
        className=" flex-column"
        style={{
          backgroundColor: "var(--color-grey)",
        }}
      >
        <div className="row p-0 m-0" style={{ width: "100%" }}>
          <div className="col p-0" style={{ width: "50%" }}>
            <div
              className="position-relative "
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={BannerFemme}
                className="position-relative "
              />
              <Button
                className="position-absolute"
                variant="outlined"
                sx={{ ...style.btn }}
                onClick={() => {
                  navigate("/Catalogue?genre=femme");
                }}
              >
                Toute la Collection
              </Button>
            </div>
          </div>
          <div className="col p-0" style={{ width: "50%" }}>
            <div
              className="position-relative"
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                className="position-relative "
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                component="img"
                src={BannerHomme}
              ></Box>
              <Button
                className="position-absolute"
                variant="outlined"
                sx={{ ...style.btn }}
                onClick={() => {
                  navigate("/Catalogue?genre=homme");
                }}
              >
                Toute la Collection
              </Button>
            </div>
          </div>
        </div>

        <h1
          style={{
            margin: "40px",
            textAlign: "center",
            color: "var(--color-white)",
          }}
        >
          Dernières réalisations
        </h1>

        <div className="pt-5" style={{ paddingLeft: "80px" }}>
          <SpacingGrid
            position="relative"
            style={{
              width: "300",
              height: "700px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "15px",
            }}
            spacing={10}
            nbrchild={[
              <RecipeReviewCard
                title={"Chemise pagne"}
                subheader={"collection pringtemps 2022"}
                alt="chemise femme pagne"
                image={modelCardFemme}
              />,
              <RecipeReviewCard
                title={"Gillet Bermimgam"}
                subheader={"collection pringtemps 2022"}
                alt="Gillet Bermimgam"
                image={modelCardHomme}
              />,
              <RecipeReviewCard
                title={"Veste Dammy"}
                subheader={"collection pringtemps 2022"}
                alt="chemise femme pagne"
                image={modelCardEnfant}
              />,
            ]}
          />
        </div>
      </div>
      <div className="mt-5 d-flex flex-column align-items-center">
        <h1 className="mb-5">Laissez nous vous aider !</h1>
        <div>
          <SpacingGrid
            spacing={10}
            nbrchild={[
              <ActionAreaCard
                title={"Vos Créations"}
                content={
                  "Vous avez une idée de modèle en tête, un croquis, un schema... On vous aide à realiser votre projet"
                }
                alt="Vos Créations"
                image={creationImg}
              />,
              <ActionAreaCard
                title={"Couture Haute Gamme"}
                content={
                  "Vous souhaitez avoir une tenue sur mesure et bénéficier de notre expertise et de nos conseils."
                }
                alt="Couture Haute Gamme"
                image={hautDeGamme}
              />,
              <ActionAreaCard
                title={"Accessoires"}
                content={
                  "Mariez vos tenues avec des accessoires assortis ou faites vous tout simplement plaisir"
                }
                alt="Accessoires"
                image={accessoires}
              />,
            ]}
          />
        </div>

        <div className="mt-5 mb-5">
          <a className="button-cta " href="mailto:cloe@onix.fr">
            Passer un commande
          </a>
        </div>

        <div className="mt-5 mb-5">
          <Galerie />
        </div>

        <div style={{ marginBottom: "100px" }}>
          <div
            role="button"
            className="button-cta"
            onClick={() => {
              navigate("/Catalogue");
            }}
          >
            Toute la Collection
          </div>
        </div>

        <div style={{ backgroundColor: "#E7E7E7", width: "100%" }}>
          <div className="row p-0 m-0">
            <div className="col">
              <InfoAdmin />
            </div>
            <div
              className="col mt-5 d-flex flex-row justify-content-center align-items-center"
              style={{
                width: "400px",
                textAlign: "center",
              }}
            >
              <Typography style={{ fontFamily: "$font", fontSize: "23px" }}>
                Contacter le couturier via la{" "}
                <Link to="/registration">messagerie interne</Link> du site{" "}
                <br />
                ou prenez un <Link to="/registration">rendez-vous</Link>
              </Typography>
            </div>
            <div className="w-100"></div>
            <div className="col m-5 d-flex flex-row justify-content-center align-items-center">
              <h1>Les avis clients</h1>
            </div>
            <div className="col">
              <div className="mb-5 ">
                <Avis />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
