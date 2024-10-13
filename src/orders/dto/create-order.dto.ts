import { OmitType } from '@nestjs/swagger';
import { CreateOrderInput } from '@ordersApp/orders';

// don't need anymore, this is for a customer facing API and want to get the user Id from access token
export class CreateOrderDto extends OmitType(CreateOrderInput, [
  'userId',
] as const) {}
