import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'time'})
export class TimePipe implements PipeTransform{
   // currentDate = new Date().getFullYear()+ new Date().getMonth()+ new Date().getDate();
    today = new Date();
    compare;
     difference;
    transform(value:string, args: string[]): any{
       if(!value) return value;
       this.today.setHours(0);
       this.today.setMinutes(0);
       this.today.setSeconds(0);
       this.today.setMilliseconds(0);
       this.compare = new Date(value);
       this.difference = this.today.getTime() - this.compare.getTime();
      if(new Date(value).getTime() == this.today.getTime()){
          return 'Today';
      }
      else if(this.difference <=(24*60*60*1000)){
          return 'Yesterday';
      }
      else{
         // console.log(this.compare)
          return new Date(value).toLocaleDateString();
      }
   
     
    }
}