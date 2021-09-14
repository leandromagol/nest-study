import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import planTestsUtils from "../common/tests/plan.tests.utils";
import {usersTestUtils} from "../common/tests/users.test.utils";

describe('UsersService', () => {
  let service: UsersService;
  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    softRemove:jest.fn()
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,{
        provide: getRepositoryToken(User),
        useValue: mockRepository
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('StoreUsers', () => {
    it('should store User', async () => {
      const validUser = usersTestUtils.validUser();
      mockRepository.save.mockReturnValue(validUser)
      const createUserDto = usersTestUtils.validCreateUserDTO();
      const User = await service.create(createUserDto)
      expect(User).toBe(validUser)
    });
  })
  describe('UpdateUsers', () => {
    it('should update user', async () => {
      const validUpdatedUser = usersTestUtils.validUpdatedUser();
      const validUser = usersTestUtils.validUser();
      const validUpdateUserDTO = usersTestUtils.validUpdateUserDTO();
      mockRepository.findOne.mockReturnValue(validUser)
      mockRepository.save.mockReturnValue(validUpdatedUser)
      const user = await service.update(1, validUpdateUserDTO);
      expect(user).toBe(validUpdatedUser)
    });
    it('should not found user to update', async () => {
      const validUpdatedUser = usersTestUtils.validUpdatedUser();
      const validUpdateUserDTO = usersTestUtils.validUpdateUserDTO();
      mockRepository.findOne.mockReturnValue(null)
      mockRepository.save.mockReturnValue(validUpdatedUser)
      const user = await service.update(2, validUpdateUserDTO);
      expect(user).toBe('user not found')
    });
  })
});
