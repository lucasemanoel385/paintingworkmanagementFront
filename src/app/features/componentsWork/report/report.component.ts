import { Component, inject, signal } from '@angular/core';
import { ServiceReport } from './service-report.service';
import { ReportAllWork } from './interface/ReportAllWork.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

  #serviceReport = inject(ServiceReport);

  viewAllReport$!: ReportAllWork; 
  
  startDate = signal<string | null>(null);

  finalDate = signal<string | null>(null);

  searchReportForDate() {
    this.#serviceReport.httpGetAllReportWorks(this.startDate() as string, this.finalDate() as string).subscribe(res => this.viewAllReport$ = res);
  }
}
