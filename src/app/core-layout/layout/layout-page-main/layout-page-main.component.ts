import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { InputCustomComponent } from '../../input-custom/input-custom.component';

@Component({
  selector: 'app-layout-page-main',
  standalone: true,
  imports: [InputCustomComponent],
  templateUrl: './layout-page-main.component.html',
  styleUrl: './layout-page-main.component.scss'
})
export class LayoutPageMainComponent {

  @Input() title!: string;

  @Input() labelInput!: string;

  @Input() placeHolderInput!: string;

  @Input() nameRegister!: string;

  @Output() public outPutAddRole = new EventEmitter();

  @Output() public searchInput = new EventEmitter();

  contentInputSearch = signal<string | null>(null);

  public emitInput(): any {
    
    this.outPutAddRole.emit();
  }

  public emitSearch(): any {

    this.searchInput.emit(this.contentInputSearch());
  }
}
