import { PackageModel } from "./package.model";

export interface ContractModel {
    id: string;
    name: string;
    type: ContractType;
    packages: PackageModel[];
}

export enum ContractType {
    Basic,
    Premium
}