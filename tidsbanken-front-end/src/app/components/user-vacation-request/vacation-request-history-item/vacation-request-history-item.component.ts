import { Component, Input } from '@angular/core';
import {
  UserVacationRequest,
  VacationRequestStatus,
  defaultUserVacationRequest,
} from 'src/app/models/vacation-request';
import { StatusColors } from 'src/app/globals/color-constants';

@Component({
  selector: 'app-vacation-request-history-item',
  templateUrl: './vacation-request-history-item.component.html',
  styleUrls: ['./vacation-request-history-item.component.scss'],
})
export class VacationRequestHistoryItemComponent {
  @Input() data: UserVacationRequest = defaultUserVacationRequest;
  isCommentsShowing: boolean = false;
  get hasComments(): boolean {
    return (
      this.data.requestComment !== null || this.data.responseComment !== null
    );
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
