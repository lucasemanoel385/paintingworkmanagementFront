import { Component, Input, inject } from '@angular/core';
import { DialogComponent } from '../../../core-layout/dialog/dialog.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputCustomComponent } from '../../../core-layout/input-custom/input-custom.component';
import { ServiceRevenue } from './service-revenue.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Revenue } from './interface/Revenue.interface';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [DialogComponent, ReactiveFormsModule, InputCustomComponent, CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss'
})
export class RevenueComponent {

  @Input() workId!: number | null;

  #serviceRevenue = inject(ServiceRevenue);
  #router = inject(ActivatedRoute);

  listRevenue$!:Revenue[];

  constructor() {
    if(this.#router.snapshot.params['id']) {
      this.#serviceRevenue.httpListRevenueByWorkId$(this.#router.snapshot.params['id'] ?? null).subscribe(res => this.listRevenue$ = res);
    }
  
  }

  #fbRevenue = inject(FormBuilder);

  formRevenue: FormGroup = this.#fbRevenue.group({
    id: [],
    descriptionRevenue: [],
    valueEntry: [],
    dateRevenue: [],
    workId: []
  });

  getControl(name: string) {
    return this.formRevenue.get(name) as FormControl;
  }

  submitRegisterRevenue() {
    this.formRevenue.patchValue({
      workId: this.workId
    })
    this.#serviceRevenue.httpCreateRevenue(this.formRevenue.value as Revenue).subscribe();
  }

  //DeleteRevenue

  idDeleteRevenue!: number;

  deleteRevenue() {
    console.log(this.idDeleteRevenue);
  }
}
