import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header';
import { FooterComponent } from './components/layout/footer/footer';
import { AuthService } from './services/auth.service';
import { ScanQrComponent } from './components/shared/scan-qr/scan-qr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {
  protected readonly title = signal('EMS');

  

  
}
