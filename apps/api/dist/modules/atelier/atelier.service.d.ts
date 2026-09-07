import { PrismaService } from '../../database/prisma.service';
import { AtelierLook } from '@prestige/types';
export declare class AtelierService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<AtelierLook[]>;
    findByKey(key: string): Promise<AtelierLook | null>;
}
