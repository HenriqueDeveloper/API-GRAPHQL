import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { User } from 'src/entities/user.entity'; 
import { CredentialsDto } from 'src/dtos/credentials.dto';
import * as bcrypt from 'bcrypt';
import { City } from 'src/entities/city.entity';
import { Repository } from 'typeorm';
import { Roles } from 'src/enum/user-role.enum';
import { Address } from 'src/entities/address.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(User)
    private userRepository: Repository<User>
    ){}
  
  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.createUser(createUserDto, Roles.ADMIN)
    }
  }

  async createClientUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.createUser(createUserDto, Roles.CLIENT);
    }
  }
  
  async createManagerUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.createUser(createUserDto, Roles.GERENTE);
    }
  }

  private async createUser(createUserDto: CreateUserDto, role: Roles): Promise<User> {
    const { email, name, password, cpf, idCity, idAddress } = createUserDto;

      const city = await this.cityRepository.findOne({
        where: {id: idCity}
      })

      const address = await this.addressRepository.findOne({
        where: {id: idAddress}
      })

      const user = new User();
      user.email = email;
      user.name = name;
      user.role = role;
      user.cpf = cpf;
      user.status = true;
      user.city = city;
      user.address = address;

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

  async findAll() {
    return this.userRepository.find()
  }
}

async function hashPassword(password: string, salt: string): Promise<string> {
  return bcrypt.hash(password, salt);
}
