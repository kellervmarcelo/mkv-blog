import { ProductType } from "@/models/product";
import HttpClient from "./utils/HttpClient";

export type ProductsResponse = {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
};

type ListProductParams = {
  limit: number;
  skip: number;
};

class ProductsService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient("https://dummyjson.com/");
  }

  async listProducts(signal: AbortSignal, params: ListProductParams) {
    const apiResponse = await this.httpClient.get<ProductsResponse>(
      `products`,
      {
        signal,
        query: params,
      },
    );

    return apiResponse;
  }
}

const productsService = new ProductsService();

export default productsService;
