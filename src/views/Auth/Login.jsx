import React from "react";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import LoginView from "./LoginView";
import { backend } from "../../adapters/apiCalls";

import { useAppContext } from "../../AppContext";

export default function Login() {
  const { setOnConnect } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    /*
      Envoie login/mdp au backend et check la réponse
      Si 200 => génère un token dans le localStorage (pas bien !!)
      Sinon, renvoie une erreur console
    */

    backend
      .post("/login", data)
      .then((res) => {
        if (res.status === 401) {
          NotificationManager.error(
            "nom d'utilisateur ou mot de passe incorrecte"
          );
        }
        if (res.status !== 200 && res.status !== 401) {
          NotificationManager.error("Application indisponible");
        }
        return res;
      })
      .then((json) => {
        setOnConnect(true);
        NotificationManager.success("connextion réussie");
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          NotificationManager.error(
            "nom d'utilisateur ou mot de passe incorrecte"
          );
        } else {
          NotificationManager.error("Application indisponible");
        }
        console.error(err.response);
      });
  };

  return (
    <div
      className="auth-page"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <LoginView handleLogin={handleLogin} />
    </div>
  );
}
