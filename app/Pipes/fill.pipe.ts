import {PipeTransform, Pipe} from "@angular/core";
/**
 * Created by jaype on 1/26/2017.
 */
@Pipe({
  name: 'fill'
})
export class FillPipe implements PipeTransform {
  transform(value:number) {
    let number:number = Math.round(value);
    return (new Array(number)).fill(1);
  }
}
