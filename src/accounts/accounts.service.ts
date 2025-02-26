import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Account } from 'src/schemas/Account.schema';
import { CreateAccountDto } from './dto/CreateAccount.dto';
import { UpdateAccountDto } from './dto/UpdateAccount.dto';


 // Đảm bảo có DTO này

@Injectable()
export class AccountService {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>)
{}
async getAccountByUserName(userName: string): Promise<Account | null> {
  return this.accountModel.findOne({ userName }).exec();
}
  // Tạo mới 
 async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const createdAccounts = new this.accountModel(createAccountDto);
    return createdAccounts.save();
  }

  // Lấy danh sách tất cả 
  async getAccount()
  {
    return this.accountModel.find();
  }

  // Lấy theo ID
async getAccountById(id:string)
{
return this.accountModel.findById(id);
}

  // Cập nhật 
 async updateAccount(id:string,updateAccountDto:UpdateAccountDto)
 {
    return this.accountModel.findByIdAndUpdate(id,updateAccountDto,{new:true});
 }

  // Xóa 
  async deleteAccount(id:string)
  {
    return this.accountModel.findByIdAndDelete(id);
  }
}
