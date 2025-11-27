import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventCards{
  data = [
      { 
        id: 1,
        picture:'https://picsum.photos/id/11/200/100',
        title: 'title1',
        description: 'Description 1',
      },

      {
        id: 2,
        picture:'https://picsum.photos/id/11/200/100',
        title: 'title2',
        description: 'Description 2',
      },

      {
        id: 3,
        picture:'https://picsum.photos/id/11/200/100',
        title: 'title3',
        description: 'Description 3',
      },
      
      {
        id: 4,
        picture:'https://picsum.photos/id/11/200/100',
        title: 'title1',
        description: 'Description 4',
      }
  ];
}
