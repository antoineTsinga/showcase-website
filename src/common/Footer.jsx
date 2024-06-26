import React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import GridAutoFlow from "./GridAutoFlow";
import logo from "../assets/images/logo.png";
import map from "../assets/images/map.png";
import { Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { MDBCol, MDBContainer, MDBFooter, MDBRow } from "mdbreact";

export default function Footer() {
  const style = {
    footer: {
      style: {
        backgroundColor: "var(--color-primary)",
        color: "var(--color-white)",
      },
    },
    footerSection: {
      style: {
        fontFamily: "$font",
        fontSize: "12px",
        marginTop: "50px",
      },
    },
  };

  const styleLink = {
    style: {
      textDecoration: "none",
      color: "var(--color-white)",
    },
  };
  return (
    <>
      <div className="footer" {...style.footer}>
        <div className="container">
          <div className="row">
            <MDBFooter color="blue" className="font-small pt-4 mt-4">
              <MDBContainer fluid className=" text-md-left">
                <MDBRow>
                  <MDBCol md="3 text-center" className="flex-column">
                    <Box
                      component="img"
                      sx={{
                        height: "105px",
                        width: "194px",
                        marginBottom: 5,
                      }}
                      alt="Logo Studeat"
                      src={logo}
                    />
                    <p>28 Rue Notre Dame des Champs</p>
                    <p>07 58 62 35 45</p>
                  </MDBCol>
                  <MDBCol md="3" className="flex-column">
                    <p>SERVICES</p>
                    <p>
                      <Link {...styleLink} to="">
                        livraison
                      </Link>
                    </p>
                    <p>
                      <Link {...styleLink} to="">
                        Blog
                      </Link>
                    </p>
                    <p>
                      <Link {...styleLink} to="">
                        Incription à la Newsletter
                      </Link>
                    </p>
                  </MDBCol>
                  <MDBCol md="3">
                    <p>BESOINS D'AIDE ?</p>
                    <p>
                      <Link {...styleLink} to="">
                        FAQ
                      </Link>
                    </p>
                    <p>
                      <Link {...styleLink} to="">
                        Plan du site
                      </Link>
                    </p>
                    <p>
                      <Link {...styleLink} to="">
                        Conctacter l'atelier
                      </Link>
                    </p>
                    <p>
                      <Link {...styleLink} to="">
                        Désinscription à la Newsletter
                      </Link>
                    </p>
                  </MDBCol>

                  <MDBCol md="3">
                    <p>INFORMATION SUR LA SOCIETE</p>
                    <p>
                      <Link {...styleLink} to="">
                        A propos de nous
                      </Link>
                    </p>
                    <p>
                      <Link {...styleLink} to="">
                        Politique de confidentialité
                      </Link>
                    </p>
                    <p>
                      <Link {...styleLink} to="">
                        Carrière
                      </Link>
                    </p>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
              <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                  <div>
                    <p>
                      © Tous droits réserves | Mentions Légales - Politique de
                      confidentialité
                    </p>
                  </div>
                </MDBContainer>
              </div>
            </MDBFooter>
          </div>
        </div>
      </div>
    </>
  );
}
