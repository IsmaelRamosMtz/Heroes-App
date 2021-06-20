import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(
    private _heroesService: HeroesService
  ) { }

  ngOnInit(): void {
  }

  buscando() {
    this._heroesService.sugerencias(this.termino.trim())
    .subscribe(resp => this.heroes = resp);
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent){

    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    console.log(heroe);
    this.termino = heroe.superhero;

    this._heroesService.obtenerHeroe( heroe.id! )
    .subscribe(resp => this.heroeSeleccionado = resp);

  }
}
