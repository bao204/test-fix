import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { EmployeeService } from '../employees/employees.service'; // Giả sử bạn có một service để lấy thông tin người dùng
import { JwtService } from '@nestjs/jwt';
import { Employee } from 'src/schemas/Employee.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<{ token: string; employee: Employee }> {
    const user = await this.employeeService.getEmployeeByUsernameOrEmail(loginDto.userName);
    if (!user || !user.account || user.account.password !== loginDto.password) {
        throw new UnauthorizedException('Thông tin đăng nhập không hợp lệ');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token, employee: user }; // Trả về cả token và thông tin nhân viên
}

}
