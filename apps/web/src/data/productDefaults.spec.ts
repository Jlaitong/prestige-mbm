import { describe, it, expect } from 'vitest';
import { calculateSavings, DEFAULT_PRODUCTS } from './productDefaults';

describe('PRESTIGE MBM Business Logic', () => {
  it('should accurately calculate workshop vs mall savings for 1 piece', () => {
    const savings = calculateSavings(1);
    expect(savings.totalWorkshopPrice).toBe(140000);
    expect(savings.totalMallPrice).toBe(260000);
    expect(savings.totalSavings).toBe(120000);
  });

  it('should accurately calculate workshop vs mall savings for 5 pieces', () => {
    const savings = calculateSavings(5);
    expect(savings.totalWorkshopPrice).toBe(700000);
    expect(savings.totalMallPrice).toBe(1300000);
    expect(savings.totalSavings).toBe(600000);
  });

  it('should contain all official drops with 200+ GSM density', () => {
    expect(DEFAULT_PRODUCTS.length).toBe(4);
    DEFAULT_PRODUCTS.forEach((product) => {
      expect(product.densityGsm).toBeGreaterThanOrEqual(200);
      expect(product.price).toBeGreaterThan(0);
      expect(product.images.length).toBeGreaterThan(0);
    });
  });
});
