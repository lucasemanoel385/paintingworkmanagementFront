import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { DialogComponent } from '../../../core-layout/dialog/dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputCustomComponent } from '../../../core-layout/input-custom/input-custom.component';
import { ServiceWork } from '../serviceWork/service-work.service';
import { Observable } from 'rxjs';
import { ReportByWorkId } from './ReportByWorkId.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-report',
  standalone: true,
  imports: [DialogComponent, ReactiveFormsModule, InputCustomComponent, CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './work-report.component.html',
  styleUrl: './work-report.component.scss'
})
export class WorkReportComponent {

  @Input() workId!: number | null;

  #serviceWork = inject(ServiceWork);

  #router = inject(ActivatedRoute);

  reportViewWorkId$!: ReportByWorkId; 
  
  constructor() {
    if(this.#router.snapshot.params['id']) {
      this.#serviceWork.httpReportByWorkId$(this.#router.snapshot.params['id'] ?? null).subscribe(res => this.reportViewWorkId$ = res);
    }
    
  }

}
