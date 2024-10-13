import { Module } from '@nestjs/common';
import { OrdersLibModule } from '@ordersApp/orders';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [OrdersModule, OrdersLibModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
