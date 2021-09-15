import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from './auth.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {UsersService} from "../users/users.service";
import {usersTestUtils} from "../common/tests/users.test.utils";
import * as bcrypt from 'bcrypt';
import {JwtModule, JwtService} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import {JwtStrategy} from "./jwt.strategy";
import {jwtConstants} from "./constants";
import {PassportModule} from "@nestjs/passport";

describe('AuthService', () => {
    let service: AuthService;
    const mockUserRepository = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        softRemove: jest.fn(),
    };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports:[PassportModule.register({defaultStrategy:'jwt'})
            ,JwtModule.register({
            secret:'secretKey',
            signOptions: {expiresIn: '3600s'}
          })],
          providers: [AuthService,
            UsersService,
             {
                provide: getRepositoryToken(User),
                useValue: mockUserRepository
            }],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('ValidUserPassword', function () {
        it('Should be return true if password is valid', async () => {
            const user = usersTestUtils.validUser();
            const password = usersTestUtils.validUser().password;
            user.password = await bcrypt.hash(user.password, 10);
            const result = await service.validatePassword(user,password)
          expect(result).toBe(true)
        })
      it('Should be return false if password is valid', async () => {
            const user = usersTestUtils.validUser();
            const password = '123456789';
            user.password = await bcrypt.hash(user.password, 10);
            const result = await service.validatePassword(user,password)
          expect(result).toBe(false)
        })
    });
    describe('ValidateUser',function (){
      it('should return a user if it is valid ', async ()=> {
          const user = usersTestUtils.validUser();
          mockUserRepository.findOne.mockReturnValue(user)
          jest.spyOn(service,'validatePassword')
              .mockImplementation(async () => true)
        const result = await service
            .validateUser(user.email,user.password)
        expect(result).toBe(user)
      });
    })
});
