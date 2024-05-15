import { BoosterResponse } from './../../models/BoosterResponse';
import { SetService } from './../../../../shared/services/set.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { Card } from '../../models/Card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BoosterCardComponent } from "../booster-card/booster-card.component";
import { LoadingService } from '../../../../shared/services/loading.service';
import { EMPTY, Observable, ObservableInput, expand, filter, map, of, scan, take } from 'rxjs';

@Component({
    selector: 'app-booster-list',
    standalone: true,
    templateUrl: './booster-list.component.html',
    styleUrl: './booster-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        BoosterCardComponent,
        RouterModule
    ]
})
export class BoosterListComponent {
  booster: WritableSignal<Card[]> = signal([]);
  loading = signal(false);

  constructor(private setService: SetService, private route: ActivatedRoute, private router: Router, public loadingService: LoadingService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    const fetchedCards: WritableSignal<Card[]> = signal([]);

    this.loading.set(true);

    this.setService.getBooster(id as string)
      .pipe(
        expand(() =>
          fetchedCards().length < 30 || fetchedCards().filter(card => card.types.includes('Creature')).length < 30 ?
            this.setService.getBooster(id as string) :
            EMPTY
        ),
        map<BoosterResponse, Card[]>(response => {
          const cards = response.cards.filter(card => card.types.includes('Creature'));
          fetchedCards.set([...fetchedCards(), ...cards]);
          return fetchedCards().slice(0, 30);
        })
      )
      .subscribe({
        next: (cards: Card[]) => {
          this.booster.set(cards)
        },
        error: (e: any) => {
          console.log(e);
          alert('Não foram encontrados cards para realizar o booster desta coleção');
          this.router.navigate(['/colecoes']);
        },
        complete: () => {
          this.loading.set(false);
        }
      });
  }
}
