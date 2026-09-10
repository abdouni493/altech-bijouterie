/**
 * ─── DEMO DATASET ────────────────────────────────────────────────────────────
 * The application ships without any database. Every screen is fed from the
 * constants below, which AppContext loads into memory at start-up. All
 * create / update / delete actions mutate that in-memory copy, so the demo is
 * fully interactive; reloading the page restores this pristine dataset.
 */
import {
  MetalCategory, MetalType, Supplier, PurchaseInvoice, SaleInvoice, Workshop,
  Command, Worker, WorkerAdvance, WorkerAbsence, WorkerPaymentRecord, Delivery,
  StoreExpense, Debt, DebtPayment, Client, ReplacementInvoice, CassiePurchase,
  MeltingRecord, StoreSettings, WebOffer, WebSpecialOffer, WebDeliveryCompany,
  WebContacts, WebOrder, User,
} from '../types';

/** Inline SVG thumbnail — keeps the demo self-contained (no network, no CDN). */
const thumb = (from: string, to: string, glyph: string): string =>
  'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0%" stop-color="' + from + '"/><stop offset="100%" stop-color="' + to + '"/>' +
    '</linearGradient></defs>' +
    '<rect width="400" height="400" fill="url(#g)"/>' +
    '<circle cx="200" cy="188" r="94" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="3"/>' +
    '<text x="200" y="216" font-family="Georgia,serif" font-size="76" fill="rgba(255,255,255,0.92)" text-anchor="middle">' + glyph + '</text>' +
    '</svg>'
  );

const GOLD_IMG = (g: string) => thumb('#B98D3A', '#E7C878', g);
const SILVER_IMG = (g: string) => thumb('#8A94A0', '#D6DCE3', g);

// ─── ACCOUNTS ────────────────────────────────────────────────────────────────
/** The one-click demo account offered on the login screen. */
export const DEMO_ADMIN: User = {
  id: 'demo-admin',
  username: 'Administrateur Démo',
  email: 'demo@altech-bijouterie.dz',
  role: 'admin',
  language: 'fr',
};

/** Credentials the login form accepts (workers also sign in with theirs). */
export const DEMO_ACCOUNTS: { login: string; password: string; user: User }[] = [
  { login: 'demo', password: 'demo', user: DEMO_ADMIN },
  { login: 'demo@altech-bijouterie.dz', password: 'demo', user: DEMO_ADMIN },
  { login: 'admin', password: 'admin', user: { ...DEMO_ADMIN, id: 'admin', username: 'Administrateur' } },
];

// ─── METAL CATEGORIES ────────────────────────────────────────────────────────
// The heart of the catalogue: every stock type belongs to one of these
// families. Or / Argent ship built in; the user can add any other material.
export const DEMO_METAL_CATEGORIES: MetalCategory[] = [
  { id: 'or', name: 'Or', nameAr: 'ذهب', color: '#C9A84C', calibres: ['18k', '21k', '24k'], pricePerGram: 24500, isBuiltIn: true },
  { id: 'argent', name: 'Argent', nameAr: 'فضة', color: '#A8B2BD', calibres: ['800', '925', '950'], pricePerGram: 210, isBuiltIn: true },
  { id: 'or-blanc', name: 'Or Blanc', nameAr: 'ذهب أبيض', color: '#DCE3EB', calibres: ['18k', '21k'], pricePerGram: 25800 },
  { id: 'platine', name: 'Platine', nameAr: 'بلاتين', color: '#8FB6BD', calibres: ['950'], pricePerGram: 4200 },
  { id: 'plaque-or', name: 'Plaqué Or', nameAr: 'مطلي بالذهب', color: '#D9A066', calibres: [], pricePerGram: 0 },
];

export const DEMO_SHAPES: string[] = [
  'ring', 'necklace', 'earring', 'bracelet', 'parure4piece', 'triyeu3piece',
  'gourmette', 'pendentif', 'louiza', 'mahazma', 'motife',
];

const shapeMap = (v: number[]): Record<string, number> =>
  Object.fromEntries(DEMO_SHAPES.map((s, i) => [s, v[i] ?? 0]));

// ─── STOCK TYPES ─────────────────────────────────────────────────────────────
export const DEMO_METAL_TYPES: MetalType[] = [
  {
    id: 'mt-or-18k', name: 'Or 18k Italien', metalCategoryId: 'or', calibre: '18k',
    initialQuantity: 1200, isCassie: false,
    shapes: shapeMap([182.4, 240.6, 96.2, 154.8, 88.5, 62.3, 74.9, 41.2, 33.6, 28.4, 19.7]),
  },
  {
    id: 'mt-or-21k', name: 'Or 21k Local', metalCategoryId: 'or', calibre: '21k',
    initialQuantity: 800, isCassie: false,
    shapes: shapeMap([104.7, 138.2, 52.4, 91.6, 46.8, 30.5, 41.3, 22.8, 17.4, 12.9, 8.6]),
  },
  {
    id: 'mt-or-cassie', name: 'Or Cassie', metalCategoryId: 'or', calibre: '18k',
    initialQuantity: 386.42, isCassie: true, shapes: shapeMap([]),
  },
  {
    id: 'mt-argent-local', name: 'Argent 925 Local', metalCategoryId: 'argent', calibre: '925',
    initialQuantity: 9000, isCassie: false,
    shapes: shapeMap([1420.5, 1880.2, 760.4, 1310.8, 690.3, 520.7, 604.2, 348.9, 286.4, 214.6, 148.3]),
  },
  {
    id: 'mt-argent-import', name: 'Argent 925 Importé', metalCategoryId: 'argent', calibre: '925',
    initialQuantity: 5500, isCassie: false,
    shapes: shapeMap([806.3, 1042.7, 418.5, 728.9, 392.4, 288.6, 336.1, 194.2, 158.7, 118.5, 82.4]),
  },
  {
    id: 'mt-argent-cassie', name: 'Argent 925 Cassie', metalCategoryId: 'argent', calibre: '925',
    initialQuantity: 2148.75, isCassie: true, shapes: shapeMap([]),
  },
  {
    id: 'mt-or-blanc-18k', name: 'Or Blanc 18k', metalCategoryId: 'or-blanc', calibre: '18k',
    initialQuantity: 350, isCassie: false,
    shapes: shapeMap([62.4, 78.9, 34.2, 48.6, 22.7, 16.4, 20.8, 11.5, 8.2, 6.4, 4.1]),
  },
  {
    id: 'mt-platine-950', name: 'Platine 950', metalCategoryId: 'platine', calibre: '950',
    initialQuantity: 120, isCassie: false,
    shapes: shapeMap([28.6, 24.2, 12.8, 18.4, 6.2, 4.8, 7.1, 3.6, 2.4, 1.8, 1.2]),
  },
  {
    id: 'mt-plaque-piece', name: 'Parures Plaqué Or (à la pièce)', metalCategoryId: 'plaque-or', calibre: '',
    initialQuantity: 0, isCassie: false, isAlaPiece: true,
    shapes: shapeMap([42, 36, 58, 27, 18, 14, 22, 31, 12, 9, 16]),
  },
];

// ─── PARTNERS ────────────────────────────────────────────────────────────────
export const DEMO_SUPPLIERS: Supplier[] = [
  { id: 'sup-1', name: 'Or Diffusion Alger', phone: '0551 24 78 90', address: 'Rue Didouche Mourad, Alger Centre' },
  { id: 'sup-2', name: 'Bijoux Import Sétif', phone: '0661 78 12 45', address: 'Cité El Hidhab, Sétif' },
  { id: 'sup-3', name: 'Métaux Précieux Oran', phone: '0770 33 21 09', address: 'Bd de la Soummam, Oran' },
  { id: 'sup-4', name: 'Argenterie Constantine', phone: '0555 91 04 63', address: 'Rue Ben Mhidi, Constantine' },
];

export const DEMO_WORKSHOPS: Workshop[] = [
  { id: 'ws-1', name: 'Atelier El Amir', phone: '0550 11 22 33', address: 'Chéraga, Alger' },
  { id: 'ws-2', name: 'Atelier Ben Yahia', phone: '0661 44 55 66', address: 'Bab El Oued, Alger' },
  { id: 'ws-3', name: 'Atelier Gravure Pro', phone: '0770 77 88 99', address: 'Birkhadem, Alger' },
];

export const DEMO_DELIVERIES: Delivery[] = [
  {
    id: 'dl-1', fullName: 'Karim Messaoudi', phone: '0555 78 41 20', createdDate: '2026-07-04T09:15:00.000Z',
    paymentHistory: [
      { id: 'dlp-1', amount: 18000, date: '2026-07-28T10:00:00.000Z', method: 'cash' },
      { id: 'dlp-2', amount: 12500, date: '2026-08-25T10:00:00.000Z', method: 'cash' },
    ],
  },
  {
    id: 'dl-2', fullName: 'Yacine Haddad', phone: '0661 09 33 47', createdDate: '2026-07-19T11:40:00.000Z',
    paymentHistory: [{ id: 'dlp-3', amount: 9500, date: '2026-08-30T14:20:00.000Z', method: 'cash' }],
  },
  {
    id: 'dl-3', fullName: 'Sofiane Belkacem', phone: '0770 62 18 05', createdDate: '2026-08-12T08:05:00.000Z',
    paymentHistory: [],
  },
];

// ─── STAFF ───────────────────────────────────────────────────────────────────
export const DEMO_WORKERS: Worker[] = [
  { id: 'wk-1', fullName: 'Amine Bouzid', phone: '0551 63 90 14', address: 'Chéraga, Alger', paymentType: 'monthly', salary: 62000, username: 'amine', password: 'amine123', createdAt: '2025-11-03T08:00:00.000Z' },
  { id: 'wk-2', fullName: 'Nadia Cherif', phone: '0661 27 55 38', address: 'Draria, Alger', paymentType: 'monthly', salary: 58000, username: 'nadia', password: 'nadia123', createdAt: '2026-02-17T08:00:00.000Z' },
  { id: 'wk-3', fullName: 'Rachid Slimani', phone: '0770 84 06 72', address: 'Ouled Fayet, Alger', paymentType: 'daily', salary: 2600, username: 'rachid', password: 'rachid123', createdAt: '2026-05-06T08:00:00.000Z' },
];

export const DEMO_WORKER_ADVANCES: WorkerAdvance[] = [
  { id: 'adv-1', workerId: 'wk-1', amount: 10000, date: '2026-08-07T09:00:00.000Z' },
  { id: 'adv-2', workerId: 'wk-2', amount: 6000, date: '2026-08-14T09:00:00.000Z' },
  { id: 'adv-3', workerId: 'wk-1', amount: 8000, date: '2026-09-03T09:00:00.000Z' },
];

export const DEMO_WORKER_ABSENCES: WorkerAbsence[] = [
  { id: 'abs-1', workerId: 'wk-3', deduction: 2600, date: '2026-08-11T09:00:00.000Z' },
  { id: 'abs-2', workerId: 'wk-2', deduction: 1900, date: '2026-08-24T09:00:00.000Z' },
];

export const DEMO_WORKER_PAYMENTS: WorkerPaymentRecord[] = [
  { id: 'wp-1', workerId: 'wk-1', amount: 52000, date: '2026-07-31T16:00:00.000Z' },
  { id: 'wp-2', workerId: 'wk-2', amount: 58000, date: '2026-07-31T16:00:00.000Z' },
  { id: 'wp-3', workerId: 'wk-3', amount: 54600, date: '2026-07-31T16:00:00.000Z' },
  { id: 'wp-4', workerId: 'wk-1', amount: 54000, date: '2026-08-31T16:00:00.000Z' },
  { id: 'wp-5', workerId: 'wk-2', amount: 50100, date: '2026-08-31T16:00:00.000Z' },
];

// ─── PURCHASES ───────────────────────────────────────────────────────────────
export const DEMO_PURCHASES: PurchaseInvoice[] = [
  {
    id: 'pi-1', supplierId: 'sup-1', date: '2026-07-06T10:20:00.000Z',
    items: [
      { metalTypeId: 'mt-or-18k', shape: 'ring', weight: 42.5, pricePerGram: 23800, laborCostPerGram: 400, totalPrice: 1011500 },
      { metalTypeId: 'mt-or-18k', shape: 'necklace', weight: 68.2, pricePerGram: 23800, laborCostPerGram: 400, totalPrice: 1623160 },
    ],
    payment: { cash: 2634660, cassieSilverGrams: 0, cassieSilverPricePerGram: 0, cassieGoldGrams: 0, cassieGoldPricePerGram: 0, total: 2634660 },
    isDebt: false, amountPaid: 2634660, remaining: 0,
  },
  {
    id: 'pi-2', supplierId: 'sup-2', date: '2026-07-21T09:05:00.000Z',
    items: [
      { metalTypeId: 'mt-argent-local', shape: 'bracelet', weight: 640, pricePerGram: 198, totalPrice: 126720 },
      { metalTypeId: 'mt-argent-local', shape: 'earring', weight: 310, pricePerGram: 198, totalPrice: 61380 },
    ],
    payment: { cash: 120000, cassieSilverGrams: 0, cassieSilverPricePerGram: 0, cassieGoldGrams: 0, cassieGoldPricePerGram: 0, total: 120000 },
    isDebt: true, amountPaid: 120000, remaining: 68100,
  },
  {
    id: 'pi-3', supplierId: 'sup-3', date: '2026-08-03T14:35:00.000Z',
    items: [
      { metalTypeId: 'mt-or-21k', shape: 'gourmette', weight: 36.8, pricePerGram: 26400, totalPrice: 971520 },
    ],
    payment: { cash: 500000, cassieSilverGrams: 0, cassieSilverPricePerGram: 0, cassieGoldGrams: 18.6, cassieGoldPricePerGram: 22000, total: 909200 },
    isDebt: true, amountPaid: 909200, remaining: 62320,
  },
  {
    id: 'pi-4', supplierId: 'sup-4', date: '2026-08-18T11:10:00.000Z',
    items: [
      { metalTypeId: 'mt-argent-import', shape: 'necklace', weight: 880, pricePerGram: 206, totalPrice: 181280 },
      { metalTypeId: 'mt-argent-import', shape: 'ring', weight: 420, pricePerGram: 206, totalPrice: 86520 },
    ],
    payment: { cash: 267800, cassieSilverGrams: 0, cassieSilverPricePerGram: 0, cassieGoldGrams: 0, cassieGoldPricePerGram: 0, total: 267800 },
    isDebt: false, amountPaid: 267800, remaining: 0,
  },
  {
    id: 'pi-5', supplierId: 'sup-1', date: '2026-08-29T15:45:00.000Z',
    items: [
      { metalTypeId: 'mt-or-blanc-18k', shape: 'ring', weight: 24.3, pricePerGram: 25200, totalPrice: 612360 },
    ],
    payment: { cash: 400000, cassieSilverGrams: 0, cassieSilverPricePerGram: 0, cassieGoldGrams: 0, cassieGoldPricePerGram: 0, total: 400000 },
    isDebt: true, amountPaid: 400000, remaining: 212360,
  },
  {
    id: 'pi-6', supplierId: 'sup-2', date: '2026-09-05T09:50:00.000Z',
    items: [
      { metalTypeId: 'mt-plaque-piece', shape: 'parure4piece', weight: 0, pricePerGram: 0, totalPrice: 96000, pricingMode: 'piece', quantity: 24, pricePerPiece: 4000 },
    ],
    payment: { cash: 96000, cassieSilverGrams: 0, cassieSilverPricePerGram: 0, cassieGoldGrams: 0, cassieGoldPricePerGram: 0, total: 96000 },
    isDebt: false, amountPaid: 96000, remaining: 0,
  },
];

// ─── SALES ───────────────────────────────────────────────────────────────────
export const DEMO_SALES: SaleInvoice[] = [
  {
    id: 'si-1', date: '2026-08-02T10:12:00.000Z', workerId: 'wk-1', clientName: 'Leïla Amrani', clientPhone: '0551 40 22 18',
    items: [{ metalTypeId: 'mt-or-18k', shape: 'ring', weight: 6.4, pricePerGram: 27500, totalPrice: 176000 }],
    isDebt: false, total: 176000, amountPaid: 176000, remaining: 0,
  },
  {
    id: 'si-2', date: '2026-08-05T16:44:00.000Z', workerId: 'wk-2', clientName: 'Samir Dahmani', clientPhone: '0661 71 03 55',
    items: [
      { metalTypeId: 'mt-argent-local', shape: 'necklace', weight: 32.5, pricePerGram: 310, totalPrice: 10075 },
      { metalTypeId: 'mt-argent-local', shape: 'bracelet', weight: 18.2, pricePerGram: 310, totalPrice: 5642 },
    ],
    isDebt: false, total: 15717, amountPaid: 15717, remaining: 0,
  },
  {
    id: 'si-3', date: '2026-08-09T11:30:00.000Z', workerId: 'wk-1', clientName: 'Fatima Zohra Kadi', clientPhone: '0770 18 66 04',
    items: [{ metalTypeId: 'mt-or-21k', shape: 'parure4piece', weight: 28.7, pricePerGram: 29800, totalPrice: 855260 }],
    isDebt: true, total: 855260, amountPaid: 500000, remaining: 355260,
  },
  {
    id: 'si-4', date: '2026-08-14T09:20:00.000Z', workerId: 'wk-3', clientName: 'Mohamed Larbi', clientPhone: '0555 62 90 37',
    items: [{ metalTypeId: 'mt-argent-import', shape: 'earring', weight: 12.4, pricePerGram: 335, totalPrice: 4154 }],
    isDebt: false, total: 4154, amountPaid: 4154, remaining: 0,
  },
  {
    id: 'si-5', date: '2026-08-20T15:05:00.000Z', workerId: 'wk-2', clientName: 'Hakim Berrahal', clientPhone: '0661 55 12 89',
    items: [
      { metalTypeId: 'mt-or-18k', shape: 'gourmette', weight: 11.8, pricePerGram: 27900, totalPrice: 329220 },
      { metalTypeId: 'mt-or-18k', shape: 'pendentif', weight: 3.2, pricePerGram: 27900, totalPrice: 89280 },
    ],
    isDebt: false, total: 418500, amountPaid: 418500, remaining: 0,
  },
  {
    id: 'si-6', date: '2026-08-26T13:15:00.000Z', workerId: 'wk-1', clientName: 'Sarah Belhadj', clientPhone: '0551 33 78 42',
    items: [{ metalTypeId: 'mt-plaque-piece', shape: 'parure4piece', weight: 0, pricePerGram: 0, totalPrice: 13000, isAlaPiece: true, quantity: 2, pricePerPiece: 6500 }],
    isDebt: false, total: 13000, amountPaid: 13000, remaining: 0,
  },
  {
    id: 'si-7', date: '2026-09-01T10:02:00.000Z', workerId: 'wk-2', clientName: 'Nabil Ould Ali', clientPhone: '0770 24 51 60',
    items: [{ metalTypeId: 'mt-argent-local', shape: 'triyeu3piece', weight: 46.8, pricePerGram: 305, totalPrice: 14274 }],
    isDebt: false, total: 14274, amountPaid: 14274, remaining: 0,
  },
  {
    id: 'si-8', date: '2026-09-04T17:25:00.000Z', workerId: 'wk-1', clientName: 'Imane Ferhat', clientPhone: '0661 90 14 73',
    items: [{ metalTypeId: 'mt-or-blanc-18k', shape: 'ring', weight: 4.6, pricePerGram: 29500, totalPrice: 135700 }],
    isDebt: true, total: 135700, amountPaid: 60000, remaining: 75700,
  },
  {
    id: 'si-9', date: '2026-09-07T12:40:00.000Z', workerId: 'wk-3', clientName: 'Walid Saidi', clientPhone: '0555 08 27 91',
    items: [{ metalTypeId: 'mt-argent-import', shape: 'mahazma', weight: 88.5, pricePerGram: 330, totalPrice: 29205 }],
    isDebt: false, total: 29205, amountPaid: 29205, remaining: 0,
  },
  {
    id: 'si-10', date: '2026-09-09T14:55:00.000Z', workerId: 'wk-2', clientName: 'Amel Guerroudj', clientPhone: '0770 46 03 28',
    items: [{ metalTypeId: 'mt-platine-950', shape: 'ring', weight: 5.2, pricePerGram: 5400, totalPrice: 28080 }],
    isDebt: false, total: 28080, amountPaid: 28080, remaining: 0,
  },
];

// ─── WORKSHOP COMMANDS ───────────────────────────────────────────────────────
export const DEMO_COMMANDS: Command[] = [
  {
    id: 'cmd-1', type: 'reparation', clientName: 'Yasmine Khelifi', clientPhone: '0551 12 45 78',
    metal: 'Or', calibre: '18k', initialWeight: 8.4, workshopId: 'ws-1',
    date: '2026-08-08T09:30:00.000Z', status: 'finalized', paidAmount: 3000,
    finalWeight: 8.2, workshopPrice: 4500, clientPrice: 9000, endDate: '2026-08-15T16:00:00.000Z',
    note: 'Ressoudure de la chaîne + polissage',
  },
  {
    id: 'cmd-2', type: 'industry', clientName: 'Boutique El Feth', clientPhone: '0661 33 09 21',
    metal: 'Argent', calibre: '925', initialWeight: 320, workshopId: 'ws-2', shape: 'bracelet',
    date: '2026-08-17T11:00:00.000Z', status: 'pending', paidAmount: 0,
    paymentMethod: 'money',
  },
  {
    id: 'cmd-3', type: 'reparation', clientName: 'Omar Tounsi', clientPhone: '0770 55 84 12',
    metal: 'Argent', calibre: '925', initialWeight: 22.6, workshopId: 'ws-3',
    date: '2026-08-23T14:20:00.000Z', status: 'paid', paidAmount: 2500,
    finalWeight: 22.4, workshopPrice: 1200, clientPrice: 2500, endDate: '2026-08-28T10:00:00.000Z',
  },
  {
    id: 'cmd-4', type: 'industry', clientName: 'Bijoux Rym', clientPhone: '0555 74 60 33',
    metal: 'Or', calibre: '21k', initialWeight: 46.5, workshopId: 'ws-1', shape: 'necklace',
    date: '2026-08-30T09:15:00.000Z', status: 'finalized', paidAmount: 40000,
    finalWeight: 45.8, workshopPrice: 52000, clientPrice: 96000, pricePerGram: 2100,
    endDate: '2026-09-06T17:30:00.000Z', paymentMethod: 'cassie', cassieTypeId: 'mt-or-cassie', workshopCassieAmount: 2.1,
  },
  {
    id: 'cmd-5', type: 'reparation', clientName: 'Djamila Bensaid', clientPhone: '0661 18 27 40',
    metal: 'Or Blanc', calibre: '18k', initialWeight: 5.1, workshopId: 'ws-3',
    date: '2026-09-02T10:45:00.000Z', status: 'pending', paidAmount: 0,
    note: 'Remise à taille + rhodiage',
  },
  {
    id: 'cmd-6', type: 'industry', clientName: 'Atelier Nour', clientPhone: '0770 91 05 66',
    metal: 'Argent', calibre: '925', initialWeight: 180, workshopId: 'ws-2', shape: 'ring',
    date: '2026-09-08T08:50:00.000Z', status: 'pending', paidAmount: 15000, paymentMethod: 'money',
    deliveryId: 'dl-1', deliveryPrice: 1200,
  },
];

// ─── CASSIE (SCRAP) PURCHASES & MELTING ──────────────────────────────────────
export const DEMO_CASSIE_PURCHASES: CassiePurchase[] = [
  { id: 'cp-1', clientName: 'Rabah Meziane', clientPhone: '0551 62 09 84', metalTypeId: 'mt-or-cassie', weight: 12.4, totalPrice: 260400, date: '2026-07-24T10:00:00.000Z', isMelted: true },
  { id: 'cp-2', clientName: 'Souad Lamine', clientPhone: '0661 47 13 20', metalTypeId: 'mt-or-cassie', weight: 8.9, totalPrice: 186900, date: '2026-07-30T15:20:00.000Z', isMelted: true },
  { id: 'cp-3', clientName: 'Tarek Bouras', clientPhone: '0770 35 88 02', metalTypeId: 'mt-argent-cassie', weight: 340, totalPrice: 54400, date: '2026-08-11T09:40:00.000Z', isMelted: false },
  { id: 'cp-4', clientName: 'Nassima Adjali', clientPhone: '0555 27 61 49', metalTypeId: 'mt-or-cassie', weight: 15.7, totalPrice: 329700, date: '2026-08-27T13:05:00.000Z', isMelted: false },
  { id: 'cp-5', clientName: 'Mourad Cherfi', clientPhone: '0661 04 92 37', metalTypeId: 'mt-argent-cassie', weight: 520, totalPrice: 83200, date: '2026-09-06T11:25:00.000Z', isMelted: false },
];

export const DEMO_MELTINGS: MeltingRecord[] = [
  {
    id: 'ml-1', date: '2026-08-01T17:00:00.000Z', purchaseIds: ['cp-1', 'cp-2'],
    loss: 0.9, totalPreWeight: 21.3, postWeight: 20.4, totalPrice: 447300,
    pricePerGramAfter: 21926.47, targetMetalTypeId: 'mt-or-cassie',
  },
];

// ─── CLIENTS ─────────────────────────────────────────────────────────────────
export const DEMO_CLIENTS: Client[] = [
  {
    id: 'cl-1', name: 'Leïla Amrani', phone: '0551 40 22 18', note: 'Cliente fidèle — préfère l’or 18k',
    payments: [
      { id: 'clp-1', amount: 50000, date: '2026-07-12T10:00:00.000Z' },
      { id: 'clp-2', amount: 30000, date: '2026-08-16T10:00:00.000Z' },
    ],
    recuperations: [{ id: 'clr-1', amount: 20000, date: '2026-09-01T10:00:00.000Z' }],
  },
  {
    id: 'cl-2', name: 'Fatima Zohra Kadi', phone: '0770 18 66 04', note: 'Solde crédit parure 21k',
    payments: [{ id: 'clp-3', amount: 120000, date: '2026-08-09T11:30:00.000Z' }],
    recuperations: [],
  },
  {
    id: 'cl-3', name: 'Hakim Berrahal', phone: '0661 55 12 89', note: '',
    payments: [{ id: 'clp-4', amount: 75000, date: '2026-08-20T15:05:00.000Z' }],
    recuperations: [{ id: 'clr-2', amount: 25000, date: '2026-09-03T09:00:00.000Z' }],
  },
  {
    id: 'cl-4', name: 'Imane Ferhat', phone: '0661 90 14 73', note: 'Achat en plusieurs versements',
    payments: [{ id: 'clp-5', amount: 60000, date: '2026-09-04T17:25:00.000Z' }],
    recuperations: [],
  },
  {
    id: 'cl-5', name: 'Walid Saidi', phone: '0555 08 27 91', note: '',
    payments: [], recuperations: [],
  },
];

// ─── REPLACEMENTS ────────────────────────────────────────────────────────────
export const DEMO_REPLACEMENTS: ReplacementInvoice[] = [
  {
    id: 'rp-1', date: '2026-08-13T11:00:00.000Z', type: 'exchange', workerId: 'wk-1',
    clientName: 'Samir Dahmani', clientPhone: '0661 71 03 55',
    returnedItem: { metalTypeId: 'mt-argent-local', shape: 'necklace', weight: 24.5, pricePerGram: 290, totalPrice: 7105 },
    newItem: { metalTypeId: 'mt-argent-local', shape: 'bracelet', weight: 31.2, pricePerGram: 310, totalPrice: 9672 },
    amountDifference: 2567, amountToPay: 2567, amountToRefund: 0,
  },
  {
    id: 'rp-2', date: '2026-08-28T15:30:00.000Z', type: 'buyback', workerId: 'wk-2',
    clientName: 'Mohamed Larbi', clientPhone: '0555 62 90 37',
    returnedItem: { metalTypeId: 'mt-or-18k', shape: 'ring', weight: 5.8, pricePerGram: 27500, totalPrice: 159500 },
    buyBackPricePerGram: 21000, amountDifference: 0, amountToPay: 0, amountToRefund: 121800,
  },
  {
    id: 'rp-3', date: '2026-09-05T10:15:00.000Z', type: 'exchange', workerId: 'wk-1',
    clientName: 'Amel Guerroudj', clientPhone: '0770 46 03 28',
    returnedItem: { metalTypeId: 'mt-argent-import', shape: 'earring', weight: 9.4, pricePerGram: 320, totalPrice: 3008 },
    newItem: { metalTypeId: 'mt-argent-import', shape: 'earring', weight: 7.8, pricePerGram: 335, totalPrice: 2613 },
    amountDifference: -395, amountToPay: 0, amountToRefund: 395,
  },
];

// ─── CASH & DEBT ─────────────────────────────────────────────────────────────
export const DEMO_STORE_EXPENSES: StoreExpense[] = [
  { id: 'ex-1', expenseName: 'Loyer boutique — Août', price: 85000, date: '2026-08-01T08:00:00.000Z', note: 'Bail annuel' },
  { id: 'ex-2', expenseName: 'Électricité & gaz', price: 12400, date: '2026-08-06T08:00:00.000Z' },
  { id: 'ex-3', expenseName: 'Emballages & écrins', price: 23600, date: '2026-08-12T08:00:00.000Z' },
  { id: 'ex-4', expenseName: 'Assurance vitrine', price: 34000, date: '2026-08-19T08:00:00.000Z' },
  { id: 'ex-5', expenseName: 'Publicité réseaux sociaux', price: 18000, date: '2026-08-24T08:00:00.000Z' },
  { id: 'ex-6', expenseName: 'Loyer boutique — Septembre', price: 85000, date: '2026-09-01T08:00:00.000Z' },
  { id: 'ex-7', expenseName: 'Entretien machine à polir', price: 9500, date: '2026-09-04T08:00:00.000Z' },
  { id: 'ex-8', expenseName: 'Fournitures bureau', price: 4200, date: '2026-09-08T08:00:00.000Z' },
];

export const DEMO_DEBTS: Debt[] = [
  { id: 'dt-1', name: 'Or Diffusion Alger', direction: 'taken', amount: 300000, amountPaid: 180000, remaining: 120000, isPaid: false, note: 'Avance marchandise', date: '2026-07-10T09:00:00.000Z' },
  { id: 'dt-2', name: 'Karim Messaoudi', direction: 'given', amount: 45000, amountPaid: 45000, remaining: 0, isPaid: true, note: 'Prêt personnel remboursé', date: '2026-07-22T09:00:00.000Z' },
  { id: 'dt-3', name: 'Atelier Ben Yahia', direction: 'taken', amount: 76000, amountPaid: 26000, remaining: 50000, isPaid: false, note: 'Façon bracelets', date: '2026-08-15T09:00:00.000Z' },
  { id: 'dt-4', name: 'Fatima Zohra Kadi', direction: 'given', amount: 355260, amountPaid: 100000, remaining: 255260, isPaid: false, note: 'Reste parure 21k', date: '2026-08-09T09:00:00.000Z' },
  { id: 'dt-5', name: 'Bijoux Import Sétif', direction: 'taken', amount: 68100, amountPaid: 0, remaining: 68100, isPaid: false, note: 'Facture PI-2', date: '2026-07-21T09:00:00.000Z' },
];

export const DEMO_DEBT_PAYMENTS: DebtPayment[] = [
  {
    id: 'dp-1', partyType: 'supplier', partyId: 'sup-1', partyName: 'Or Diffusion Alger',
    amount: 120000, date: '2026-08-10T10:00:00.000Z', method: 'cash',
    allocations: [{ invoiceId: 'pi-5', amount: 120000 }], invoiceId: 'pi-5',
    note: 'Versement partiel', createdAt: '2026-08-10T10:00:00.000Z',
  },
  {
    id: 'dp-2', partyType: 'supplier', partyId: 'sup-3', partyName: 'Métaux Précieux Oran',
    amount: 62320, date: '2026-08-22T14:30:00.000Z', method: 'gold',
    metalTypeId: 'mt-or-cassie', metalTypeName: 'Or Cassie', pricePerGram: 22000, weight: 2.83,
    allocations: [{ invoiceId: 'pi-3', amount: 62320 }], invoiceId: 'pi-3',
    note: 'Réglé en or cassie', createdAt: '2026-08-22T14:30:00.000Z',
  },
  {
    id: 'dp-3', partyType: 'client', partyId: 'cl-2', partyName: 'Fatima Zohra Kadi',
    amount: 100000, date: '2026-08-27T11:15:00.000Z', method: 'cash',
    allocations: [], note: 'Acompte parure', createdAt: '2026-08-27T11:15:00.000Z',
  },
  {
    id: 'dp-4', partyType: 'supplier', partyId: 'sup-2', partyName: 'Bijoux Import Sétif',
    amount: 30000, date: '2026-09-02T09:40:00.000Z', method: 'silver',
    metalTypeId: 'mt-argent-cassie', metalTypeName: 'Argent 925 Cassie', pricePerGram: 200, weight: 150,
    allocations: [{ invoiceId: 'pi-2', amount: 30000 }], invoiceId: 'pi-2',
    note: 'Réglé en argent cassie', createdAt: '2026-09-02T09:40:00.000Z',
  },
  {
    id: 'dp-5', partyType: 'client', partyId: 'cl-4', partyName: 'Imane Ferhat',
    amount: 40000, date: '2026-09-08T16:05:00.000Z', method: 'cash',
    allocations: [], note: '2ᵉ versement', createdAt: '2026-09-08T16:05:00.000Z',
  },
];

// ─── STORE SETTINGS ──────────────────────────────────────────────────────────
export const DEMO_SETTINGS: StoreSettings = {
  logo: null,
  storeName: 'Altech Bijouterie',
  slogan: 'Or & Argent d’exception',
  contact: 'contact@altech-bijouterie.dz',
  phone: '0551 24 78 90',
  address: 'Chéraga, Alger',
  webBadgeFr: '✨ Or & Argent Certifiés', webBadgeAr: '✨ ذهب وفضة معتمدان',
  webHeroLine1Fr: 'L’Art de la', webHeroLine1Ar: 'فن',
  webHeroLine2Fr: 'Haute Joaillerie', webHeroLine2Ar: 'المجوهرات الراقية',
  webHeroDescFr: 'Découvrez nos collections en or 18k, 21k et en argent 925 massif — façonnées par nos artisans pour celles et ceux qui aiment les pièces qui durent.',
  webHeroDescAr: 'اكتشف مجموعاتنا من الذهب عيار 18 و21 والفضة 925 — من صناعة حرفيينا.',
  webFeaturedTitleFr: 'Pièces en Vedette', webFeaturedTitleAr: 'قطع مميزة',
  webStoryTitleFr: 'Un savoir-faire, deux métaux', webStoryTitleAr: 'حرفة واحدة، معدنان',
  webStoryDescFr: 'Depuis plus d’une décennie, chaque pièce est façonnée avec passion — en or massif certifié comme en argent 925 — pour sublimer votre élégance.',
  webStoryDescAr: 'منذ أكثر من عقد، تُصنع كل قطعة بشغف — من الذهب الخالص والفضة 925.',
  webStat1Val: '12+', webStat2Val: '18k / 925', webStat3Val: '58', webStat4Val: '4.9',
  webStat1LabelFr: 'Années d’expérience', webStat1LabelAr: 'سنوات من الخبرة',
  webStat2LabelFr: 'Or & Argent certifiés', webStat2LabelAr: 'ذهب وفضة معتمدان',
  webStat3LabelFr: 'Wilayas livrées', webStat3LabelAr: 'ولاية مغطاة',
  webStat4LabelFr: 'Note clients', webStat4LabelAr: 'تقييم العملاء',
  webBenefit1TitleFr: 'Or & Argent Certifiés', webBenefit1DescFr: 'Chaque pièce est poinçonnée et garantie.',
  webBenefit2TitleFr: 'Livraison Nationale', webBenefit2DescFr: '58 wilayas, à domicile ou au bureau.',
  webBenefit3TitleFr: 'Créations Sur Mesure', webBenefit3DescFr: 'Votre modèle, votre métal, votre calibre.',
  webBenefit4TitleFr: 'Support Dédié', webBenefit4DescFr: 'Une équipe joignable 6j/7.',
  webMarqueeItems: JSON.stringify(['💎 Or 18k & 21k', 'Argent 925 massif', 'Livraison nationale', 'Créations sur mesure', 'Qualité garantie']),
};

export const DEMO_MINIMAL_WEIGHT = 1000;

// ─── ONLINE SHOP ─────────────────────────────────────────────────────────────
export const DEMO_WEB_OFFERS: WebOffer[] = [
  { id: 'wo-1', name: 'Bague Solitaire Or 18k', image: GOLD_IMG('◇'), metalTypeId: 'mt-or-18k', calibre: '18k', form: 'ring', pricingMode: 'perGram', weight: 3.4, pricePerGram: 27500, totalPrice: 93500, showQuantity: true, quantity: 6, showWeight: true, isHidden: false, createdAt: '2026-08-01T09:00:00.000Z' },
  { id: 'wo-2', name: 'Collier Maille Or 21k', image: GOLD_IMG('❋'), metalTypeId: 'mt-or-21k', calibre: '21k', form: 'necklace', pricingMode: 'perGram', weight: 12.6, pricePerGram: 29800, totalPrice: 375480, showQuantity: true, quantity: 3, showWeight: true, isHidden: false, createdAt: '2026-08-03T09:00:00.000Z' },
  { id: 'wo-3', name: 'Bracelet Jonc Argent 925', image: SILVER_IMG('◯'), metalTypeId: 'mt-argent-local', calibre: '925', form: 'bracelet', pricingMode: 'perGram', weight: 22.8, pricePerGram: 310, totalPrice: 7068, showQuantity: true, quantity: 14, showWeight: true, isHidden: false, createdAt: '2026-08-05T09:00:00.000Z' },
  { id: 'wo-4', name: 'Parure 4 Pièces Argent', image: SILVER_IMG('✦'), metalTypeId: 'mt-argent-import', calibre: '925', form: 'parure4piece', pricingMode: 'perGram', weight: 58.4, pricePerGram: 335, totalPrice: 19564, showQuantity: true, quantity: 5, showWeight: true, isHidden: false, createdAt: '2026-08-08T09:00:00.000Z' },
  { id: 'wo-5', name: 'Alliance Or Blanc 18k', image: thumb('#9AA6B4', '#E8EEF5', '○'), metalTypeId: 'mt-or-blanc-18k', calibre: '18k', form: 'ring', pricingMode: 'perGram', weight: 4.2, pricePerGram: 29500, totalPrice: 123900, showQuantity: true, quantity: 4, showWeight: true, isHidden: false, createdAt: '2026-08-11T09:00:00.000Z' },
  { id: 'wo-6', name: 'Boucles Louiza Or 18k', image: GOLD_IMG('❀'), metalTypeId: 'mt-or-18k', calibre: '18k', form: 'louiza', pricingMode: 'perGram', weight: 5.6, pricePerGram: 27900, totalPrice: 156240, showQuantity: true, quantity: 7, showWeight: true, isHidden: false, createdAt: '2026-08-15T09:00:00.000Z' },
  { id: 'wo-7', name: 'Parure Plaqué Or (pièce)', image: thumb('#C08A4E', '#F0C88C', '✧'), metalTypeId: 'mt-plaque-piece', calibre: '', form: 'parure4piece', pricingMode: 'alaPiece', totalPrice: 6500, unitPrice: 6500, showQuantity: true, quantity: 18, showWeight: false, isHidden: false, createdAt: '2026-08-19T09:00:00.000Z' },
  { id: 'wo-8', name: 'Pendentif Platine 950', image: thumb('#6E8F96', '#BFD8DC', '◆'), metalTypeId: 'mt-platine-950', calibre: '950', form: 'pendentif', pricingMode: 'perGram', weight: 2.8, pricePerGram: 5400, totalPrice: 15120, showQuantity: true, quantity: 2, showWeight: true, isHidden: false, createdAt: '2026-08-23T09:00:00.000Z' },
];

export const DEMO_WEB_SPECIAL_OFFERS: WebSpecialOffer[] = [
  {
    id: 'wso-1', name: 'Gourmette Or 18k — Édition Rentrée', image: GOLD_IMG('✷'),
    metalTypeId: 'mt-or-18k', calibre: '18k', form: 'gourmette', pricingMode: 'perGram',
    weight: 9.2, pricePerGram: 27900, originalPrice: 256680, specialPrice: 219000,
    unitPrice: undefined, showQuantity: true, quantity: 4, showWeight: true,
    isHidden: false, isActive: true,
    startDate: '2026-09-01', startHour: '08:00', endDate: '2026-09-30', endHour: '23:59',
    createdAt: '2026-08-30T09:00:00.000Z',
  },
  {
    id: 'wso-2', name: 'Collier Argent 925 — Promo Duo', image: SILVER_IMG('✺'),
    metalTypeId: 'mt-argent-local', calibre: '925', form: 'necklace', pricingMode: 'perGram',
    weight: 34.5, pricePerGram: 310, originalPrice: 10695, specialPrice: 8900,
    showQuantity: true, quantity: 12, showWeight: true,
    isHidden: false, isActive: true,
    startDate: '2026-09-05', startHour: '00:00', endDate: '2026-09-25', endHour: '23:59',
    createdAt: '2026-09-04T09:00:00.000Z',
  },
  {
    id: 'wso-3', name: 'Parure Mariage Or 21k', image: GOLD_IMG('♛'),
    metalTypeId: 'mt-or-21k', calibre: '21k', form: 'parure4piece', pricingMode: 'perGram',
    weight: 32.4, pricePerGram: 29800, originalPrice: 965520, specialPrice: 899000,
    showQuantity: true, quantity: 2, showWeight: true,
    isHidden: false, isActive: false,
    startDate: '2026-10-01', startHour: '08:00', endDate: '2026-10-31', endHour: '23:59',
    createdAt: '2026-09-06T09:00:00.000Z',
  },
];

export const DEMO_WEB_DELIVERY_COMPANIES: WebDeliveryCompany[] = [
  {
    id: 'wdc-1', name: 'Yalidine Express', phone: '0770 00 11 22',
    wilayas: [
      { wilayaCode: 16, wilayaName: 'Alger', communes: ['Alger Centre', 'Cheraga', 'Bab Ezzouar', 'Kouba', 'Hydra'], toBureau: 400, toHome: 600 },
      { wilayaCode: 31, wilayaName: 'Oran', communes: ['Oran', 'Bir El Djir', 'Es Senia'], toBureau: 600, toHome: 850 },
      { wilayaCode: 25, wilayaName: 'Constantine', communes: ['Constantine', 'El Khroub', 'Ain Smara'], toBureau: 600, toHome: 850 },
      { wilayaCode: 19, wilayaName: 'Sétif', communes: ['Setif', 'El Eulma', 'Ain Oulmene'], toBureau: 550, toHome: 800 },
    ],
  },
  {
    id: 'wdc-2', name: 'ZR Express', phone: '0551 44 55 66',
    wilayas: [
      { wilayaCode: 16, wilayaName: 'Alger', communes: ['Alger Centre', 'Draria', 'Birkhadem'], toBureau: 350, toHome: 550 },
      { wilayaCode: 9, wilayaName: 'Blida', communes: ['Blida', 'Boufarik', 'Bougara'], toBureau: 450, toHome: 700 },
      { wilayaCode: 6, wilayaName: 'Béjaïa', communes: ['Bejaia', 'Akbou', 'El Kseur'], toBureau: 600, toHome: 850 },
    ],
  },
  {
    id: 'wdc-3', name: 'Noest Livraison', phone: '0661 77 88 99',
    wilayas: [
      { wilayaCode: 16, wilayaName: 'Alger', communes: ['Alger Centre', 'Rouiba', 'Zeralda'], toBureau: 400, toHome: 650 },
      { wilayaCode: 35, wilayaName: 'Boumerdès', communes: ['Boumerdes', 'Bordj Menaiel', 'Dellys'], toBureau: 500, toHome: 750 },
      { wilayaCode: 15, wilayaName: 'Tizi Ouzou', communes: ['Tizi-Ouzou', 'Azazga', 'Draa-Ben-Khedda'], toBureau: 550, toHome: 800 },
    ],
  },
];

export const DEMO_WEB_CONTACTS: WebContacts = {
  phone: '0551 24 78 90',
  email: 'contact@altech-bijouterie.dz',
  address: 'Rue des Frères Bouadou, Chéraga, Alger',
  facebook: 'https://facebook.com/altechbijouterie',
  instagram: 'https://instagram.com/altechbijouterie',
  tiktok: 'https://tiktok.com/@altechbijouterie',
  whatsapp: '213551247890',
};

export const DEMO_WEB_ORDERS: WebOrder[] = [
  {
    id: 'wor-1', orderNumber: 'CMD-WEB-1001', createdAt: '2026-09-02T10:24:00.000Z', status: 'pending',
    clientFullName: 'Nour El Houda Saci', clientPhone: '0551 78 20 46', clientEmail: 'nour.saci@example.dz',
    wilayaCode: 16, wilayaName: 'Alger', commune: 'Cheraga', address: 'Cité des Frères Bouadou, Bt B4',
    deliveryCompanyId: 'wdc-1', deliveryType: 'home', deliveryPrice: 600,
    items: [{ offerId: 'wo-1', name: 'Bague Solitaire Or 18k', image: GOLD_IMG('◇'), quantity: 1, unitPrice: 93500, totalPrice: 93500, metalTypeId: 'mt-or-18k', calibre: '18k', form: 'ring', weight: 3.4, size: '54' }],
    subtotal: 93500, total: 94100, isPersonalized: false,
  },
  {
    id: 'wor-2', orderNumber: 'CMD-WEB-1002', createdAt: '2026-09-03T15:12:00.000Z', status: 'accepted',
    clientFullName: 'Bilal Ammari', clientPhone: '0661 33 90 15',
    wilayaCode: 31, wilayaName: 'Oran', commune: 'Bir El Djir', address: 'Hai Khemisti, rue 12',
    deliveryCompanyId: 'wdc-1', deliveryType: 'bureau', deliveryPrice: 600,
    items: [{ offerId: 'wo-3', name: 'Bracelet Jonc Argent 925', image: SILVER_IMG('◯'), quantity: 2, unitPrice: 7068, totalPrice: 14136, metalTypeId: 'mt-argent-local', calibre: '925', form: 'bracelet', weight: 22.8 }],
    subtotal: 14136, total: 14736, isPersonalized: false,
  },
  {
    id: 'wor-3', orderNumber: 'CMD-WEB-1003', createdAt: '2026-09-04T09:48:00.000Z', status: 'in_delivery',
    clientFullName: 'Meriem Ghomri', clientPhone: '0770 12 65 38',
    wilayaCode: 19, wilayaName: 'Sétif', commune: 'El Eulma', address: 'Rue de la Gare, n°8',
    deliveryCompanyId: 'wdc-1', deliveryType: 'home', deliveryPrice: 800,
    items: [{ specialOfferId: 'wso-2', name: 'Collier Argent 925 — Promo Duo', image: SILVER_IMG('✺'), quantity: 1, unitPrice: 8900, totalPrice: 8900, metalTypeId: 'mt-argent-local', calibre: '925', form: 'necklace', weight: 34.5 }],
    subtotal: 8900, total: 9700, isPersonalized: false,
  },
  {
    id: 'wor-4', orderNumber: 'CMD-WEB-1004', createdAt: '2026-09-05T13:05:00.000Z', status: 'delivered',
    clientFullName: 'Riad Benkhelifa', clientPhone: '0555 47 82 09',
    wilayaCode: 9, wilayaName: 'Blida', commune: 'Boufarik', address: 'Cité 200 logements, Bt 12',
    deliveryCompanyId: 'wdc-2', deliveryType: 'home', deliveryPrice: 700,
    items: [{ offerId: 'wo-6', name: 'Boucles Louiza Or 18k', image: GOLD_IMG('❀'), quantity: 1, unitPrice: 156240, totalPrice: 156240, metalTypeId: 'mt-or-18k', calibre: '18k', form: 'louiza', weight: 5.6 }],
    subtotal: 156240, total: 156940, isPersonalized: false,
  },
  {
    id: 'wor-5', orderNumber: 'CMD-WEB-1005', createdAt: '2026-08-28T11:32:00.000Z', status: 'finalized',
    clientFullName: 'Sabrina Toumi', clientPhone: '0661 05 74 23',
    wilayaCode: 16, wilayaName: 'Alger', commune: 'Kouba', address: 'Rue Mohamed Belouizdad, n°44',
    deliveryCompanyId: 'wdc-1', deliveryType: 'bureau', deliveryPrice: 400,
    items: [{ offerId: 'wo-4', name: 'Parure 4 Pièces Argent', image: SILVER_IMG('✦'), quantity: 1, unitPrice: 19564, totalPrice: 19564, metalTypeId: 'mt-argent-import', calibre: '925', form: 'parure4piece', weight: 58.4 }],
    subtotal: 19564, total: 19964, isPersonalized: false,
    finalizedAt: '2026-08-31T16:00:00.000Z', storageDeducted: true,
  },
  {
    id: 'wor-6', orderNumber: 'CMD-WEB-1006', createdAt: '2026-09-06T17:20:00.000Z', status: 'pending',
    clientFullName: 'Adel Ziani', clientPhone: '0770 88 41 07',
    wilayaCode: 15, wilayaName: 'Tizi Ouzou', commune: 'Azazga', address: 'Village Ihaddaden, maison 5',
    deliveryCompanyId: 'wdc-3', deliveryType: 'home', deliveryPrice: 800,
    items: [],
    subtotal: 0, total: 800, isPersonalized: true,
    personalizedDetails: { metalType: 'Or 21k Local', calibre: '21k', form: 'necklace', maxGrams: 25, notes: 'Chaîne maille royale, longueur 50 cm' },
  },
  {
    id: 'wor-7', orderNumber: 'CMD-WEB-1007', createdAt: '2026-09-07T08:55:00.000Z', status: 'cancelled',
    clientFullName: 'Lynda Ait Kaci', clientPhone: '0551 90 33 62',
    wilayaCode: 6, wilayaName: 'Béjaïa', commune: 'Akbou', address: 'Cité Aamriw, Bt C2',
    deliveryCompanyId: 'wdc-2', deliveryType: 'bureau', deliveryPrice: 600,
    items: [{ offerId: 'wo-8', name: 'Pendentif Platine 950', image: thumb('#6E8F96', '#BFD8DC', '◆'), quantity: 1, unitPrice: 15120, totalPrice: 15120, metalTypeId: 'mt-platine-950', calibre: '950', form: 'pendentif', weight: 2.8 }],
    subtotal: 15120, total: 15720, isPersonalized: false,
    cancelledAt: '2026-09-08T10:00:00.000Z',
  },
  {
    id: 'wor-8', orderNumber: 'CMD-WEB-1008', createdAt: '2026-09-09T12:10:00.000Z', status: 'accepted',
    clientFullName: 'Yanis Hamdi', clientPhone: '0661 62 18 94',
    wilayaCode: 35, wilayaName: 'Boumerdès', commune: 'Dellys', address: 'Rue du Port, n°3',
    deliveryCompanyId: 'wdc-3', deliveryType: 'home', deliveryPrice: 750,
    items: [{ offerId: 'wo-7', name: 'Parure Plaqué Or (pièce)', image: thumb('#C08A4E', '#F0C88C', '✧'), quantity: 3, unitPrice: 6500, totalPrice: 19500, metalTypeId: 'mt-plaque-piece', form: 'parure4piece' }],
    subtotal: 19500, total: 20250, isPersonalized: false,
  },
];

/** Everything the AppContext seeds itself with, in one bundle. */
export const DEMO_DATASET = {
  metalCategories: DEMO_METAL_CATEGORIES,
  metalTypes: DEMO_METAL_TYPES,
  shapes: DEMO_SHAPES,
  suppliers: DEMO_SUPPLIERS,
  workshops: DEMO_WORKSHOPS,
  deliveries: DEMO_DELIVERIES,
  workers: DEMO_WORKERS,
  workerAdvances: DEMO_WORKER_ADVANCES,
  workerAbsences: DEMO_WORKER_ABSENCES,
  workerPayments: DEMO_WORKER_PAYMENTS,
  purchases: DEMO_PURCHASES,
  sales: DEMO_SALES,
  commands: DEMO_COMMANDS,
  cassiePurchases: DEMO_CASSIE_PURCHASES,
  meltings: DEMO_MELTINGS,
  clients: DEMO_CLIENTS,
  replacements: DEMO_REPLACEMENTS,
  storeExpenses: DEMO_STORE_EXPENSES,
  debts: DEMO_DEBTS,
  debtPayments: DEMO_DEBT_PAYMENTS,
  settings: DEMO_SETTINGS,
  minimalWeight: DEMO_MINIMAL_WEIGHT,
  webOffers: DEMO_WEB_OFFERS,
  webSpecialOffers: DEMO_WEB_SPECIAL_OFFERS,
  webDeliveryCompanies: DEMO_WEB_DELIVERY_COMPANIES,
  webContacts: DEMO_WEB_CONTACTS,
  webOrders: DEMO_WEB_ORDERS,
};
