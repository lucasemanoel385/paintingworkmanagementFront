import { Address } from "./Address.interface";

export interface Work {
    id: number,
    nameWork: string,
    startWork: Date,
    finalWork: Date,
    grossValue: number,
    liquidValue: number,
    city: string,
    street: string,
    district: string,
    number: string,
    cep: string
}