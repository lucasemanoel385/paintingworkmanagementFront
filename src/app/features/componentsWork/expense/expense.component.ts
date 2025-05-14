import { Component, Input, inject } from '@angular/core';
import { ServiceExpense } from './service-expense.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InputCustomComponent } from '../../../core-layout/input-custom/input-custom.component';
import { DialogComponent } from '../../../core-layout/dialog/dialog.component';
import { Expense } from './interface/Expense.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [InputCustomComponent, DialogComponent, CommonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {

  @Input() workId!: number | null;

  #serviceExpense = inject(ServiceExpense);
  #router = inject(ActivatedRoute);

  listExpense$!:Expense[];

  constructor() {

    if(this.#router.snapshot.params['id']) {
      this.#serviceExpense.httpListExpenseByWorkId(this.#router.snapshot.params['id'] ?? null).subscribe(res => this.listExpense$ = res);
    }
    
  }

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

  submitRegisterExpense() {
    this.formExpense.patchValue({
      workId: this.workId
    })
    this.#serviceExpense.httpCreateExpense(this.formExpense.value as Expense).subscribe();
  }

  //DeleteExpense

  idDeleteExpense!: number;

  deleteExpenseByid() {
    console.log(this.idDeleteExpense);
  }

}
