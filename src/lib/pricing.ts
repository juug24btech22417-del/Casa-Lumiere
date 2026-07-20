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
  /** Map / location config for this project */
  map: {
    /** Address or short location label */
    label: string;
    /** Latitude for the embed & directions URL */
    lat: number;
    /** Longitude for the embed & directions URL */
    lng: number;
    /** Google Maps place name shown in the embed */
    placeName: string;
    /** Google place ID (cid) — used for the embed URL */
    placeId: string;
    /** City / region for the subtitle */
    region: string;
  };
}

export const PRICING: Record<string, ProjectPricing> = {
  banashriEnclave: {
    plotNumber: 'A-01',
    siteName: 'Banashri Enclave',
    base: 20_00_000,
    dimensions: '30 × 40',
    sqft: 1200,
    priceNote: 'Price may increase in the future',
    map: {
      label: 'Banashri Enclave',
      lat: 16.0486747,
      lng: 75.76803,
      placeName: 'Banashri Enclave',
      placeId: '0x3bb87f702a7e99d7:0xc261c50bb7386f12',
      region: 'Karnataka, India',
    },
  },
};

/**
 * Build a Google Maps /maps/embed URL (no API key required) for a project.
 * Uses the project's coordinates and place name.
 */
export const buildMapEmbedUrl = (m: ProjectPricing['map']): string => {
  const params = new URLSearchParams({
    pb: `!1m18!1m12!1m3!1d3000!2d${m.lng}!3d${m.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${encodeURIComponent(m.placeId)}!2s${encodeURIComponent(m.placeName)}!5e0!3m2!1sen!2sin!4v1721000000000`,
  });
  return `https://www.google.com/maps/embed?${params.toString()}`;
};

/** Open the location in Google Maps (or default maps app on mobile). */
export const buildDirectionsUrl = (m: ProjectPricing['map']): string =>
  `https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}`;

/** Format INR with Indian lakh/crore grouping (e.g. ₹20,00,000). */
export const formatINR = (amount: number): string => {
  const s = amount.toString();
  if (s.length <= 3) return `₹${s}`;
  const lastThree = s.slice(-3);
  const rest = s.slice(0, -3);
  const withCommas = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return `₹${withCommas},${lastThree}`;
};
