import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

  // Note could use an sdk from inventory api

  async getProducts(skus: string[]): Promise<void> {
    // use fetch() to talk to inventory api
  }

  async updateQuantity(): Promise<void> {
    // push to queue/event for inventory service to consume
  }

  async checkQuantity(): Promise<void> {}
}
