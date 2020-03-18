import { Pipe, PipeTransform } from '@angular/core';
import { PropertyService } from '../../services/services';
import { map, take } from 'rxjs/operators';
import { Property } from '../../models/models';
@Pipe({
  name: 'data'
})
export class DataPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }
}
@Pipe({ name: 'propertyName' })
export class PropertyNamePipe implements PipeTransform {
  constructor(private propertyService: PropertyService){}
  transform(propertyId: String): String {
    
        if(propertyId)
        this.propertyService.getPropertyByID(propertyId).subscribe((data : Property)=>{
          return data.name;
        })
        else return 'undefined';
    }
}
