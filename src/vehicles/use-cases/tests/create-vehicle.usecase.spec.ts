import { CreateVehicleUseCase } from '../create-vehicle.usecase';
import { VehicleDocumentType } from '@prisma/client';

describe('CreateVehicleUseCase', () => {
    let usecase: CreateVehicleUseCase;
    let vehiclesRepo: any;
    let imagesRepo: any;

    beforeEach(() => {
        vehiclesRepo = {
            create: jest.fn().mockResolvedValue({ id: 'veh1' }),
            updateStatus: jest.fn(),
        };

        imagesRepo = {
            findDocumentsByVehicle: jest.fn(),
        };

        usecase = new CreateVehicleUseCase(vehiclesRepo, imagesRepo);
    });

    it('should keep status PENDENTE if docs missing', async () => {
        imagesRepo.findDocumentsByVehicle.mockResolvedValue([]);

        await usecase.execute('user1', { plate: 'AAA-123' } as any);

        expect(vehiclesRepo.updateStatus).not.toHaveBeenCalled();
    });

    it('should update status to Disponível if all documents exist', async () => {
        imagesRepo.findDocumentsByVehicle.mockResolvedValue([
            { documentType: VehicleDocumentType.TITLE },
            { documentType: VehicleDocumentType.INSURANCE },
            { documentType: VehicleDocumentType.IPO },
            { documentType: VehicleDocumentType.IVM },
        ]);

        await usecase.execute('user1', { plate: 'AAA-123' } as any);

        expect(vehiclesRepo.updateStatus).toHaveBeenCalledWith('veh1', 'Disponível');
    });
});
