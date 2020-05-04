import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from '../../model/lista.model';
import { async } from '@angular/core/testing';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) {
   }

  ngOnInit() {}

  listaSelecionada(lista: Lista){

    if( this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }

  }

  borrarLista(lista: Lista){

    this.deseosService.borrarLista(lista);

  }

  async editarLista( lista: Lista, slideItem: any){

    const alert = await this.alertCtrl.create({
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar edición');
            slideItem.close();

          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            console.log(data);
            if(data.titulo.length === 0){
              slideItem.close();
              return;
            }

            lista.titulo = data.titulo;

            this.deseosService.guardarStorage();
            slideItem.close();

          }
        }
      ]
    });

    await alert.present();

  }


}
