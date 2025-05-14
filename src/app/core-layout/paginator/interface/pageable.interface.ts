import { Paginator } from "./paginator.interface";

export interface Pageable<T>{
    content: T[],
    page: Paginator
}