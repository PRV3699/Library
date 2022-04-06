import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from './user.service';

@Module({
  imports: [
    // for jwt
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: 3000,
      },
    }),

    // for passport authentication and authorization
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    // for TypeOrm dependency
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],

  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
