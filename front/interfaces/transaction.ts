import type {Category} from "~/interfaces/categories";

export interface TransactionApi {
  id: string;
  type: string;
  amount: number;
  description: string;
  date: string;
  recurrent: boolean;
  userId: string;
  categoryId: string;
  category: Category
}

export interface Transaction {
  id?: string;
  type: string;
  amount: number;
  description: string;
  date: string;
  recurrent: boolean;
  userId?: string;
  categoryId: string;
  category: Category
}

export interface TransactionBody {
  type: string;
  amount: number;
  description: string;
  date: string;
  recurrent: boolean;
  categoryId: string;
}
