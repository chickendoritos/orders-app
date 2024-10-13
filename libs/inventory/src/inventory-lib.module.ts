import { Module } from '@nestjs/common';
import { InventoryService } from './application';

@Module({
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryLibModule {}
