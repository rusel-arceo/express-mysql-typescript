"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server/server")); //no es neceqario la extención y de hecho marca error si ponemos ts
var router_1 = require("./router/router");
//import { response } from 'express';
var server = server_1.default.init(3000);
server.app.use(router_1.router);
server.start(function () {
    console.log("servidor corriendo en el puerto 3000");
});
