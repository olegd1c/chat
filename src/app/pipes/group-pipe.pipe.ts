import { Pipe, PipeTransform } from '@angular/core';
import {MessageGroup,Message} from '../app.model';

@Pipe({
  name: 'groupPipe'
})
export class GroupPipe implements PipeTransform {

  transform(value: Message[], groupFilter: MessageGroup): any {
    //console.log("pipe");
    //console.log(value);
        //console.log(ProductSearchParams);
        if (groupFilter == null) return value;

        return value.filter((item) => item.from == groupFilter.name || item.to == groupFilter.name);          
    }
  }