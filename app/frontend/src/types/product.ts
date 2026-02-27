export interface ProductSpec {
  label?: string;
  value: string;
}

export interface ProductSpecDetail {
  icon: string;
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  color: string;
  quality: string;
  origin: string;
  image?: string;
  searchCode?: string;
  unitType?: string;
  units?: number;
  box?: string;
  tags?: string[];
  pack?: number;
  bunches?: number;
  quantity?: number;
  companyProductId?: number;
  specs?: ProductSpec[];
  detailSpecs?: ProductSpecDetail[];
}
