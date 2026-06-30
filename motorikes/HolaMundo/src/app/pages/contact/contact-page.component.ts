import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactSectionComponent } from '../home/contact-section/contact-section.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ContactSectionComponent],
  template: `
    <div class="min-h-screen bg-background pt-20">
      <app-contact-section></app-contact-section>
    </div>
  `
})
export class ContactPageComponent {}
