import React, { useEffect } from "react";
import { Container, Image, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { BsCart2 } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { backend } from "../adapters/apiCalls";
import { useAppContext } from "../AppContext";
import avatarDefault from "../assets/images/AvatarDefault.png";
import logo2 from "../assets/images/logo2.png";
import "../assets/css/button.scss";

export default function NavbarOnix() {
  const { user, onConnect, setOnConnect } = useAppContext();
  const style = {
    white: { style: { backgroundColor: "var(--color-white)" } },
    title: {
      textDecoration: "none",
      color: "white",
      transition: "opacity",
    },
  };

  function logout() {
    backend.get(`/logout`);
    setOnConnect(true);
  }

  useEffect(() => {}, [onConnect]);
  const navigate = useNavigate();

  return (
    <Navbar
      key="md"
      className=""
      style={{
        backgroundColor: "var(--color-primary)",
        color: "#F1F1F1",
      }}
      variant="dark"
      expand="md"
      // bsPrefix="navbar-toggler"
    >
      <Container fluid className="container-lg">
        <Navbar.Brand href="/" className="d-flex">
          <img
            src={logo2}
            width="35"
            height="24"
            className="ms-2 d-inline-block align-center"
            alt="Logo onix"
          />
          <div
            className="mx-4"
            style={{ color: "red", fontWeight: "bold", fontSize: "30px" }}
          >
            Onix
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-md"
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="end"
          {...style.title}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body
            style={{
              backgroundColor: "var(--color-primary)",
              color: "#F1F1F1",
            }}
          >
            <Nav className="align-items-center justify-content-end flex-grow-1 pe-2">
              {["Femme", "Homme", "Enfant"].map((title) => (
                <Link
                  className="m-4 link-custom "
                  {...style.title}
                  key={title}
                  to={{
                    pathname: "/Catalogue",
                    search: `?genre=${title.toLowerCase()}`,
                  }}
                >
                  {title}
                </Link>
              ))}

              <Nav
                {...style.title}
                className="p-0 m-0 link-custom"
                role="button"
                onClick={() => {
                  navigate("/Items");
                }}
              >
                <BsCart2 size={24} />
              </Nav>
              <Nav {...style.title} className="p-4 link-custom">
                {user.id ? (
                  <FiLogOut
                    role="button"
                    onClick={() => {
                      logout();
                    }}
                  />
                ) : (
                  <Link
                    className="link-custom "
                    to={{
                      pathname: "/login",
                    }}
                  >
                    Connexion
                  </Link>
                )}
              </Nav>
              <Nav href="/Account">
                <Image
                  role="button"
                  src={
                    (user.avatar !== "") | (user.avatar !== null)
                      ? user.avatar
                      : avatarDefault
                  }
                  onClick={() => {
                    navigate("/Account");
                  }}
                  fluid
                  roundedCircle
                  bsPrefix
                  style={{ width: 50, height: 50, backgroundColor: "white" }}
                />
              </Nav>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
