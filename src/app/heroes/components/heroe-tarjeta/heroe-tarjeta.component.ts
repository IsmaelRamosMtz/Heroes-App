import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [
  ]
})
export class HeroeTarjetaComponent implements OnInit {

  // Siempre se recibira un valor
  @Input() item!: Heroe;

  constructor() { }

  ngOnInit(): void {
  }

}
