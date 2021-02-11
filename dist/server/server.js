"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//marca un error que no existe un paquete de declaraciones para exprees para esto debemos instalarlo con npm install @types/express --save-dev, para que desaparesca el error.
var express = require("express");
var path = require("path");
var Server = /** @class */ (function () {
    function Server(puerto) {
        this.port = puerto;
        this.app = express(); //Inicializamos el express
    }
    Server.prototype.publicFolder = function () {
        var publico = path.resolve(__dirname, '../public');
        this.app.use(express.static(publico)); //Establecemos la carpeta publica
    };
    Server.init = function (puerto) {
        return new Server(puerto);
    };
    //start(callback:any){  //El estart ya levanta el servidor
    Server.prototype.start = function (callback) {
        this.app.listen(this.port, callback);
        this.publicFolder();
    };
    return Server;
}());
exports.default = Server;
