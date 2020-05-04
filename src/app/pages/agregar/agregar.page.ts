import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { listaItem } from '../../model/lista-items.model';
import { Lista } from '../../model/lista.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem: '';

  constructor( private deseosService: DeseosService,
               private route: ActivatedRoute) {
                 const listaId = this.route.snapshot.paramMap.get('listaId');
                 
                 this.lista = this.deseosService.obtenerLista( listaId );
                 
                }

  ngOnInit() {
  }

  agregarItem(){

    if(this.nombreItem.length === 0){
      return;
    }

    const nuevoItem = new listaItem( this.nombreItem );

    this.lista.items.push( nuevoItem );
    this.nombreItem = '';
    this.deseosService.guardarStorage();

  }
  
  cambioCheck(item: listaItem){
    
    const pendientes = this.lista.items.filter( itemData => {
      return ! itemData.completado;
    }).length;
    
    if( pendientes === 0){
      this.lista.terminadoEn = new Date();
      this.lista.terminado = true;
    } else {
      this.lista.terminadoEn = null;
      this.lista.terminado = false;

    }
    

    this.deseosService.guardarStorage();
    console.log(this.deseosService.listas);

  }

  borrar(i:number){
    this.lista.items.splice(i, 1);
    this.deseosService.guardarStorage();
  }
}
