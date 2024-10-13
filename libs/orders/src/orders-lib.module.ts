import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CustomersLibModule } from '@ordersApp/customers';
import { InventoryLibModule } from '@ordersApp/inventory';
import { OrdersService } from './application';
import { OrdersRepo } from './repos';

@Module({
  providers: [OrdersService, OrdersRepo],
  imports: [
    EventEmitterModule.forRoot(),
    CustomersLibModule,
    InventoryLibModule,
  ],
  exports: [OrdersService],
})
export class OrdersLibModule {}
