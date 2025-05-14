import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, signal } from '@angular/core';
import { Paginator } from './interface/paginator.interface';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent implements OnChanges{

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.getRangeLabel(changes['pageable'].currentValue['totalPages'], 
      changes['pageable'].currentValue['totalElements'], changes['pageable'].currentValue['pageSize'], changes['pageable'].currentValue['pageNumber']);
    }, 50)

  }

  @Input() pageable!: Paginator | undefined;
  @Output() nextPageOutPut = new EventEmitter<number>();
  @Output() previousPageOutPut= new EventEmitter<number>();

  checkDisabledPreviousPage() {
    return (this.pageable?.pageNumber as number > 0) ? false : true;
  }

  checkDisabledNextPage() {
    return ((this.pageable?.pageNumber as number + 1)  === this.pageable?.totalPages) ? true : false;
  }
  
  nextPage() {

    if(!((this.pageable?.pageNumber as number + 1) === this.pageable?.totalPages)) {
      this.nextPageOutPut.emit(this.pageable?.pageNumber as number + 1);
      this.checkDisabledPreviousPage();
      this.checkDisabledNextPage();
    }
  }

  previousPage() {
    if(this.pageable?.pageNumber as number > 0) {
      this.previousPageOutPut.emit(this.pageable?.pageNumber as number - 1);
      this.checkDisabledNextPage();
    }
  }

  rangePage = signal<string | null>(null);

  private getRangeLabel(totalPages: number, totalElements: number, size: number, number: number) {
    if(totalPages === 0) {
      this.rangePage.set("Página 1 de 1")
    } else {
      const amountPages = Math.ceil(totalElements / size);
      this.rangePage.set(`Página ${number + 1} de ${amountPages}`);
    }

  }

}