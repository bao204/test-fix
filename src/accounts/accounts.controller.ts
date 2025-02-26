import { Controller, Get, Post, Body, Param, Delete, HttpException, UsePipes, ValidationPipe, Patch } from '@nestjs/common';

import mongoose from 'mongoose';

import { CreateAccountDto } from './dto/CreateAccount.dto';
import { UpdateAccountDto } from './dto/UpdateAccount.dto';
import { AccountService } from './accounts.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  async getAccount() {
    return this.accountService.getAccount();
  }

  @Get(':id')
async getAccountById(@Param('id')id:string)
{
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid)throw new HttpException('Account not found',404);
            const findAccount = await this.accountService.getAccountById(id);
            if(!findAccount)throw new HttpException('Account not found',404);
            return findAccount; 
  }

  @Patch(':id')
    // Pipes là các lớp xử lý dữ liệu đầu vào và đầu ra của HTTP request.
    @UsePipes(new ValidationPipe())
    async updateAccount(@Param('id') id:string,@Body()updateAccountDto:UpdateAccountDto){
        const isValid =mongoose.Types.ObjectId.isValid(id);
        if(!isValid)throw new HttpException('Invalid ID',404);
        const updateAccount=await this.accountService.updateAccount(id,updateAccountDto);
        if(!updateAccount) throw new HttpException('Account not found',404);
        return updateAccount;
     }

  @Delete(':id')
    async deleteAccount(@Param('id') id:string)
    {
        const isValid =mongoose.Types.ObjectId.isValid(id);
        if(!isValid)throw new HttpException('Invalid Id',404);
        const deleteAccount = await this.accountService.deleteAccount(id);
        if(!deleteAccount) throw new HttpException('Account not found',404);
        return deleteAccount;
    }
}
