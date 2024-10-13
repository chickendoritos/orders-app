import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CustomersService } from '@ordersApp/customers';
import { InventoryService } from '@ordersApp/inventory';
import { Order, OrderStatus } from '../domain';
import { OrdersRepo } from '../repos';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class OrdersSubscriber {
  private readonly logger = new Logger(OrdersSubscriber.name);

  constructor(
    private readonly repo: OrdersRepo,
    private readonly customersService: CustomersService,
    private readonly inventoryService: InventoryService,
  ) {}

  @OnEvent('order.created')
  async orderCreatedEvent(event: OrderCreatedEvent) {
    const { input } = event;

    // fetch product info to save to db/log
    this.inventoryService.getProducts(input.products.map((x) => x.sku));

    // fetch customer for info like name
    this.customersService.getCustomer(input.userId);

    // create order in db
    const order = new Order({
      id: null,
      userId: input.userId,
      status: OrderStatus.Processing,
      shippingCarrier: null,
      shippingTrackingNumber: null,
    });
    await this.repo.createOrder(order);

    // TODO: save product info

    // decrease quantity in InventoryService
    await this.inventoryService.updateQuantity();
  }
}
