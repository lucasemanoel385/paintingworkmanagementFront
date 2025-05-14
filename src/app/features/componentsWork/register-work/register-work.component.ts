import { Address } from './../interface/Address.interface';
import { Component, OnChanges, OnInit, SimpleChanges, effect, inject, signal } from '@angular/core';
import { InputCustomComponent } from '../../../core-layout/input-custom/input-custom.component';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServiceWork } from '../serviceWork/service-work.service';
import { Work } from '../interface/Work.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkView } from '../interface/WorkView.interface';
import { DialogComponent } from '../../../core-layout/dialog/dialog.component';
import { RegisterExtraWork } from '../../componentsExtraWork/interface/RegisterExtraWork.interface';
import { Employee } from '../interface/Employee.interface';
import { ServiceEmployee } from '../../componentsEmployee/serviceEmployee/service-employee.service';
import { ServicePresence } from '../../componentsPresence/servicePresence/service-presence.service';
import { ServiceExtraWork } from '../../componentsExtraWork/serviceExtraWork/service-extra-work.service';
import { formatDate } from '@angular/common';
import { RegisterDiversPresence } from '../../componentsPresence/interface/RegisterDiversPresence.interface';
import { RevenueComponent } from '../revenue/revenue.component';
import { ExpenseComponent } from '../expense/expense.component';
import { PaymentEmployee } from '../interface/PaymentEmployee.interface';
import { WorkReportComponent } from '../work-report/work-report.component';

@Component({
  selector: 'app-register-work',
  standalone: true,
  imports: [InputCustomComponent, CdkDropList, CdkDrag, ReactiveFormsModule, DialogComponent, RevenueComponent, ExpenseComponent, WorkReportComponent],
  templateUrl: './register-work.component.html',
  styleUrl: './register-work.component.scss'
})
export class RegisterWorkComponent {

  #router = inject(ActivatedRoute);
  #route = inject(Router);
  #serviceWork = inject(ServiceWork);
  #serviceEmployee = inject(ServiceEmployee);
  #servicePresence = inject(ServicePresence);
  #serviceExtraWork = inject(ServiceExtraWork);

  idEdit = signal<number | null>(null);
  buttonSubmit = signal("Cadastrar");

  public today = signal(formatDate(Date.now(), 'yyyy-MM-dd', 'pt-BR'));
  public changeDay(value: string) {
    this.today.set(value);
    this.#serviceExtraWork.httpListExtraWorkByDate(this.idEdit() as number, this.today()).subscribe(res => this.employeeExtraWork = res);
    this.#servicePresence.httpListPresenceByDate(this.idEdit() as number, this.today()).subscribe(res => this.employeePresence = res);
  }


  #fbWork = inject(FormBuilder);

  public formWork: FormGroup = this.#fbWork.group({
    id: [],
    nameWork: [],
    startWork: [],
    finalWork: [],
    grossValue: [],
    liquidValue: [],
    city: [],
    street: [],
    district: [],
    number: [],
    cep: []
  })

  getControl(name: string) {
    return this.formWork.get(name) as FormControl;
  }

  submitCreateWork() {
    
    if(this.buttonSubmit() === "Salvar") {
      console.log(this.formWork.value)
      this.#serviceWork.httpUpdateWork(this.formWork.value as Work).subscribe(res => this.#route.navigate(['/work/', res.id]));
    } else {
      this.#serviceWork.httpCreateWork(this.formWork.value as Work).subscribe(res => this.#route.navigate(['../work/', res.id]));
    }
  }

  constructor() {

    if(this.#router.snapshot.params['id']) {
      this.idEdit.set(this.#router.snapshot.params['id']);
      this.#serviceEmployee.httpListEmployee().subscribe(res => this.employee = res.content);
      this.#serviceExtraWork.httpListExtraWorkByDate(this.idEdit() as number, this.today()).subscribe(res => this.employeeExtraWork = res);
      this.#servicePresence.httpListPresenceByDate(this.idEdit() as number, this.today()).subscribe(res => this.employeePresence = res);
    }

    effect(() => {
      const id = this.idEdit();
      if (id) {
        this.#serviceWork.httpWorkById(id).subscribe(res => this.editWork(res));
      }
      //this.#serviceWork.httpListCourseByParam(this.searchCourse()).subscribe(res => this.getListCoursesFilter.set(res))
    });
  }

  editWork(work: WorkView) {
    this.formWork.patchValue({
      id: work.id,
      nameWork: work.nameWork,
      startWork: work.startWork,
      finalWork: work.finalWork,
      grossValue: work.grossValue,
      city: work.address.city,
      street: work.address.street,
      district: work.address.district,
      number: work.address.number,
      cep: work.address.cep
    })
    this.buttonSubmit.set("Salvar")
  };

  public formPaymentEmployee: FormGroup = this.#fbWork.group({
    descriptionPayment: [],
    startDate: [],
    finalDate: [],
    workId: []
  });

  getControlPaymentEmployee(name: string) {
    return this.formPaymentEmployee.get(name) as FormControl;
  }

  submitPaymentEmployeeAll() {
    this.formPaymentEmployee.patchValue({
      workId: this.idEdit()
    })
    this.#serviceWork.httpPaymentEmployeeAll(this.formPaymentEmployee.value as PaymentEmployee).subscribe();
  }

  //Arrasta e solva (Ha resolver)
  employeeExtraWork: Employee[] = [
  ];

  employeePresence: Employee[] = [
  ];

  employee: Employee[] = [
  ];
  
  drop(event: CdkDragDrop<Employee[]>) {

    //PreviousContainer(de onde veio)
    const item = event.previousContainer.data[event.previousIndex];
  
    //Verifica se o item foi solto na mesmta lista
    if (event.previousContainer === event.container) {
      //Se da mesma lista, move de acordo como foi arrastado
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      //Arrastado para outro container
    } else {
      //Id foi colocada na tag div para identificacao dos containers
      //Pega a id do container destino
      const destino = event.container.id;
       //Pega a id do container origem
      const origem = event.previousContainer.id;
  
      //Dados do container, exemplo a lista, array,etc...
      const destinoData = event.container.data;
      const origemData = event.previousContainer.data;
  
      // Se está indo da lista de funcionários para uma das listas (presença ou extra)
      if (origem === 'employeeList' && (destino === 'employeePresenceList' || destino === 'extraWorkList')) {
        //Verifica se existe o id na lista destino
        const jaExiste = destinoData.some(e => e.employeeId === item.employeeId);
        if (!jaExiste) {
          //Splice inseri no container destino o objeto
          //event.currenIndex e o index dentro do array de onde ele foi solto
          destinoData.splice(event.currentIndex, 0, item);
        }
      }
  
      // Se está voltando de presença ou extra para a lista de funcionários
      if ((origem === 'employeePresenceList' || origem === 'extraWorkList') && destino === 'employeeList') {
        const index = origemData.findIndex(e => e.employeeId === item.employeeId);
        if (index > -1) {
          //Remove o item do container origem
          origemData.splice(index, 1);
        }
      }
    }
  }
  //Arrasta e solva (Ha resolver)

  //Extra work save

  public formExtraWork: FormGroup = this.#fbWork.group({
    id: [],
    descriptionExtraWork: [],
    dateExtraWork: [],
    paymentExtraWork: [],
    employeeId: [],
    workId: []
  });

  getControlExtraWork(name: string) {
    return this.formExtraWork.get(name) as FormControl;
  }

  submitRegisterExtraWork(modalSaveExtraWork: DialogComponent) {
    this.formExtraWork.patchValue({
      employeeId: this.employeeExtraWork.map(emp => emp.employeeId),
      workId: this.idEdit()
    });
    console.log(this.formExtraWork.value)
    this.#serviceExtraWork.httpSaveListExtraWork(this.formExtraWork.value as RegisterExtraWork).subscribe(res => modalSaveExtraWork.close())
  }

  //Presence save
  public formPresence: FormGroup = this.#fbWork.group({
    id: [],
    dayPresence: [],
    employeeId: [this.employeePresence.map(emp => emp.employeeId)],
    workId: [this.idEdit()]
  });

  getControlPresence(name: string) {
    return this.formPresence.get(name) as FormControl;
  }

  submitRegisterPresence(modalSavePresence: DialogComponent) {
    this.formPresence.patchValue({
      employeeId: this.employeePresence.map(emp => emp.employeeId),
      workId: this.idEdit()
    });
    this.#servicePresence.httpCreateDiversPresence(this.formPresence.value as RegisterDiversPresence).subscribe(res => modalSavePresence.close());
  }

  //Deletes 

  IdDeleteDialog!: number;

  deleteEmployeeOfExtraWork(modalDeleteExtraWork: DialogComponent) {
    this.#serviceExtraWork.httpDeleteExtraWork(this.IdDeleteDialog).subscribe(res => modalDeleteExtraWork.close());
  }

  deleteEmployeeOfPresence(modalDeletePresence: DialogComponent) {
    this.#servicePresence.httpDeletePresence(this.IdDeleteDialog).subscribe(res => modalDeletePresence.close());
  }

}