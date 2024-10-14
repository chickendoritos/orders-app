import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import {
  OrdersService,
  UpdateOrderInput,
  UpdateOrderStatusInput,
} from '@ordersApp/orders';
import { CreateOrderDto } from '../dto';

// What are storefronts? Are they simply listings on the websites that supply us?
// Is this api facing customers?
// Storefronts are websites that are customer facing and then storefront calls us to create an order?

// Code written below is for other APIs to call, not customer facing. (not a website we host for example)
// If customer facing, then use an auth guard with CurrentUser decorator and use OmitType for the input.

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Get order?
  // Get orders?

  @Post()
  // TODO: api key guard. use nestjs passport?
  async createOrder(@Body() input: CreateOrderDto): Promise<string> {
    const storefrontId = 1; // get storefrontId from apikey
    await this.ordersService.createOrder({
      ...input,
      storefrontId,
    });
    return 'order created';
  }

  @Put()
  // TODO: api key guard. use nestjs passport?
  // customers arent allowed to update order. api request from storefront i guess?
  async updateOrder(@Body() input: UpdateOrderInput): Promise<string> {
    await this.ordersService.updateOrder(input);
    return 'order updated';
  }

  @Put('/status')
  // TODO: api key guard. use nestjs passport?
  // customers arent allowed to update order status. api request from storefront i guess?
  async updateOrderStatus(
    @Body() input: UpdateOrderStatusInput,
  ): Promise<string> {
    await this.ordersService.updateOrderStatus(input);
    return 'order status updated';
  }

  @Delete()
  deleteOrder(): string {
    return 'order deleted';
  }
}
