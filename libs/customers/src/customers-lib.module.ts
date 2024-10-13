import { Module } from '@nestjs/common';
import { CustomersService } from './application';

@Module({
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersLibModule {}
