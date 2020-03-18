import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule } from '@angular/material';

import { LoadingComponent } from './loading.component';
import { SkeletonComponent } from './skeleton/skeleton.component';

@NgModule({
  imports: [CommonModule, MatCardModule, MatIconModule],
  declarations: [LoadingComponent, SkeletonComponent],
  exports: [LoadingComponent, SkeletonComponent]
})
export class LoadingModule { }
