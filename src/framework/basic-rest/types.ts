import { QueryKey } from 'react-query';

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
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  children?: [Category];
  products?: Product[];
  productCount?: number;
  [key: string]: unknown;
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
  Description: string;
  Image: string;
  Name: string;
  SlideID: string;
  Status: string;
  Type: string;
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
  Address: string;
  Balance: string;
  BranchName: string;
  Category: string;
  ContactDesignation: string;
  ContactPerson: string;
  District: string;
  Due: string;
  Email: string;
  FollowedStores: string;
  GivenOffers: string;
  MerchantID: string;
  Mperson: string;
  Name: string;
  Paid: string;
  Password: string;
  Phone: string;
  ProfileImage: string;
  Reference: string;
  ReqDate: string;
  Status: string;
  Upazila: string;
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
  address1: string;
  address2: string;
  address3: string;
  address4: string;
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