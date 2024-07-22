import { Module } from '@nestjs/common';
import { TransactionsService } from './transaction.service';
import { TransactionController } from './transaction.controller';


@Module({
  providers: [TransactionsService],
  controllers: [TransactionController]
})
export class TransactionsModule {}
