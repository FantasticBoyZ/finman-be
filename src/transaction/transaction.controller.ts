import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transaction.service';
import { Response } from 'express';
import { Transaction } from './interface/transaction.interface';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Get()
  async getTransactions(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Res() res: Response,
  ) {
    try {
      const response = await this.transactionService.fetchTransactions(
        page,
        pageSize,
      );


      return res.status(HttpStatus.OK).send(JSON.stringify(response));
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error fetching transactions',
        error: error.message,
      });
    }
  }

  @Post('/add')
  async addTransaction(@Body() input: Transaction, @Res() res: Response) {
    try {
      const result = await this.transactionService.addTransaction(input);
      return res.status(HttpStatus.CREATED).send(JSON.stringify(result));
    } catch (error) {
      console.error('Error adding transaction:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error adding transaction',
        error: error.message,
      });
    }
  }
}
