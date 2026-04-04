import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-button-group',
  imports: [MatIconModule, RouterLink],
  templateUrl: './button-group.html',
  styleUrl: './button-group.css',
})
export class ButtonGroup {

  private router = inject(Router)

  toActivities() {
    this.router.navigate(['/activities/avistamiento', 'oso']);
  }

}
