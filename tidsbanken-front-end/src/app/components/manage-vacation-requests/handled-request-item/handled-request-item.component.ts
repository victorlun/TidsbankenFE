import { Component, Input } from '@angular/core';
import { StatusColors } from 'src/app/globals/color-constants';
import { VacationRequest, VacationRequestStatus, defaultVacationRequest } from 'src/app/models/vacation-request';

@Component({
  selector: 'app-handled-request-item',
  templateUrl: './handled-request-item.component.html',
  styleUrls: ['./handled-request-item.component.scss']
})
export class HandledRequestItemComponent {
  @Input() data: VacationRequest = defaultVacationRequest;
  isCommentsShowing: boolean = false;
  get hasComments(): boolean {
    return (this.data.requestComment !== null) || (this.data.responseComment !== null)
  }

  getStatusColor(status: VacationRequestStatus): string {
    switch (status) {
      case VacationRequestStatus.PENDING:
        return StatusColors.PENDING_COLOR;
      case VacationRequestStatus.APPROVED:
        return StatusColors.APPROVED_COLOR;
      case VacationRequestStatus.DENIED:
        return StatusColors.DENIED_COLOR;
      default:
        return 'black'; // Default color
    }
  }

  flipCommentDropDown() {
    this.isCommentsShowing = !this.isCommentsShowing;
  }
}
