import { Component, Input } from '@angular/core';
import { VacationRequest } from 'src/app/models/vacation-request';

@Component({
  selector: 'app-unhandled-request-list',
  templateUrl: './unhandled-request-list.component.html',
  styleUrls: ['./unhandled-request-list.component.scss'],
})
export class UnhandledRequestListComponent {
  @Input() unhandledRequests: VacationRequest[] = [];
  get listIsEmpty(): boolean {
    return this.unhandledRequests.length < 1;
  }
}
