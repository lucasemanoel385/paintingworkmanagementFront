import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideComponent } from '../../core-layout/layout/aside/aside.component';
import { RegisterWorkComponent } from '../../features/componentsWork/register-work/register-work.component';
import { ListRoleComponent } from '../../features/componentsRole/list-role/list-role.component';
import { ListEmployeeComponent } from '../../features/componentsEmployee/list-employee/list-employee.component';
import { ListPresenceComponent } from '../../features/componentsPresence/list-presence/list-presence.component';

@Component({
  selector: 'app-page-spa',
  standalone: true,
  imports: [RouterOutlet, AsideComponent,RegisterWorkComponent, ListRoleComponent, ListEmployeeComponent,ListPresenceComponent],
  templateUrl: './page-spa.component.html',
  styleUrl: './page-spa.component.scss'
})
export class PageSpaComponent {

}
