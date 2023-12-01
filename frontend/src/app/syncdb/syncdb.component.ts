import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-syncdb',
  standalone: true,
  imports: [CommonModule],
  template: `
  `
})
export class SyncdbComponent {

    constructor(public auth: AuthService) {
        auth.syncDb()
    }
}
