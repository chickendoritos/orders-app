import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CustomersService {
  private readonly logger = new Logger(CustomersService.name);

  // Note could use an sdk from customers api

  async getCustomer(userId: number): Promise<void> {
    // use fetch() to talk to customers api
  }
}
