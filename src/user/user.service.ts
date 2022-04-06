import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { JwtPayload } from './jwt.payload';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private UserRepository: UserRepository,

    // for creating jwt token
    private jwtService: JwtService,
  ) {}

  async signup(authCredentialsDTO: AuthCredentialsDTO) {
    return this.UserRepository.signup(authCredentialsDTO);
  }
  async signin(authCredentialsDTO: AuthCredentialsDTO) {
    const user = await this.UserRepository.signin(authCredentialsDTO);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    // create the JWT token
    const payload: JwtPayload = {
      username: user.username,
      id: user.id,
    };
    // create and return the token
    const token = await this.jwtService.sign(payload);

    // return the token
    return { token };
  }
}
