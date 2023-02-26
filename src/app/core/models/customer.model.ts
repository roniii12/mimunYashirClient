import { ContractModel } from "./contract.model";

export interface CustomerModel {
    id: string;
    firstName: string | null;
    lastName: string | null;
    city: string | null;
    street: string | null;
    apartment: string | null;
    zip: string | null;
    contracts: ContractModel[];
}