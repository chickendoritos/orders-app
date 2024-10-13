import { OrderStatus } from '../domain';

export class UpdateOrderStatusInput {
  userId: number;
  status: OrderStatus;
}
