import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlockedPeriodListItem } from 'src/app/models/blocked-period';
import { BlockedPeriodService } from 'src/app/services/blocked-period.service';

@Component({
  selector: 'app-blocked-period-list',
  templateUrl: './blocked-period-list.component.html',
  styleUrls: ['./blocked-period-list.component.scss'],
})
export class BlockedPeriodListComponent {
  constructor(
    private http: HttpClient,
    private blockedPeriodService: BlockedPeriodService
  ) {}

  blockedPeriods: BlockedPeriodListItem[] = [];

  ngOnInit(): void {
    this.loadData();

    // Subscribe to refreshNeeded$ observable to listen for updates
    this.blockedPeriodService.refreshNeeded$.subscribe(() => {
      this.loadData();
    });
  }

  // Moved your API call code to a separate function for reusability
  loadData() {
    this.http
      .get<BlockedPeriodListItem[]>(
        'https://tbanken.azurewebsites.net/api/v1/blocked-periods'
      )
      .subscribe(
        (data) => {
          this.blockedPeriods = data.sort(
            (a, b) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        },
        (error) => console.log('Error: ', error)
      );
  }

  deletePeriod(id: number) {
    // Prompt the user for confirmation
    const userConfirmed = window.confirm(
      `Are you sure you want to delete this blocked period?`
    );

    if (!userConfirmed) {
      return;
    }
    this.http
      .delete(`https://tbanken.azurewebsites.net/api/v1/blocked-periods/${id}`)
      .subscribe(
        () => {
          console.log(`Deleted BlockedPeriod with id: ${id}`);
          // refresh data
          this.ngOnInit();
        },
        (error) => {
          console.log('Error:', error);
        }
      );
  }
}
