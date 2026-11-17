import { ProductType } from "./product";

export type CartType = {
  itemQty: number;
  products: ProductType[];
};
