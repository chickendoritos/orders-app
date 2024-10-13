import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InventoryService } from '@ordersApp/inventory';
import { BaseError } from '@ordersApp/seedwork';
import {
  CreateOrderInput,
  UpdateOrderInput,
  UpdateOrderStatusInput,
} from '../dto';
import { OrdersRepo } from '../repos';
import { OrderCreatedEvent } from '../subscribers';

export class CreateOrderError extends BaseError {}
export class UpdateOrderError extends BaseError {}
export class UpdateOrderStatusError extends BaseError {}
export class DeleteOrderError extends BaseError {}

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repo: OrdersRepo,
    private readonly inventoryService: InventoryService,
  ) {}

  // need to handle payment? Assume payment has been successful
  async createOrder(input: CreateOrderInput): Promise<void> {
    // Idempotency:
    // Can generate a key from the order input for a unique column in orders database table
    // Then attempt to create the order in the table, if successful, then continue, else, fetch and return order model

    // Whats the bare minimum we need to do to return as fast as possible?
    // Do we need to check inventory is available or did storefront do that already?
    this.inventoryService.checkQuantity();

    // Do we need to handle payment?

    // Do we need to return an order model to storefront? if not then we can fire an event with all of the business logic
    // If checking inventory, somehow lock inventory(temp lock in redis?) before firing event?

    // note: Send order event to external redis, sqs, internal queue, eventbridge?

    // fire event and subscriber will create order in db
    // Note: I would use a queue instead and then, inside the queue consumer, fire the order created event to send an email, segment event, or whatever.
    this.eventEmitter.emit('order.created', new OrderCreatedEvent(input));
    this.logger.log('Fired created order event');
  }

  async updateOrder(input: UpdateOrderInput): Promise<void> {
    const order = await this.repo.getOrder(input.orderId);

    // update shipping info
    order.shippingCarrier = input.shippingCarrierCode;
    order.shippingTrackingNumber = input.trackingNumber;

    // save to db
    await this.repo.updateOrder(order);

    this.logger.log('Updated order');
  }

  async updateOrderStatus(input: UpdateOrderStatusInput): Promise<void> {
    // use transition timestamps
    // validate if new status is valid. processing -> canceled|delivered
    this.logger.log('Updated order status');
  }

  async deleteOrder(): Promise<void> {
    // soft delete?
    // dont agree with deleting orders, update status to canceled instead
  }
}
