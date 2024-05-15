import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from '../../models/Card';

@Component({
  selector: 'app-booster-card',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  templateUrl: './booster-card.component.html',
  styleUrl: './booster-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoosterCardComponent {
  @Input({ required: true }) card!: Card;
}
