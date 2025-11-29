import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenerateSeatsService {
  constructor() {}

  generateSeats(): any[] {
    const sections = [
      { name: 'Left Foyer', prefix: 'LF', seatType: 'REGULAR' },
      { name: 'Middle Foyer', prefix: 'MF', seatType: 'VIP' },
      { name: 'Right Foyer', prefix: 'RF', seatType: 'SENIOR' },

      { name: 'Left Balcony', prefix: 'LB', seatType: 'CHILDREN' },
      { name: 'Middle Balcony', prefix: 'MB', seatType: 'REGULAR' },
      { name: 'Right Balcony', prefix: 'RB', seatType: 'CHILDREN' },
    ];

    const rightFoyerLayout = {
      A: 8,
      B: 10,
      C: 11,
      D: 12,
      E: 12,
      F: 12,
      G: 12,
      H: 11,
      J: 10,
      K: 8,
      L: 5,
    };

    const middleFoyerLayout = {
      A: { start: 15, end: 33 },
      B: { start: 15, end: 34 },
      C: { start: 15, end: 33 },
      D: { start: 15, end: 34 },
      E: { start: 15, end: 31 },
      F: { start: 15, end: 32 },
      G: { start: 15, end: 31 },
      H: { start: 15, end: 32 },
      J: { start: 15, end: 29 },
      K: { start: 15, end: 30 },
    };

    const middleBalconyLayout = {
      AA: { start: 15, end: 36 },
      BB: { start: 15, end: 36 },
      CC: { start: 15, end: 36 },
      DD: { start: 15, end: 35 },
    };

    const rightBalconyLayout = {
      AA: 13,
      BB: 13,
      CC: 13,
      DD: 13,
      EE: 12,
    };

    const regularPrice = 55;
    const seniorPrice = 45;
    const childrenPrice = 40;
    const vipPrice = 75;

    sections.forEach((section: any) => {
      section.seatRows = [];
      if (section.name === 'Right Foyer') {
        for (const rowLetter of Object.keys(rightFoyerLayout)) {
          const numSeats = rightFoyerLayout[rowLetter as keyof typeof rightFoyerLayout];
          const row: any = [];
          (row as any).rowLetter = rowLetter;
          for (let j = numSeats; j >= 1; j--) {
            const seatNumber = `${rowLetter}-${j}`;
            row.push({
              number: seatNumber,
              section: section.name,
              selected: false,
              occupied: Math.random() > 0.8,
              seatType: 'SENIOR',
              price: seniorPrice,
            });
          }
          section.seatRows.push(row);
        }
      } else if (section.name === 'Middle Foyer') {
        for (const rowLetter of Object.keys(middleFoyerLayout)) {
          const layout = middleFoyerLayout[rowLetter as keyof typeof middleFoyerLayout];
          const row: any = [];
          (row as any).rowLetter = rowLetter;
          for (let j = layout.end; j >= layout.start; j--) {
            const seatNumber = `${rowLetter}-${j}`;
            row.push({
              number: seatNumber,
              section: section.name,
              selected: false,
              occupied: Math.random() > 0.8,
              seatType: 'VIP',
              price: vipPrice,
            });
          }
          section.seatRows.push(row);
        }
      } else if (section.name === 'Left Foyer') {
        for (const rowLetter of Object.keys(rightFoyerLayout)) {
          const numSeats = rightFoyerLayout[rowLetter as keyof typeof rightFoyerLayout];
          const row: any = [];
          (row as any).rowLetter = rowLetter;
          const startSeat = 36;
          const endSeat = startSeat + numSeats - 1;
          for (let j = endSeat; j >= startSeat; j--) {
            const seatNumber = `${rowLetter}-${j}`;
            row.push({
              number: seatNumber,
              section: section.name,
              selected: false,
              occupied: Math.random() > 0.8,
              seatType: 'REGULAR',
              price: regularPrice,
            });
          }
          section.seatRows.push(row);
        }
      } else if (section.name === 'Middle Balcony') {
        for (const rowLetter of Object.keys(middleBalconyLayout)) {
          const layout = middleBalconyLayout[rowLetter as keyof typeof middleBalconyLayout];
          const row: any = [];
          (row as any).rowLetter = rowLetter;
          for (let j = layout.end; j >= layout.start; j--) {
            const seatNumber = `${rowLetter}-${j}`;

            row.push({
              number: seatNumber,
              section: section.name,
              selected: false,
              occupied: Math.random() > 0.8,
              seatType: 'REGULAR',
              price: regularPrice,
            });
          }
          section.seatRows.push(row);
        }
      } else if (section.name === 'Right Balcony') {
        for (const rowLetter of Object.keys(rightBalconyLayout)) {
          const numSeats = rightBalconyLayout[rowLetter as keyof typeof rightBalconyLayout];
          const row: any = [];
          (row as any).rowLetter = rowLetter;
          for (let j = numSeats; j >= 1; j--) {
            const seatNumber = `${rowLetter}-${j}`;
            row.push({
              number: seatNumber,
              section: section.name,
              selected: false,
              occupied: Math.random() > 0.8,
              seatType: 'CHILDREN',
              price: childrenPrice,
            });
          }
          section.seatRows.push(row);
        }
      } else if (section.name === 'Left Balcony') {
        for (const rowLetter of Object.keys(rightBalconyLayout)) {
          const numSeats = rightBalconyLayout[rowLetter as keyof typeof rightBalconyLayout];
          const row: any = [];
          (row as any).rowLetter = rowLetter;
          const startSeat = 37;
          const endSeat = startSeat + numSeats - 1;
          for (let j = endSeat; j >= startSeat; j--) {
            const seatNumber = `${rowLetter}-${j}`;
            row.push({
              number: seatNumber,
              section: section.name,
              selected: false,
              occupied: Math.random() > 0.8,
              seatType: 'CHILDREN',
              price: childrenPrice,
            });
          }
          section.seatRows.push(row);
        }
      } else {
        for (let i = 1; i <= (section as any).rows; i++) {
          const row: any = [];
          (row as any).rowLetter = i;
          for (let j = (section as any).seatsPerRow; j >= 1; j--) {
            const seatNumber = `${section.prefix}${i}-${j}`;

            row.push({
              number: seatNumber,
              section: section.name,
              selected: false,
              occupied: Math.random() > 0.8,
              price: regularPrice,
            });
          }
          section.seatRows.push(row);
        }
      }
    });

    return sections;
  }
}
