


// pages/upcoming-roles/upcoming-roles.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService} from '../../services/data.services';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-upcoming-roles',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <div class="container">
      <h2 class="page-heading">{{ firstName }} {{ lastName }}'s Roles</h2>

      <button mat-raised-button color="primary" class="back-button" (click)="goBack()">
        Back to Home
      </button>

      <div class="roles-list">
        @for (role of upcomingRoles; track role.date) {
          <mat-card class="role-card"
                    (click)="showScheduleForDate(role.date)"
            >
            <mat-card-header>
              <mat-card-title class="date-title">
                {{ role.date }}
              </mat-card-title>
            </mat-card-header>
            <mat-card-content class="role-content">
              Role: {{ fullRoleName(role.role) }}
            </mat-card-content>
          </mat-card>
        }
      </div>
    </div>
  `,
  styles: [`
    @import '../../styles/card.styles.scss';

    .container {
      padding: 1rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .page-heading {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .back-button {
      font-size: 1.2rem;
      padding: 0.5rem 1.5rem;
      margin-bottom: 2rem;
    }

    .roles-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .role-card {
      margin-bottom: 1rem;
    }
  `]
})
export class UpcomingRolesComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  upcomingRoles: { date: string; role: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.firstName = decodeURIComponent(this.route.snapshot.params['firstName']);
    this.lastName = decodeURIComponent(this.route.snapshot.params['lastName']);

    const member = this.dataService.getMembers()
      .find(m =>
        m['First Name'] === this.firstName &&
        m['Last Name'] === this.lastName
      );

    if (member) {
      this.upcomingRoles = this.getUpcomingRoles(member);
    }
  }

  private getUpcomingRoles(member: Member): { date: string; role: string }[] {
    return Object.entries(member)
      .filter(([key]) => key.includes('/'))
      .map(([date, role]) => ({
        date,
        role: role.trim()
      }))
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  fullRoleName(role: string) {
    if (!role) return 'No role assigned';
    return this.dataService.fullRoleName(role);
  }

  showScheduleForDate(date: string) {
    this.dataService.setSelectedDate(date);
    this.router.navigate(['/home']);
  }
}
