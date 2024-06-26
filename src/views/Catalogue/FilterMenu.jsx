import { Container, Navbar, Offcanvas, Stack } from "react-bootstrap";
import CheckboxesGroup from "../../common/CheckboxesGroup";
import { Checkbox } from "@mui/material/Checkbox";
import { useFashionCollections } from "../../common/collections";
import { useEffect, useState } from "react";
import { useCatalogueContext } from "./CatalogueContext";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function FilterMenu() {
  const { collections, fetchCatalogueItems, setParamsFilter } =
    useCatalogueContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const genre = searchParams.get("genre");
  const [itemsFilter, setItemFilter] = useState({
    genre: [
      { label: "homme", value: genre === "homme" },
      { label: "femme", value: genre === "femme" },
      { label: "enfant", value: genre === "enfant" },
    ],
    category: [
      { label: "Chemises", value: false },
      { label: "Jeans", value: false },
      { label: "Ensembles", value: false },
      { label: "Vestes", value: false },
      { label: "Bas", value: false },
      { label: "Tops", value: false },
      { label: "Accessoires", value: false },
    ],
    collections: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!genre) return;
    async function addFilter() {
      const params = {
        genderIn: genre.toUpperCase(),
      };

      setItemFilter({
        genre: [
          { label: "homme", value: genre === "homme" },
          { label: "femme", value: genre === "femme" },
          { label: "enfant", value: genre === "enfant" },
        ],
        category: [
          { label: "Chemises", value: false },
          { label: "Jeans", value: false },
          { label: "Ensembles", value: false },
          { label: "Vestes", value: false },
          { label: "Bas", value: false },
          { label: "Tops", value: false },
          { label: "Accessoires", value: false },
        ],
        collections: null,
      });

      setParamsFilter(params);
    }
    addFilter();
  }, [genre]);

  useEffect(() => {
    const genderIn = itemsFilter.genre
      .filter((genre) => genre.value)
      .map((genre) => genre.label.toUpperCase())
      .join(",");

    const categoryIn = itemsFilter.category
      .filter((genre) => genre.value)
      .map((genre) => genre.label.toUpperCase())
      .join(",");

    const params = {
      genderIn,
      categoryIn,
    };

    setParamsFilter(params);
  }, [itemsFilter]);

  return (
    <div
      className="d-flex flex-column justify-content-start align-items-start"
      style={{ width: "100%", paddingLeft: "5%" }}
    >
      <h1>Filtre par :</h1>
      <CheckboxesGroup
        title="Genre"
        items={itemsFilter.genre}
        setItems={(value) => {
          navigate("/Catalogue");
          return setItemFilter({ ...itemsFilter, genre: value });
        }}
      />
      <CheckboxesGroup
        title="Categorie"
        items={itemsFilter.category}
        setItems={(value) => setItemFilter({ ...itemsFilter, category: value })}
      />
      {collections.length >= 5 ? (
        <CheckboxesGroup
          title="Collection"
          items={itemsFilter.collections}
          setItems={(value) =>
            setItemFilter({ ...itemsFilter, collections: value })
          }
        />
      ) : (
        []
      )}
    </div>
  );
}
