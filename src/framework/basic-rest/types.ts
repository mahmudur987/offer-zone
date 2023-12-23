import { QueryKey } from "react-query";
export type CompanyData = {
  id: number;
  short_name: string;
  company_name: string;
  description: string;
  com_logo: string;
  favicon_icon: string;
  welcome_message: string;
  about_us: string;
  background_img: string;
  background_alt_tag: string;
  image1: string;
  image1_alt_tag: string;
  image2: string;
  image2_alt_tag: string;
  image3: string;
  image3_alt_tag: string;
  email1: string | null;
  email2: string | null;
  website: string | null;
  phone1: string | null;
  phone2: string | null;
  mobile1: string | null;
  mobile2: string | null;
  address: string;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  youtube: string | null;
  glg_map: string;
  created_at: string;
  updated_at: string;
  api_key: string | null;
  status: boolean;
  created_by: string | null;
  updated_by: string | null;
};

export type NewProduct = {
  id: number;
  merchant_name: string;
  product_slider: []; // Assuming product_slider is an array of image URLs
  name: string;
  code: string;
  image: string;
  price: number;
  compare_price: number;
  quantity: number;
  description: string;
  add_date: string;
  stock_status: string;
  ordering: number;
  status: boolean;
  meta_description: string;
  meta_keywords: string;
  meta_title: string;
  category: number;
  sub_category: number;
  merchant: string;
  uom: any; //
};

export type SuperOffer = {
  id: number;
  title: string;
  link: string;
  image: string;
  ordering: number;
  status: boolean;
  // Additional properties for the first data structure
  provider?: string;
  partner_name?: string | null;
  restaurant_name?: string | null;
  location?: string | null;
  description?: string;
  add_date?: string;
  expaired_at?: string | null;
  meta_description?: string;
  meta_keywords?: string;
  meta_title?: string;
};
export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type QueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};
export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};
export type Category = {
  id: number;
  total_products: number;
  status: boolean;
  name: string;
  short_name: string | null;
  image: string | null;
  created_by: string | null;
};
export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Brand = {
  id: number | string;
  name: string;
  slug: string;
  image?: Attachment;
  [key: string]: unknown;
};
export type Dietary = {
  id: number | string;
  name: string;
  slug: string;
  [key: string]: unknown;
};
export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};
export type Product = {
  id: number | string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  sold: number;
  unit: string;
  sale_price?: number;
  min_price?: number;
  max_price?: number;
  image: Attachment;
  sku?: string;
  gallery?: Attachment[];
  category?: Category;
  tag?: Tag[];
  meta?: any[];
  brand?: Brand;
  description?: string;
  variations?: object;
  [key: string]: unknown;
};
export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};
export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};

export type ShopsQueryOptionsType = {
  text?: string;
  shop?: Shop;
  status?: string;
  limit?: number;
};

export type Shop = {
  id: string | number;
  owner_id: string | number;
  owner_name: string;
  address: string;
  phone: string;
  website: string;
  ratings: string;
  name: string;
  slug: string;
  description: string;
  cover_image: Attachment;
  logo: Attachment;
  socialShare: any;
  created_at: string;
  updated_at: string;
};

export type Slide = {
  id: number;
  title: string;
  link: string;
  image: string;
  ordering: number;
  status: boolean;
};

export interface Offer {
  Availed?: number;
  Category?: string;
  Liked?: string;
  MerchantID?: string;
  Name?: string;
  OfferDescription?: string;
  OfferEnds?: string;
  OfferID?: string;
  OfferImage1?: string;
  OfferImage2?: string;
  OfferImage3?: string;
  OfferStarts?: string;
  OfferzoneDiscount?: string;
  Price: string;
  RegularDiscount: string;
  ReqDate?: string;
  SellEnabled?: string;
  Status?: string;
  Type?: string;
}

export interface Merchant {
  id: string;
  name: string;
  address: string;
  website: string | null;
  branch: string | null;
  phone_number: string;
  contact_designation: string | null;
  contact_person: string | null;
  division: string;
  district: string;
  upazila: string;
  photo: string | any;
  email: string | null;
}

export interface MemberFormValues {
  membername: string;
  memberemail: string;
  memberphone: string;
  memberphone2: string;
  memberprofession: string;
  memberdob: string;
  memberref: string;
  memberaddress: string;
  memberdistrict: string;
  memberupazilla: string;
  paymentmethod: string;
  trxid: string;
  memberimage: FileList;
}
export interface MemberSignUpInputType extends MemberFormValues {
  memberbalance: string;
  validTill: string;
  membership: string;
  followedStores: string;
  memberpassword: string;
  status: string;
}

export interface AgentFormValues {
  agentname: string;
  agentemail: string;
  agentphone: string;
  companyname: string;
  companycategory: string;
  branchname: string;
  brancecontactperson: string;
  contactdesignation: string;
  agentrefer: string;
  agentaddress: string;
  agentdistrict: string;
  agentupazilla: string;
  agentimage?: FileList;
}
export interface AgentSignUpInputType extends AgentFormValues {
  agentbalance: string;
  followedStores: string;
  agentpassword: string;
  status: string;
  givenoffers: string;
  due: string;
  paid: string;
}

export interface CheckoutFormValues {
  name: string;
  phone: string;
  email: string;
  streetAddress: string;
  area: string;
  city: string;
  postalCode: string;
  del_method: string;
  total: number;
  pay_method: string;
  trx_id: string;
}

export type ShopDetails = {
  title: string;
  address: string;
  branch_name: string;
  category: string;
  store_contact_designation: string;
  store_contact_email: string;
  store_contact_person: string;
  store_contact_phone: string;
  store_district: string;
  store_upazilla: string;
  merchcant_id: string;
};
