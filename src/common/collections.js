import { useCallback } from "react";

import useCollection from "./useCollection";

export function useItems() {
  const handlers = useCollection(
    "items",
    (m1, m2) => m1.estimatedPrice - m2.estimatedPrice
  );
  return handlers;
}

export function useOrders() {
  const handlers = useCollection("orders", (o1, o2) =>
    o1.appointment.localeCompare(o2.appointment)
  );
  return handlers;
}

export function useFashionCollections() {
  const handlers = useCollection("fashion_collections", (o1, o2) => {
    return o1.creationAt.localeCompare(o2.creationAt);
  });
  return handlers;
}

export function useFaq() {
  const handlers = useCollection("faqs", (o1, o2) =>
    o1.creationAt.localeCompare(o2.creationAt)
  );
  return handlers;
}

export function useClients() {
  const handlers = useCollection("faqclientss", (o1, o2) =>
    o1.creation_date.localeCompare(o2.creation_date)
  );
  return handlers;
}

export function useCart() {
  const handlers = useCollection("carts", (o1, o2) => 1);

  return handlers;
}
