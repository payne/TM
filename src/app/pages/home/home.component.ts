// pages/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { DataService} from '../../services/data.services';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <h2 class="page-heading">Roles for {{ selectedDate }}</h2>

    <div class="roles-grid">
      @for (member of membersWithRoles; track member['Last Name']) {
        <mat-card
          class="role-card"
          (click)="showUpcomingRoles(member)"
          [style.cursor]="'pointer'"
        >
          <mat-card-header>
            <mat-card-title class="member-name">
              {{ member['First Name'] }} {{ member['Last Name'] }}
            </mat-card-title>
          </mat-card-header>
          <mat-card-content class="role-content">
            Role: {{ member[selectedDate] }}
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    @import '../../styles/card-styles.scss';

    .page-heading {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
    }

    .roles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
      padding: 16px;
    }
  `]
})
export class HomeComponent {
  selectedDate = '';
  membersWithRoles: Member[] = [];

  constructor(
    private dataService: DataService,
    private router: Router
  ) {
    this.dataService.getSelectedDate().subscribe(date => {
      this.selectedDate = date;
      this.membersWithRoles = this.dataService.getMembersWithRoles(date);
    });
  }

  showUpcomingRoles(member: Member) {
    this.router.navigate([
      'member',
      encodeURIComponent(member['First Name']),
      encodeURIComponent(member['Last Name'])
    ]);
  }
}
