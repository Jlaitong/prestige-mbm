import { PrismaService } from '../../database/prisma.service';
export declare class HealthController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    checkHealth(): {
        status: string;
        brand: string;
        environment: string;
        timestamp: string;
        database: string;
        version: string;
    };
}
