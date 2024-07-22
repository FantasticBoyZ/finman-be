import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { TransactionsModule } from './transaction/transaction.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [TransactionsModule, CategoryModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
