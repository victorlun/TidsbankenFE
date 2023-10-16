import { Component, Input } from '@angular/core';
import { VacationRequest } from 'src/app/models/vacation-request';

@Component({
  selector: 'app-handled-request-list',
  templateUrl: './handled-request-list.component.html',
  styleUrls: ['./handled-request-list.component.scss'],
})
export class HandledRequestListComponent {
  @Input() handledRequests: VacationRequest[] = [];
  get listIsEmpty(): boolean {
    return this.handledRequests.length < 1;
  }
}
