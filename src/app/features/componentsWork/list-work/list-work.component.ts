import { Component, Signal, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from '../../../core-layout/dialog/dialog.component';
import { InputCustomComponent } from '../../../core-layout/input-custom/input-custom.component';
import { LayoutPageMainComponent } from '../../../core-layout/layout/layout-page-main/layout-page-main.component';
import { PaginatorComponent } from '../../../core-layout/paginator/paginator.component';
import { ServiceWork } from '../serviceWork/service-work.service';
import { CommonModule, DatePipe } from '@angular/common';
import { startWith, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Pageable } from '../../../core-layout/paginator/interface/pageable.interface';
import { Work } from '../interface/Work.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-work',
  standalone: true,
  imports: [InputCustomComponent, LayoutPageMainComponent, ReactiveFormsModule, PaginatorComponent, CommonModule, RouterLink, DatePipe],
  templateUrl: './list-work.component.html',
  styleUrl: './list-work.component.scss'
})
export class ListWorkComponent {

  #serviceWork = inject(ServiceWork);

  #router = inject(Router);

  numberPage = signal(0);
  searchL = signal("");
  refreshTrigger = signal(0);
  idLessonSelected = signal<number | null>(null);
  //Cria um observable reativo para buscar as lessons sempre que `numberPage`, `searchL` ou `refreshTrigger` mudarem
  private workList$ = toObservable(
    computed(() => ({
      //A lista vai ser recarregada sempre que mudar o valor do signal
      page: this.numberPage(),
      search: this.searchL(),
      refresh: this.refreshTrigger()
    }))
  ).pipe(
    //switchMap cancela requisições anteriores quando um novo valor chega
    switchMap(({ page, search }) => 
      this.#serviceWork.httpListWork(page, search).pipe(startWith(undefined))
    )
  );

  // Converte o Observable para Signal
  getListWork: Signal<Pageable<Work> | undefined> = toSignal(this.workList$);

  navCreateWork(){
    this.#router.navigate(['/register-work'])
  }

}
