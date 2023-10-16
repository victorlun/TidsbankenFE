import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComponentCommunicationService {
  private reRenderRequestHistory = new BehaviorSubject<boolean>(false);
  private reRenderManageRequestsList = new BehaviorSubject<boolean>(false);

  // Observable to trigger re-render for the user's vacation request history component
  reRender$RequestHistory = this.reRenderRequestHistory.asObservable();

  // Observable to trigger re-render for the manager's handled request history component
  reRender$ManageRequestsList = this.reRenderManageRequestsList.asObservable();

  // Method that trigger the re-render
  triggerReRenderRequestHistory() {
    this.reRenderRequestHistory.next(true);
  }

  // Method that trigger the re-render
  triggerReRenderManageRequestsList() {
    this.reRenderManageRequestsList.next(true);
  }
}
