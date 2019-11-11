
export interface IProduct {
  id: number;
  name: string;
  code: string;
  extCode: string;
  extGroup: string;
  longName: string;
  visibility: boolean;
  editability: boolean;
  type: EProductType;
  description: string;
}

export enum EProductType {
  ProductType1 = 1,
  ProductType2 = 2,
  ProductType3 = 3,
}
