import { Component, Signal, computed, inject, signal } from '@angular/core';
import { InputCustomComponent } from '../../../core-layout/input-custom/input-custom.component';
import { DialogComponent } from "../../../core-layout/dialog/dialog.component";
import { LayoutPageMainComponent } from '../../../core-layout/layout/layout-page-main/layout-page-main.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServiceRole } from '../serviceRole/service-role.service';
import { Role } from '../interface/Role.interface';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { startWith, switchMap } from 'rxjs';
import { Pageable } from '../../../core-layout/paginator/interface/pageable.interface';
import { PaginatorComponent } from '../../../core-layout/paginator/paginator.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-list-role',
  standalone: true,
  imports: [InputCustomComponent, DialogComponent, LayoutPageMainComponent, ReactiveFormsModule, PaginatorComponent, CurrencyPipe],
  templateUrl: './list-role.component.html',
  styleUrl: './list-role.component.scss'
})
export class ListRoleComponent {

  #serviceRole = inject(ServiceRole);

  //List Role
  
  numberPage = signal(0);
  searchL = signal("");
  refreshTrigger = signal(0);
  idLessonSelected = signal<number | null>(null);
  //Cria um observable reativo para buscar as lessons sempre que `numberPage`, `searchL` ou `refreshTrigger` mudarem
  private roleList$ = toObservable(
    computed(() => ({
      //A lista vai ser recarregada sempre que mudar o valor do signal
      page: this.numberPage(),
      search: this.searchL(),
      refresh: this.refreshTrigger()
    }))
  ).pipe(
    //switchMap cancela requisições anteriores quando um novo valor chega
    switchMap(({ page, search }) => 
      this.#serviceRole.httpListRole(page, search).pipe(startWith(undefined))
    )
  );

  // Converte o Observable para Signal
  getListRole: Signal<Pageable<Role> | undefined> = toSignal(this.roleList$);

  //page
  handlePageEvent(pageNumber: number) {
    this.numberPage.set(pageNumber);
  }

  // Register Role
  buttonSubmit = signal("Cadastrar");
  #fbRole = inject(FormBuilder);
  
  public roleForm: FormGroup = this.#fbRole.group({
    id: [],
    nameRole: [],
    monthlyPayment: [],
    dailyPayment: []
  })

  getControl(name: string) {
    return this.roleForm.get(name) as FormControl;
  }

  submitCreateRole() {
    
    if(this.buttonSubmit() === "Salvar") {
      console.log(this.roleForm.value)
      this.#serviceRole.httpCreateRole(this.roleForm.value as Role).subscribe(res => console.log(res));
    } else {
      this.#serviceRole.httpCreateRole(this.roleForm.value as Role).subscribe(res => console.log(res));
    }
  }

}
