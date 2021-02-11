"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var Mysql = /** @class */ (function () {
    function Mysql(config) {
        this.config = config;
        this.conectado = false;
        var configConexion = {
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database
        };
        this.connection = mysql.createConnection(configConexion);
        console.log(" clase inicializada");
        this.establecerConexion();
    }
    Mysql.instance = function (config) {
        return this._instance || (this._instance = new this(config));
    };
    Mysql.prototype.ejecutarQuery = function (query, callback) {
        this.connection.query(query, function (error, results, fields) {
            if (error) {
                console.log("Ha sucedido un error al efectuar la consulta");
                console.log(error);
                return callback(error);
            }
            if (results.length === 0) //Si no se encontro el resgistro el manda como primer argumento el error, en este caso el callback que no nosotros definimos, siempre recibira error, si es null significa que no hubo error. Tambien pudo ser un simplre return del result y manejar la situacion al regresar, pero esta es una manera.
             {
                callback('No se encontró el registro');
            }
            callback(null, results);
        });
    };
    Mysql.prototype.establecerConexion = function () {
        var _this = this;
        this.connection.connect(function (err) {
            if (err) {
                console.log('Un error a sucedido');
                console.log(err.message);
                return;
            }
            _this.conectado = true;
            console.log("Base de datos conectada");
        });
    };
    return Mysql;
}());
exports.default = Mysql;
