import { Module } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { AuthController } from './Auth.controller';
import { AccountModule } from './accounts.module';
import { JwtModule } from '@nestjs/jwt';

import { EmployeeModule } from 'src/employees/employees.module';

@Module({
  imports: [
    AccountModule,
    EmployeeModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService], // Đưa EmployeeService vào providers
})
export class AuthModule {}
