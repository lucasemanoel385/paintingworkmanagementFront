import { Component } from '@angular/core';
import { InputCustomComponent } from '../../../core-layout/input-custom/input-custom.component';
import { LayoutPageMainComponent } from '../../../core-layout/layout/layout-page-main/layout-page-main.component';
import { DialogComponent } from '../../../core-layout/dialog/dialog.component';

@Component({
  selector: 'app-list-presence',
  standalone: true,
  imports: [LayoutPageMainComponent, DialogComponent, InputCustomComponent],
  templateUrl: './list-presence.component.html',
  styleUrl: './list-presence.component.scss'
})
export class ListPresenceComponent {

}
