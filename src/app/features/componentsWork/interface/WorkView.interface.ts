import { Address } from "./Address.interface";

export interface WorkView {
    id: number,
    nameWork: string,
    startWork: Date,
    finalWork: Date,
    grossValue: number,
    liquidValue: number,
    address: Address
}