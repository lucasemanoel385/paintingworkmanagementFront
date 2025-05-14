import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-custom',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-custom.component.html',
  styleUrl: './input-custom.component.scss'
})
export class InputCustomComponent {

  @Input() labelInput?: string;
  @Input() placeholder?: string;
  @Input() type?:'text' | 'password' | 'email' | 'number' | 'date';
  @Input() autocomplete?: string;
  @Input() control: FormControl = new FormControl();
  @Input() required? = false;
  @Output() public outputSearch = new EventEmitter<string>();

  public emitSearch(search: string): any {
    
    this.outputSearch.emit(search);
  }

}
