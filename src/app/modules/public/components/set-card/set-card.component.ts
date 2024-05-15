import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MagicSet } from '../../models/MagicSet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './set-card.component.html',
  styleUrl: './set-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetCardComponent {
  @Input({ required: true }) set!: MagicSet;

  constructor(private router: Router) {}

  goBooster(id: string) {
    this.router.navigate(['colecoes/booster/', id.toLowerCase()]);
  }
}
