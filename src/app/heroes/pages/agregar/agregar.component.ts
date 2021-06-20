import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img {
      width: 100%;
      border-radius: 5px;
    }`
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(
    private _heroeServerice: HeroesService,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return;
    }
    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => this._heroeServerice.obtenerHeroe(id))
      )
      .subscribe(heroe => this.heroe = heroe);
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      // Actualizar
      this._heroeServerice.actualizarHeroe(this.heroe)
        .subscribe((resp) => {
          this.mostrarSnakBar('Registro actualizado!')
          //  console.log('Actualizando', resp);
        })
    } else {
      // Crear
      this._heroeServerice.agregarHeroe(this.heroe)
        .subscribe((res) => {
          //  console.log('Respuesta', res);
          //  console.log(res['id']);
          this.mostrarSnakBar('Registro Creado!')
          this.router.navigate(['/heroes/editar', res.id])
        });
    }
  }

  eliminarHeroe() {

    const dialog = this._matDialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      (result => {
        // console.log(result);
        if (result === true) {
          this._heroeServerice.eliminarHeroe(this.heroe.id!)
            .subscribe(resp => {
              this.router.navigate(['/heroes']);
            })
        }
      })
    )
  }

  mostrarSnakBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Ok!', {
      duration: 2500
    })
  }

}
