import { Module } from '@nestjs/common';
import { OrdersLibModule } from '@ordersApp/orders';
import { OrdersController } from './controllers';

@Module({
  imports: [OrdersLibModule],
  controllers: [OrdersController],
})
export class OrdersModule {}
