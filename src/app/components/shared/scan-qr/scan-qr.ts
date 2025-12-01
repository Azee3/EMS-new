import { Component,ViewChild, ElementRef, OnInit  } from '@angular/core';
import {Router, RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scan-qr',
  imports: [CommonModule],
  templateUrl: './scan-qr.html',
  styleUrl: './scan-qr.css',
})
export class ScanQrComponent  {
  scanResult: string = '';
  isScanning: boolean = false;

  startScanning() {
    this.isScanning = true;
    this.scanResult = '';

   
    setTimeout(() => {
      const sampleResults = [
        'https://help.com/qr-data',
        'QR-CODE-12345',
        'Test!',
        'Product: ABC-123-ABC',
        'Contact: test@help.com'
      ];
      this.scanResult = sampleResults[Math.floor(Math.random() * sampleResults.length)];
      this.isScanning = false;
    }, 2000);
  }

  scanAgain() {
    this.scanResult = '';
    this.isScanning = false;
  }
}
