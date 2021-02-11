"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var Mysql_1 = __importDefault(require("../mysql/Mysql"));
exports.router = express_1.Router(); //Sirve para esplecificar las rutas 
var configConexion = {
    host: 'localhost',
    user: 'node_us',
    password: 'entrar',
    database: 'node_db',
};
var mysql = new Mysql_1.default(configConexion);
exports.router.get('/heroes', function (req, res) {
    // res.json({
    //     ok:true,
    //     mensaje:"Todo bien desde heroes sin mysql!!!",
    // });
    mysql.ejecutarQuery('SELECT * from heroes', function (err, heroes) {
        //Este callback será ejecutado despues de la consulta en clase Mysql
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({ ok: true, heroes: heroes });
        }
    });
});
exports.router.get('/heroes/:id', function (req, res) {
    var id = req.params.id; //Recuerda para parametros por el url es params
    // res.json({
    //     ok:true,
    //     mensaje:"Todo bien con el id!!!",
    //     id:id
    // });
    var idConsulta = mysql.connection.escape(req.params.id); //Escapamos el id
    mysql.ejecutarQuery("SELECT * from heroes where id=" + idConsulta, function (err, heroes) {
        //Este callback será ejecutado despues de la consulta en clase Mysql
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({ ok: true, heroes: heroes });
        }
    });
});
