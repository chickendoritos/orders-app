export class CreateOrderInput {
  storefrontId: number;
  userId: number;
  products: OrderProductInput[];
}

export class OrderProductInput {
  sku: string;
  quantity: number;
}
