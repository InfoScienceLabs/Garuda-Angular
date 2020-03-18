import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataPipe } from './data.pipe';
import { PropertyNamePipe } from './data.pipe';
@NgModule({
  declarations: [DataPipe, PropertyNamePipe],
  imports: [CommonModule],
  exports: [PropertyNamePipe]
})
export class PipesModule { }
