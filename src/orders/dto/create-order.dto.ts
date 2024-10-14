import { OmitType } from '@nestjs/swagger';
import { CreateOrderInput } from '@ordersApp/orders';

export class CreateOrderDto extends OmitType(CreateOrderInput, [
  'storefrontId',
] as const) {}
