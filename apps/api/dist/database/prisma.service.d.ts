import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
export declare class PrismaService implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    isConnected: boolean;
    private client;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    get product(): any;
    get category(): any;
    get order(): any;
    get customer(): any;
    get atelierLook(): any;
    get user(): any;
}
