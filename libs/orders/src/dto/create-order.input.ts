export class CreateOrderInput {
  userId: number;
  products: OrderProductInput[];
}

export class OrderProductInput {
  sku: string;
  quantity: number;
}
