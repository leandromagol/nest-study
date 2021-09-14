import {Test, TestingModule} from '@nestjs/testing';
import {CallsService} from './calls.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Call} from "./entities/call.entity";
import callTestsUtils from "../common/tests/call.tests.utils";
import {Plan} from "../plans/entities/plan.entity";
import planTestsUtils from "../common/tests/plan.tests.utils";

describe('CallsService', () => {
    let service: CallsService;
    const mockRepository = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        softRemove: jest.fn(),
    };
    const mockRepositoryPlan = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CallsService, {
                provide: getRepositoryToken(Call),
                useValue: mockRepository
            }, {
                provide:getRepositoryToken(Plan),
                useValue:mockRepositoryPlan
            }],
        }).compile();

        service = module.get<CallsService>(CallsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('FindAllCalls', () => {
        it('should be a list of all calls', async () => {
            const validCalls = callTestsUtils.validCalls();
            mockRepository.find.mockReturnValue(validCalls)
            const calls = await service.findAll();
            expect(calls).toStrictEqual(validCalls);
            expect(calls).toHaveLength(2)
        });
        it('should be find a unique call', async () => {
            const validCall = callTestsUtils.validCall();
            mockRepository.findOne.mockReturnValue(validCall);
            const call = await service.findOne(1)
            expect(call).toBe(validCall);
        });
    })
    describe('StoreCalls', () => {
        it('should store call', async () => {
            const validCall = callTestsUtils.validCall();
            mockRepository.save.mockReturnValue(validCall)
            const createCallDto = callTestsUtils.validCreateCallDTO();
            const call = await service.create(createCallDto)
            expect(call).toBe(validCall)
        });
    })
    describe('UpdateCalls', () => {
        it('should update call', async () => {
            const validUpdatedCall = callTestsUtils.validUpdatedCall();
            const validCall = callTestsUtils.validCall();
            const validUpdateCallDTO = callTestsUtils.validUpdateCallDTO();
            mockRepository.findOne.mockReturnValue(validCall)
            mockRepository.save.mockReturnValue(validUpdatedCall)
            const call = await service.update(1, validUpdateCallDTO);
            expect(call).toBe(validUpdatedCall)
        });
        it('should not found call to update', async () => {
            const validUpdatedCall = callTestsUtils.validUpdatedCall();
            const validUpdateCallDTO = callTestsUtils.validUpdateCallDTO();
            mockRepository.findOne.mockReturnValue(null)
            mockRepository.save.mockReturnValue(validUpdatedCall)
            const call = await service.update(2, validUpdateCallDTO);
            expect(call).toBe('call not found')
        });
    })
    describe('DeleteCalls', () => {
        it('Must delete a call ', async () => {
            const validCall = callTestsUtils.validCall();
            mockRepository.findOne.mockReturnValue(validCall);
            mockRepository.softRemove.mockReturnValue(true)
            const deleted = await service.remove(1)
            expect(deleted).toBe(true);
            expect(mockRepository.softRemove).toBeCalledWith(validCall)
        });
        it('Must not delete a call ', async () => {
            mockRepository.findOne.mockReturnValue(null);
            mockRepository.softRemove.mockReturnValue(false)
            const deleted = await service.remove(2)
            expect(deleted).toBe(false);
        });
    })
    
    describe('CalcCallValue',()=>{
        it('should calc call value without plan', function () {
            const call = callTestsUtils.validCalls()
            const result = service.calcValueWithoutPlan(call[0],20);
            const result2 = service.calcValueWithoutPlan(call[1],80);
            expect(result).toBe(3800)
            expect(result2).toBe(13600)
        });
        it('should calc call value wit plan', function () {
            const call = callTestsUtils.validCalls()
            const plan = planTestsUtils.validPlans()
            const result = service.calcValueWithPlan(call[0],plan[0],20);
            const result2 = service.calcValueWithPlan(call[1],plan[1],80);
            expect(result).toBe(0)
            expect(result2).toBe(3740)
        });
    })
    
    describe('ReturnPlanSimultation',()=>{
        it('should return a plan simulation', async  ()=> {
            const call = callTestsUtils.validCall();
            const plan = planTestsUtils.validPlan();
            const call_time = 20;
            mockRepositoryPlan.findOne.mockReturnValue(plan);
            mockRepository.findOne.mockReturnValue(call);
            const simulation = {
                origin: 11,
                destiny: 16,
                time: call_time,
                plan_name: 'FaleMais 30',
                value_with_plan: 0,
                value_without_plan: 3800
            };
            const result = await service.simulation(11,16,call_time,plan.id);
            expect(result).toStrictEqual(simulation)
        });
        it('should not found plan in simulation',  async ()=> {
            mockRepositoryPlan.findOne.mockReturnValue(null);
            const result = await service.simulation(11,16,20,1);
            expect(result).toBe('plan not found')
        });
        it('should not found call in simulation',  async ()=> {
            const plan = planTestsUtils.validPlan()
            mockRepositoryPlan.findOne.mockReturnValue(plan)
            mockRepository.findOne.mockReturnValue(null);
            const result = await service.simulation(11,16,20,1);
            expect(result).toBe('call not found')
        });
    })
});
