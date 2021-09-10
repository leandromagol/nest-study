import { Test, TestingModule } from '@nestjs/testing';
import { CallsService } from './calls.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Call} from "./entities/call.entity";
import testsUtils from "../common/tests/testsUtils";

describe('CallsService', () => {
  let service: CallsService;
  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallsService,{
        provide:getRepositoryToken(Call),
        useValue: mockRepository
      }],
    }).compile();

    service = module.get<CallsService>(CallsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('FindAllCalls',()=>{
    it('should be a list of all calls', async ()=> {
    const call = testsUtils.validCall();
    mockRepository.find.mockReturnValue([call,call])
      const calls  = await service.findAll();
    expect(calls).toStrictEqual([call,call]);
    expect(calls).toHaveLength(2)
    });
  })
});
