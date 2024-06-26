import { useCallback, useReducer, useState } from "react";

import { NotificationManager } from "react-notifications";

import useIsMounted from "./useIsMounted";
import { backend } from "./../adapters/apiCalls";

export default function useCollection(collection, compareFn) {
  const ucollection = collection.toUpperCase();

  function reducer(state, action) {
    console.debug(`${ucollection} REDUCER`, action.type, action);
    switch (action.type) {
      case "FETCHING_ITEMS":
        return { ...state, loading: true };
      case "SET_ITEMS":
        return {
          ...state,
          unsortedItems: [...action.payload],
          items: [...action.payload].sort(compareFn),
          loading: false,
        };
      case "ADD_ITEM":
        return {
          ...state,
          unsortedItems: [...state.items, action.payload],
          items: [...state.items, action.payload].sort(compareFn),
        };
      case "UPDATE_ITEM":
        return {
          ...state,
          items: state.items.map((p) =>
            p?.id === action.target ? action.payload : p
          ),
        };
      case "DELETE_ITEM":
        return {
          ...state,
          items: state.items.filter((p) => p.id !== action.payload.id),
        };
      default:
        throw new Error(action.type);
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    unsortedItems: [],
    items: [],
    loading: false,
  });

  const [total, setTotal] = useState(0);
  const [pageTotal, setPageTotal] = useState(0);

  const { isMounted } = useIsMounted();

  return {
    unsortedItems: state.unsortedItems,
    items: state.items,
    total,
    loading: state.loading,
    pageTotal,

    fetchItem: useCallback(async (id) => {
      try {
        const { data: item } = await backend.get(`${collection}/${id}`);

        if (isMounted.current) {
          dispatch({ type: "UPDATE_ITEM", payload: item, target: id });
        }
        return item;
      } catch (error) {
        NotificationManager.error("Backend issue");
        console.error(error);
      }
      return undefined;
    }, []),

    fetchItems: useCallback(
      async (params, header) => {
        try {
          if (state.loading) {
            return undefined;
          }

          dispatch({ type: "FETCHING_ITEMS" });
          const {
            data: { results, count, pageTotal },
          } = await backend.get(collection, {
            params: { ...(params || {}) },
            headers: { ...(header || {}) },
          });

          if (isMounted.current) {
            // console.log("total", count);
            setTotal(count);
            setPageTotal(pageTotal);
            dispatch({ type: "SET_ITEMS", payload: results });
          } else {
            console.debug("The component is not mounted anymore");
          }
          return results;
        } catch (error) {
          NotificationManager.error("Backend issue");
          console.error(error);
        }
        return undefined;
      },
      [state.items]
    ),

    createItem: useCallback(async (clientId, data) => {
      try {
        const { data: item } = await backend.post(collection, {
          ...data,
          client: clientId,
        });

        dispatch({ type: "ADD_ITEM", payload: item });
        return item;
      } catch (error) {
        NotificationManager.error("Backend issue");
        console.error(error);
      }
      return undefined;
    }, []),

    updateItem: useCallback(async (itemId, data) => {
      try {
        const { data: nItem } = await backend.put(
          `${collection}/${itemId}`,
          data
        );
        dispatch({ type: "UPDATE_ITEM", payload: nItem, target: itemId });
        return nItem;
      } catch (error) {
        NotificationManager.error("Backend issue");
        console.error(error);
      }
      return undefined;
    }, []),

    deleteItem: useCallback(async (item) => {
      try {
        await backend.delete(`${collection}/${item.id}`);
        dispatch({ type: "DELETE_ITEM", payload: item });
      } catch (error) {
        NotificationManager.error("Backend issue");
        console.error(error);
      }
      return undefined;
    }, []),
  };
}
