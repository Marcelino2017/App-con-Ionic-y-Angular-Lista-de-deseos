import { listaItem } from './lista-items.model';
export class Lista{

    id: number;
    titulo: string;
    creadaEn: Date;
    terminadoEn: Date;
    terminado: boolean;
    items: listaItem[];

    constructor( titulo: string){

        this.titulo = titulo;

        this.creadaEn = new Date;
        this.terminado= false;
        this.items = [];
        
        this.id = new Date().getTime();


    }
}