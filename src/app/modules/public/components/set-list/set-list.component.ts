import { SetService } from './../../../../shared/services/set.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, WritableSignal, signal } from '@angular/core';
import { MagicSet } from '../../models/MagicSet';
import { SetCardComponent } from "../set-card/set-card.component";
import { FormsModule } from '@angular/forms';
import { MagicSetResponse } from '../../models/MagicSetResponse';

@Component({
    selector: 'app-set-list',
    standalone: true,
    templateUrl: './set-list.component.html',
    styleUrl: './set-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        SetCardComponent,
        FormsModule
    ]
})
export class SetListComponent {
  magicSets: WritableSignal<MagicSet[]> = signal([])
  name: string = '';
  block: string = '';

  constructor(private setService: SetService){}

  search(){
    this.magicSets.set([]);

    if(this.block == ''){
      alert('Por favor, selecione um bloco');
      return;
    }

    this.setService.getSets(this.block, this.name.trim()).subscribe({
      next: (s: MagicSetResponse) => {
        this.magicSets.set(s.sets);
      },
      error: (e: any) => {
        console.log(e);
        alert('Ocorreu um erro, tente novamente mais tarde');
      }
    })
  }

  clear(){
    this.magicSets.set([]);
    this.name = '';
    this.block = '';
  }
}
