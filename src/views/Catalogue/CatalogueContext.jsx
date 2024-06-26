import { createContext, useContext, useEffect, useState } from "react";
import { useAppContext } from "../../AppContext";
import { useItems, useFashionCollections } from "../../common/collections";
import { backend } from "./../../adapters/apiCalls";
import { Pagination } from "@mui/material/Pagination";

const CatalogueContext = createContext();

export function useCatalogueContext() {
  return useContext(CatalogueContext);
}

export function CatalogueContextProvider({ children }) {
  const { user } = useAppContext();
  const {
    items,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    loadingItems,
    pageTotal,
    total,
  } = useItems();

  const {
    items: collections,
    fetchItems: fetchCollections,
    createItem: createCollection,
    updateItem: updateCollection,
    deleteItem: deleteCollection,
    loading: loadingCollections,
  } = useFashionCollections();

  const [loading, setLoading] = useState({});

  const [paramsFilter, setParamsFilter] = useState({});
  const [page, setPage] = useState(0);
  const [pageSige, setPageSize] = useState(20);

  useEffect(() => {
    fetchItems(
      { ...paramsFilter },
      { "Page-Size": pageSige || 20, "Page-Number": page || 0 }
    );
  }, [paramsFilter, page, pageSige]);

  //   useEffect(() => {
  //     setLoading({
  //       ...loading,
  //       items: loadingItems,
  //       fashionCollections: loadingCollections,
  //     });
  //   }, [loadingCollections, loadingItems]);

  //   useEffect(() => {
  //     if (items.collection) return;

  //     let collections2 = [];
  //     backend
  //       .get("fashion_collections", {
  //         headers: { "Page-Size": 5, "Page-Number": 0 },
  //       })
  //       .then((res) => {
  //         collections2 = res?.data?.results ? res.data.results : [];
  //       });

  //     setItemFilter({
  //       ...itemsFilter,
  //       collections: collections2.map((collection) => {
  //         return { label: collection.name, value: false };
  //       }),
  //     });
  //   }, []);

  return (
    <CatalogueContext.Provider
      value={{
        user,

        items,
        fetchCatalogueItems: (params, header) =>
          fetchItems({ ...params }, { ...header, "Page-Size": 5 }),
        pageTotal,
        createItem,
        updateItem,
        deleteItem,

        paramsFilter,
        setParamsFilter,
        setPage,
        page,

        total,
        collections,
        fetchLastCollections: (params) =>
          fetchCollections({ ...params }, { "Page-Size": 5, "Page-Number": 0 }),
        createCollection,
        updateCollection,
        deleteCollection,

        detailedLoading: loading,
        loading: Object.values(loading).every((x) => x),
      }}
    >
      {children}
    </CatalogueContext.Provider>
  );
}
