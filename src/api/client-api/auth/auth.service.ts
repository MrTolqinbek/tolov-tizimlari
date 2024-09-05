import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/models/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async login(user) {
    const token = await this.jwtService.signAsync({
      sub: user.id,
    });
    return { token };
  }
  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email: email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return { id: user.id };
    }
    return null;
  }
  async findById(id: string) {
    return false;
  }
}
