export declare class CustomerDto {
    fullName: string;
    phone: string;
    email?: string;
    city: string;
    address?: string;
    notes?: string;
}
export declare class OrderItemDto {
    productId: string;
    variantId?: string;
    quantity: number;
}
export declare class CreateOrderDto {
    customer: CustomerDto;
    items: OrderItemDto[];
    notes?: string;
}
