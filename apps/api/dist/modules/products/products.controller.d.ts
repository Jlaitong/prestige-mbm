import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getAll(category?: string): Promise<import("@prestige/types").Product[]>;
    getOne(slug: string): Promise<import("@prestige/types").Product>;
}
