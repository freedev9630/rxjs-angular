import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { OperatorService } from './rxjs/operator.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('inputref') inputref!: ElementRef<HTMLInputElement>;

  constructor(public readonly operatorService: OperatorService) {}

  ngAfterViewInit(): void {}
}
