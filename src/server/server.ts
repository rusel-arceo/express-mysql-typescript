 //marca un error que no existe un paquete de declaraciones para exprees para esto debemos instalarlo con npm install @types/express --save-dev, para que desaparesca el error.
import express = require('express');
import path= require ('path');

export default class Server{ //esportamos por defecto, es terminología typescrip similar a js
    public app:express.Application;  //No es necesario pero siguiendo las reglas decimos que app es de tipo aplicación express
    public port: number;
   
    constructor(puerto:number)
    {
        this.port = puerto;
        this.app = express(); //Inicializamos el express
    }

    private publicFolder():void
    {
        const publico=path.resolve(__dirname, '../public');
        this.app.use(express.static(publico));  //Establecemos la carpeta publica
    }

    static init (puerto:number) //Este al ser estatico, solo inicializa el server, busca evitar que se tengan varías instancias del server
    {
        return new Server(puerto);
    }

    //start(callback:any){  //El estart ya levanta el servidor
    start(callback:any)
    { 
        this.app.listen(this.port, callback);
        this.publicFolder();
    }
}