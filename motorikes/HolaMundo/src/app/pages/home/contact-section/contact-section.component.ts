import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MotorcycleService } from '../../../core/services/motorcycle.service';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { ScrollRevealDirective } from '../../../core/directives/scroll-reveal.directive';

interface ModelOption {
  slug: string;
  name: string;
}

interface ModelOptionGroup {
  brandName: string;
  models: ModelOption[];
}

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionHeaderComponent, ScrollRevealDirective],
  templateUrl: './contact-section.component.html',
  styles: []
})
export class ContactSectionComponent implements OnInit {
  contactForm!: FormGroup;
  modelGroups: ModelOptionGroup[] = [];
  isSubmitting = false;
  showToast = false;

  constructor(
    private fb: FormBuilder,
    private motorcycleService: MotorcycleService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadModels();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      modeloInteres: ['', Validators.required],
      consulta: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  private loadModels(): void {
    this.motorcycleService.getAll().subscribe(motos => {
      // Group models by brand
      const groupsMap = new Map<string, ModelOption[]>();
      
      motos.forEach(moto => {
        const brandObj = this.motorcycleService.getBrandBySlug(moto.brand);
        const brandName = brandObj ? brandObj.name : moto.brand;
        
        if (!groupsMap.has(brandName)) {
          groupsMap.set(brandName, []);
        }
        
        groupsMap.get(brandName)?.push({
          slug: moto.slug,
          name: `${brandName} ${moto.name}`
        });
      });

      this.modelGroups = Array.from(groupsMap.entries()).map(([brandName, models]) => ({
        brandName,
        models
      }));
      this.cdr.detectChanges();
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // Simulate API call for 1.5 seconds
    setTimeout(() => {
      this.isSubmitting = false;
      this.showToast = true;
      this.contactForm.reset({
        nombre: '',
        telefono: '',
        email: '',
        modeloInteres: '',
        consulta: ''
      });

      // Hide toast automatically after 5 seconds
      setTimeout(() => {
        this.showToast = false;
      }, 5000);
    }, 1500);
  }
}
