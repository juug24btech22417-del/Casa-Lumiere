/**
 * Centralized pricing for all current and upcoming projects.
 *
 * To update a project's price in the future, edit the value in this file only.
 * The immersive view (BanashriEnclaveView) and any future project pages
 * should import from here rather than hardcoding numbers.
 */

export interface ProjectPricing {
  /** Plot reference number, e.g. "A-01" */
  plotNumber: string;
  /** Human-readable site / project name */
  siteName: string;
  /** Base price in INR (raw number, no formatting) */
  base: number;
  /** Plot dimensions as a string, e.g. "30 × 40" */
  dimensions: string;
  /** Total area in square feet */
  sqft: number;
  /** Short note about price changes / availability */
  priceNote: string;
}

export const PRICING: Record<string, ProjectPricing> = {
  banashriEnclave: {
    plotNumber: 'A-01',
    siteName: 'Banashri Enclave',
    base: 20_00_000,
    dimensions: '30 × 40',
    sqft: 1200,
    priceNote: 'Price may increase in the future',
  },
};

/** Format INR with Indian lakh/crore grouping (e.g. ₹20,00,000). */
export const formatINR = (amount: number): string => {
  const s = amount.toString();
  if (s.length <= 3) return `₹${s}`;
  const lastThree = s.slice(-3);
  const rest = s.slice(0, -3);
  const withCommas = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return `₹${withCommas},${lastThree}`;
};
