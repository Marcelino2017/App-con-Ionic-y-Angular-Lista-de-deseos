import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../model/lista.model';

@Pipe({
  name: 'filtroCompletado',
  pure: false
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], completado: boolean = true) {

    return listas.filter( (lista) => {
      return lista.terminado === completado;
    });

  }

}
