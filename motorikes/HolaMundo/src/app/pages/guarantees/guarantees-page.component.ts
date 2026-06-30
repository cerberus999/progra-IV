import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuaranteeSectionComponent } from '../home/guarantee-section/guarantee-section.component';

@Component({
  selector: 'app-guarantees-page',
  standalone: true,
  imports: [CommonModule, GuaranteeSectionComponent],
  template: `
    <div class="min-h-screen bg-background pt-20">
      <app-guarantee-section></app-guarantee-section>
    </div>
  `
})
export class GuaranteesPageComponent {}
