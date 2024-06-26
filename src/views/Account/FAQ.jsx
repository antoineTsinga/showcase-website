import React from "react";
import { Accordion } from "react-bootstrap";

const FAQ = () => {
  return (
    <div>
      <h1>FAQ - Onix</h1>
      <p>
        Bienvenue sur notre site de couture Onix ! Pour vous aider à naviguer et
        utiliser notre site efficacement, nous avons rassemblé les questions
        fréquemment posées par nos utilisateurs. Si vous avez d'autres
        questions, n'hésitez pas à nous contacter.
      </p>
      <Accordion defaultActiveKey="0" key={0}>
        <Accordion.Item eventKey="data">
          <Accordion.Header>
            Qu'est-ce que ce site de couture en ligne propose ?
          </Accordion.Header>
          <Accordion.Body>
            Nous proposons une large gamme de tenues de couture
            personnalisables, des patrons de couture, des tissus de qualité et
            des accessoires. Vous pouvez consulter notre catalogue,
            personnaliser vos articles et passer commande directement en ligne.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="0" key={0}>
        <Accordion.Item eventKey="data">
          <Accordion.Header>
            Comment puis-je consulter les tenues disponibles ?
          </Accordion.Header>
          <Accordion.Body>
            Vous pouvez consulter nos tenues en naviguant dans la section
            "Catalogue" du site. Vous y trouverez différentes catégories, telles
            que robes, jupes, pantalons, et bien plus encore.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="0" key={0}>
        <Accordion.Item eventKey="data">
          <Accordion.Header>
            Puis-je voir les tenues portées par des mannequins ?
          </Accordion.Header>
          <Accordion.Body>
            Oui, chaque tenue est présentée avec des photos de mannequins pour
            vous donner une idée de son apparence réelle. Des vidéos de
            démonstration peuvent également être disponibles.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="0" key={0}>
        <Accordion.Item eventKey="data">
          <Accordion.Header>
            Comment puis-je passer une commande ?
          </Accordion.Header>
          <Accordion.Body>
            Une fois que vous avez choisi et personnalisé votre tenue, cliquez
            sur "Ajouter au Panier". Vous pouvez ensuite accéder à votre panier
            et suivre les instructions pour finaliser votre commande.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="0" key={0}>
        <Accordion.Item eventKey="data">
          <Accordion.Header>
            Comment puis-je contacter le service client ?
          </Accordion.Header>
          <Accordion.Body>
            Vous pouvez nous contacter via par email ou par téléphone. Nos
            coordonnées se trouvent dans la section "Contactez-nous".
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FAQ;
