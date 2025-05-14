import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild, inject, signal } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    if (!this.dialog) {
      console.error("O elemento <dialog> não foi encontrado.");
    }
  }

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
  @Input() title!: string;
  @Input() description!: string;

  open() {
    if (this.dialog) {
      this.dialog.nativeElement.showModal(); // Abre o diálogo
      console.log("abriu")
    }
  }

  close() {
    if (this.dialog) {
      this.dialog.nativeElement.close(); // Fecha o diálogo
    }
  }

}
