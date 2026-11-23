import { ProductType } from "@/models/product";

import products from "./products.json";

// Dados de exemplo só para exibir o layout. Troque pela sua lógica de dados.
export const mockProducts = products as ProductType[];

export const mockCategories = [
  { slug: "mens-shoes", label: "Calçados masculinos", count: 5 },
  { slug: "womens-shoes", label: "Calçados femininos", count: 5 },
  { slug: "mens-shirts", label: "Camisas masculinas", count: 5 },
  { slug: "tops", label: "Vestidos e tops", count: 5 },
  { slug: "womens-bags", label: "Bolsas femininas", count: 5 },
  { slug: "sunglasses", label: "Óculos de sol", count: 5 },
  { slug: "mens-watches", label: "Relógios masculinos", count: 6 },
  { slug: "smartphones", label: "Smartphones", count: 16 },
  { slug: "laptops", label: "Notebooks", count: 5 },
  { slug: "fragrances", label: "Perfumes", count: 5 },
];
