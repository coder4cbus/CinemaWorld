import {PipeTransform, Pipe} from "@angular/core";
/**
 * Created by jaype on 1/26/2017.
 */
@Pipe({
  name: 'starMaker'
})

export class StarMakerPipe implements PipeTransform {
  transform(value:number) {

    let rating: number = +value;
    let floor:number = Math.floor(rating);
    let ceiling:number=Math.ceil(rating);
    let decimal:number = rating % 1;

    let stars: string[] = [];
    for(let x=0; x<floor; x++)
    {
      stars.push("full-star");
    }

    if(decimal * 100 == 50)
    {
      stars.push("half-star");
    }
    else if(decimal *100 < 50)
    {
      stars.push("less-half-star");
    }
    else if(decimal *100 > 50)
    {
      stars.push("more-half-star");
    }

    for(let x=0; x<10-ceiling; x++)
    {
      stars.push("hollow-star");
    }

    return stars;
  }
}
