import { Box, Button, FormLabel, TextField } from "@mui/material";
import logo from "../../assets/images/logo.png";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../AppContext";
import { backend } from "../../adapters/apiCalls";

const Informations = () => {
  const { user } = useAppContext();
  const style = { width: "50%" };
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    tel: "",
    avatar: "",
    email: "",
    password: "",
    description: "",
  });

  useEffect(() => {
    if (!user) return;
    setUserData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      tel: user.tel,
      avatar: user.avatar,
      description: user.description,
    });
    console.log(userData);
  }, [user]);

  function handleChange(e) {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  function setInfoAdmin() {
    backend.put(`admins/${user.id}`, { ...userData }).then((res) => {});
  }

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "1485px",
        textAlign: "center",
        fontFamily: "$font",
      }}
    >
      <Box>
        <Box
          component="img"
          sx={{
            height: "105px",
            width: "194px",
            marginBottom: 5,
          }}
          alt="Logo Onix"
          src={logo}
        />
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FormLabel htmlFor="outlined-basic" style={{ fontWeight: "bold" }}>
            Nom :{" "}
          </FormLabel>
          <TextField
            label=""
            variant="outlined"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            style={style}
          />
        </Box>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FormLabel htmlFor="outlined-basic" style={{ fontWeight: "bold" }}>
            Prenom :{" "}
          </FormLabel>
          <TextField
            label=""
            variant="outlined"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            style={style}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FormLabel htmlFor="outlined-basic" style={{ fontWeight: "bold" }}>
            Téléphone :{" "}
          </FormLabel>
          <TextField
            label=""
            variant="outlined"
            name="tel"
            value={userData.tel}
            onChange={handleChange}
            style={style}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FormLabel htmlFor="outlined-basic" style={{ fontWeight: "bold" }}>
            Email :{" "}
          </FormLabel>
          <TextField
            label=""
            variant="outlined"
            name="email"
            value={userData.email}
            onChange={handleChange}
            style={style}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FormLabel htmlFor="outlined-basic" style={{ fontWeight: "bold" }}>
            Mot de passe :{" "}
          </FormLabel>
          <TextField
            label=""
            variant="outlined"
            type="password"
            value={userData.password}
            onChange={handleChange}
            name="password"
            autoComplete="new-password"
            style={style}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FormLabel htmlFor="outlined-basic" style={{ fontWeight: "bold" }}>
            Description :{" "}
          </FormLabel>
          <TextField
            id="outlined-multiline-static"
            label=""
            multiline
            rows={7}
            value={userData.description}
            onChange={handleChange}
            name="description"
            style={style}
          />
        </Box>
        <Button
          variant="outlined"
          style={{ marginLeft: "480px", marginTop: "10px" }}
          onClick={() => setInfoAdmin()}
        >
          Mettre à jour
        </Button>
      </Box>
    </div>
  );
};

export default Informations;
