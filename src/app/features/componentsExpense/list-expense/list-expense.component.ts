import { Component, Signal, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from '../../../core-layout/dialog/dialog.component';
import { InputCustomComponent } from '../../../core-layout/input-custom/input-custom.component';
import { LayoutPageMainComponent } from '../../../core-layout/layout/layout-page-main/layout-page-main.component';
import { ServiceExpense } from '../../componentsWork/expense/service-expense.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, startWith } from 'rxjs';
import { Pageable } from '../../../core-layout/paginator/interface/pageable.interface';
import { Employee } from '../../componentsWork/interface/Employee.interface';
import { Expense } from '../../componentsWork/expense/interface/Expense.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-expense',
  standalone: true,
  imports: [LayoutPageMainComponent, DialogComponent, InputCustomComponent, ReactiveFormsModule, DatePipe, CurrencyPipe],
  templateUrl: './list-expense.component.html',
  styleUrl: './list-expense.component.scss'
})
export class ListExpenseComponent {

  #serviceExpense = inject(ServiceExpense);

  numberPage = signal(0);
  searchL = signal("");
  refreshTrigger = signal(0);
  idEmployeeSelected = signal<number | null>(null);
  //Cria um observable reativo para buscar as lessons sempre que `numberPage`, `searchL` ou `refreshTrigger` mudarem
  private expenseList$ = toObservable(
    computed(() => ({
      //A lista vai ser recarregada sempre que mudar o valor do signal
      page: this.numberPage(),
      search: this.searchL(),
      refresh: this.refreshTrigger()
    }))
  ).pipe(
    //switchMap cancela requisições anteriores quando um novo valor chega
    switchMap(({ page, search }) => 
      this.#serviceExpense.httpListExpense(page, search).pipe(startWith(undefined))
    )
  );

  // Converte o Observable para Signal
  getListExpense: Signal<Pageable<Expense> | undefined> = toSignal(this.expenseList$);

  #fbExpense = inject(FormBuilder);

  formExpense: FormGroup = this.#fbExpense.group({
    id: [],
    descriptionExpenses: [],
    valueExpenses: [],
    dateExpense: [],
    workId: []
  });

  getControl(name: string) {
    return this.formExpense.get(name) as FormControl;
  }

  submitCreateExpense(modalAdd: DialogComponent) {
    this.#serviceExpense.httpCreateExpense(this.formExpense.value as Expense).subscribe(res =>{
      this.refreshTrigger.set(this.refreshTrigger() + 1);
    });
  }

}
