// app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="sidenav.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Meeting Roles</span>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="over">
        <mat-nav-list>
          <a mat-list-item routerLink="/home" (click)="sidenav.close()">Home</a>
          <a mat-list-item routerLink="/speakers" (click)="sidenav.close()">Speakers</a>
          <a mat-list-item routerLink="/dates" (click)="sidenav.close()">Meeting Dates</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }

    mat-sidenav-container {
      height: calc(100% - 64px);
    }

    mat-sidenav {
      width: 250px;
    }

    mat-sidenav-content {
      padding: 16px;
    }
  `]
})
export class AppComponent {}
