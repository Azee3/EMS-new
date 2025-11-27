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

    // Simulate scanning after 2 seconds
    setTimeout(() => {
      const sampleResults = [
        'https://example.com/qr-data',
        'QR-CODE-12345',
        'Hello from QR Scanner!',
        'Product: ABC-789-XYZ',
        'Contact: test@example.com'
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
