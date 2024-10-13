import { CreateOrderInput } from '../dto';

export class OrderCreatedEvent {
  input: CreateOrderInput;

  constructor(input: CreateOrderInput) {
    this.input = input;
  }
}
