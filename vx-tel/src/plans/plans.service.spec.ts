import {Test, TestingModule} from '@nestjs/testing';
import {PlansService} from './plans.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Plan} from "./entities/plan.entity";
import planTestsUtils from "../common/tests/plan.tests.utils";

describe('PlansService', () => {
    let service: PlansService;
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
            providers: [PlansService,
                {
                    provide: getRepositoryToken(Plan),
                    useValue: mockRepository
                }
            ],
        }).compile();

        service = module.get<PlansService>(PlansService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('FindAllPlans', () => {
        it('should be a list of all plans', async () => {
            const validPlans = planTestsUtils.validPlans();
            mockRepository.find.mockReturnValue(validPlans)
            const plans = await service.findAll();
            expect(plans).toStrictEqual(validPlans);
            expect(plans).toHaveLength(2)
        });
        it('should be find a unique plan', async () => {
            const validPlan = planTestsUtils.validPlan();
            mockRepository.findOne.mockReturnValue(validPlan);
            const plan = await service.findOne(1)
            expect(plan).toBe(validPlan);
        });
    })
    describe('StorePlans', () => {
        it('should store plan', async () => {
            const validPlan = planTestsUtils.validPlan();
            mockRepository.save.mockReturnValue(validPlan)
            const createPlanDto = planTestsUtils.validCreatePlanDTO();
            const plan = await service.create(createPlanDto)
            expect(plan).toBe(validPlan)
        });
    })
    describe('UpdatePlans', () => {
        it('should update plan', async () => {
            const validUpdatedPlan = planTestsUtils.validUpdatedPlan();
            const validPlan = planTestsUtils.validPlan();
            const validUpdatePlanDTO = planTestsUtils.validUpdatePlanDTO();
            mockRepository.findOne.mockReturnValue(validPlan)
            mockRepository.save.mockReturnValue(validUpdatedPlan)
            const plan = await service.update(1, validUpdatePlanDTO);
            expect(plan).toBe(validUpdatedPlan)
        });
        it('should not found plan to update', async () => {
            const validUpdatedPlan = planTestsUtils.validUpdatedPlan();
            const validUpdatePlanDTO = planTestsUtils.validUpdatePlanDTO();
            mockRepository.findOne.mockReturnValue(null)
            mockRepository.save.mockReturnValue(validUpdatedPlan)
            const plan = await service.update(2, validUpdatePlanDTO);
            expect(plan).toBe('plan not found')
        });
    })
    describe('DeletePlans', () => {
        it('Must delete a plan ', async () => {
            const validPlan = planTestsUtils.validPlan();
            mockRepository.findOne.mockReturnValue(validPlan);
            mockRepository.softRemove.mockReturnValue(true)
            const deleted = await service.remove(1)
            expect(deleted).toBe(true);
            expect(mockRepository.softRemove).toBeCalledWith(validPlan)
        });
        it('Must not delete a plan ', async () => {
            mockRepository.findOne.mockReturnValue(null);
            mockRepository.softRemove.mockReturnValue(false)
            const deleted = await service.remove(2)
            expect(deleted).toBe(false);
        });
    })

});
