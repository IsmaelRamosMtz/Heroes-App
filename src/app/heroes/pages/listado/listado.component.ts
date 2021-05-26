import { Component, OnInit } from '@angular/core';

import { HeroesService } from '../../services/heroes.service';

import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`
  mat-card {
    margin-top: 20px;
  }
  `]
})
export class ListadoComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor(
    private _heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this._heroesService.obtenerHeroes()
    .subscribe( resp => {
      this.heroes = resp;
      console.log(this.heroes);
    })
  }

}
