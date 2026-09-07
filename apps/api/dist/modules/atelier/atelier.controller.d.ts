import { AtelierService } from './atelier.service';
export declare class AtelierController {
    private readonly atelierService;
    constructor(atelierService: AtelierService);
    getAll(): Promise<import("@prestige/types").AtelierLook[]>;
    getOne(key: string): Promise<import("@prestige/types").AtelierLook>;
}
