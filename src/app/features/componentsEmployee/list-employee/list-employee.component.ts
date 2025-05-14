import { Component, Signal, computed, inject, signal } from '@angular/core';
import { LayoutPageMainComponent } from '../../../core-layout/layout/layout-page-main/layout-page-main.component';
import { DialogComponent } from '../../../core-layout/dialog/dialog.component';
import { InputCustomComponent } from '../../../core-layout/input-custom/input-custom.component';
import { ServiceEmployee } from '../serviceEmployee/service-employee.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { startWith, switchMap } from 'rxjs';
import { Pageable } from '../../../core-layout/paginator/interface/pageable.interface';
import { Employee } from '../interface/Employee.interface';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [LayoutPageMainComponent, DialogComponent, InputCustomComponent, ReactiveFormsModule],
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.scss'
})
export class ListEmployeeComponent {

  #serviceEmployee = inject(ServiceEmployee);

  //List Role
  
  numberPage = signal(0);
  searchL = signal("");
  refreshTrigger = signal(0);
  idEmployeeSelected = signal<number | null>(null);
  //Cria um observable reativo para buscar as lessons sempre que `numberPage`, `searchL` ou `refreshTrigger` mudarem
  private employeeList$ = toObservable(
    computed(() => ({
      //A lista vai ser recarregada sempre que mudar o valor do signal
      page: this.numberPage(),
      search: this.searchL(),
      refresh: this.refreshTrigger()
    }))
  ).pipe(
    //switchMap cancela requisições anteriores quando um novo valor chega
    switchMap(({ page, search }) => 
      this.#serviceEmployee.httpListEmployee(page, search).pipe(startWith(undefined))
    )
  );

  // Converte o Observable para Signal
  getListEmployee: Signal<Pageable<Employee> | undefined> = toSignal(this.employeeList$);

  //page
  handlePageEvent(pageNumber: number) {
    this.numberPage.set(pageNumber);
  }

  // Register Role
  buttonSubmit = signal("Cadastrar");
  #fbEmployee = inject(FormBuilder);
  
  public employeeForm: FormGroup = this.#fbEmployee.group({
    id: [],
    nameEmployee: [],
    roleId: []
  })

  getControl(name: string) {
    return this.employeeForm.get(name) as FormControl;
  }

  submitCreateEmployee() {
    
    if(this.buttonSubmit() === "Salvar") {
      console.log(this.employeeForm.value)
      this.#serviceEmployee.httpCreateEmployee(this.employeeForm.value as Employee).subscribe(res => this.refreshTrigger.set(this.refreshTrigger() + 1));
    } else {
      this.#serviceEmployee.httpCreateEmployee(this.employeeForm.value as Employee).subscribe(res => this.refreshTrigger.set(this.refreshTrigger() + 1));
    }
  }


}
