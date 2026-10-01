/**
 * MEDIA KIT — the logo files, brand colors and fonts offered on /about/media-kit/.
 * File sizes come from brand-kit.json, which `npm run brand` writes. Don't edit that file by hand.
 */
import kit from './brand-kit.json';

type KitId = keyof typeof kit;

export interface LogoAsset {
  id: KitId;
  title: string;
  use: string;
  /** Background the preview tile shows, matching what the file is made for. */
  surface: 'dark' | 'light';
}

export interface LogoGroup {
  title: string;
  body: string;
  items: LogoAsset[];
}

export const logoGroups: LogoGroup[] = [
  {
    title: 'Full logo',
    body: 'The first choice wherever there is room. It carries the edition year.',
    items: [
      { id: 'logo-color', title: 'Full color', use: 'White and light backgrounds', surface: 'light' },
      { id: 'logo-white', title: 'White', use: 'Dark backgrounds and photos', surface: 'dark' },
      { id: 'logo-black', title: 'Black', use: 'Single-color print and light backgrounds', surface: 'light' },
      { id: 'logo-color-on-white', title: 'Color on white', use: 'Documents and slides that need a solid box', surface: 'light' },
    ],
  },
  {
    title: 'Icon',
    body: 'The “Q” alone, for profile pictures, app icons and small spaces.',
    items: [
      { id: 'icon-color', title: 'Full color', use: 'White and light backgrounds', surface: 'light' },
      { id: 'icon-white', title: 'White', use: 'Dark backgrounds and photos', surface: 'dark' },
      { id: 'icon-black', title: 'Black', use: 'Single-color print and light backgrounds', surface: 'light' },
    ],
  },
];

export const logoFile = (id: KitId) => kit[id];

export interface BrandColor {
  name: string;
  hex: string;
  /** The design token that holds this color on the website. */
  token: string;
  use: string;
}

export const brandColors: BrandColor[] = [
  { name: 'IEEE Blue', hex: '#006098', token: '--brand-blue', use: 'Logo wordmark' },
  { name: 'Maroon', hex: '#500000', token: '--brand-maroon', use: 'Logo “Q” and year' },
  { name: 'Steel Blue', hex: '#3994C8', token: '--accent', use: 'Website buttons and highlights' },
  { name: 'Night', hex: '#141416', token: '--bg', use: 'Website background' },
];

export const brandFonts = [
  { name: 'Poppins', use: 'Headings', family: 'var(--font-display)', url: 'https://fonts.google.com/specimen/Poppins' },
  { name: 'Barlow', use: 'Body text', family: 'var(--font-body)', url: 'https://fonts.google.com/specimen/Barlow' },
];

export const logoDos = [
  'Use the white logo on dark backgrounds and photos, and the color logo on white or light ones.',
  'Leave clear space around the logo, at least the height of the “E” in IEEE on every side.',
  'Switch to the icon when the full logo would be narrower than about 120 px.',
];

export const logoDonts = [
  'Don’t recolor, stretch, rotate or outline the logo, or add shadows or effects.',
  'Don’t place the color logo on dark or busy backgrounds.',
  'Don’t rebuild the logo or retype “IEEE Q-Con” in another font.',
];
