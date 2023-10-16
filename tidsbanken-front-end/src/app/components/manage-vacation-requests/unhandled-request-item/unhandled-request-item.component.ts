import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  ResponsePostDTO,
  VacationRequest,
  defaultVacationRequest,
} from 'src/app/models/vacation-request';
import { ComponentCommunicationService } from 'src/app/services/component-communication.service';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'app-unhandled-request-item',
  templateUrl: './unhandled-request-item.component.html',
  styleUrls: ['./unhandled-request-item.component.scss'],
})
export class UnhandledRequestItemComponent {
  @Input() data: VacationRequest = defaultVacationRequest;
  manageRequestForm: FormGroup;
  isCommentShowing: boolean = false;
  get hasComments(): boolean {
    return (
      this.data.requestComment !== null || this.data.responseComment !== null
    );
  }

  constructor(
    private fb: FormBuilder,
    private readonly responseService: ResponseService,
    private readonly componentCommunicationService: ComponentCommunicationService
  ) {
    // Initializes the FormGroup with FormControl and validation
    this.manageRequestForm = this.fb.group({
      responseComment: [''],
    });
  }

  flipCommentDropDown() {
    this.isCommentShowing = !this.isCommentShowing;
  }

  manageRequest(response: any) {
    console.log(response);

    // Create the new request
    const postResponse: ResponsePostDTO = {
      vacationRequestId: this.data.id,
      response: response,
      responseComment: this.manageRequestForm.get('responseComment')?.value,
    };

    console.log(postResponse);

    // Post the new request to the database
    this.responseService.postResponse(postResponse).subscribe(
      (httpResponse) => {
        console.log('Response created:', httpResponse);
        this.componentCommunicationService.triggerReRenderManageRequestsList();
      },
      (error) => {
        console.error('Error creating response:', error);
      }
    );
  }
}
