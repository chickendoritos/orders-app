import { Injectable } from '@nestjs/common';
import { Order, OrderStatus } from '../domain';

@Injectable()
export class OrdersRepo {
  getOrder(id: number): Order {
    // actually fetch order from db
    return new Order({
      id,
      userId: 1,
      status: OrderStatus.Processing,
      shippingCarrier: null,
      shippingTrackingNumber: null,
    });
  }
  createOrder(order: Order): void {
    const orderDbValues = {
      id: order.id,
      ...order.toDb(),
    };

    console.log('Creating order in db...', orderDbValues);
  }

  updateOrder(order: Order): Order {
    const orderDbValues = {
      id: order.id,
      ...order.toDb(),
    };

    console.log('Updating order in db...', orderDbValues);

    return order;
  }

  async deleteOrder(): Promise<void> {}
}
