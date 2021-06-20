import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from "rxjs/operators";

import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
  img {
    width: 100%;
    border-radius: 5px;
  }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    // Se obtiene el parametro pero no se puede actualizar
      // this.id = this._activatedRoute.snapshot.params.id;
      // console.log(this.id);

      // Otra froma de obtener el parametro y es la mas recomendada
      // this._activatedRoute.params
      // .subscribe( ({ id }) => console.log(id));

      this._activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this._heroesService.obtenerHeroe(id))
      )
      .subscribe( heroe => this.heroe = heroe);
  }

  regresar() {
    this._router.navigate(['/heroes/listado']);
  }

}
