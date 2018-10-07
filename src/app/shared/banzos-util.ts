import { Injectable } from "@angular/core";

@Injectable()
export class BanzosUtils{


public filter(items, field, reverse) {
    var filtered = [];
    items.forEach(function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  }

}

