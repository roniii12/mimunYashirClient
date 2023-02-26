export interface PackageModel {
    id: number;
    name: string;
    packageType: PackageType;
    quantity: number;
    usage: number;
}

export enum PackageType {
    Complete,
    Basic
}