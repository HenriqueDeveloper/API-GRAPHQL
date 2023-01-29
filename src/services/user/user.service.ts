import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UserRole } from 'src/enum/user-role.enum'; 
import { User } from 'src/entities/user.entity'; 
import { CredentialsDto } from 'src/dtos/credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  
  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.createUser(createUserDto, UserRole.ADMIN)
    }
  }

  async createClientUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.createUser(createUserDto, UserRole.CLIENT);
    }
  }
  
  async createManagerUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.createUser(createUserDto, UserRole.GERENTE);
    }
  }

  private async createUser(createUserDto: CreateUserDto, role: UserRole): Promise<User> {
    const { email, name, password, cpf } = createUserDto;
    
      const user = new User();
      user.email = email;
      user.name = name;
      user.role = role;
      user.cpf = cpf;
      user.status = true;
      user.salt = await bcrypt.genSalt(10);
      user.password = await hashPassword(password, user.salt);

      await user.save();
      delete user.password;
      delete user.salt;

      return user;
  }

  public async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;       
    const user = await User.findOneByOrFail({ email });        
    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}

async function hashPassword(password: string, salt: string): Promise<string> {
  return bcrypt.hash(password, salt);
}
