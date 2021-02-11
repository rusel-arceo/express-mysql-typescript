import Server from './server/server'; //no es neceqario la extención y de hecho marca error si ponemos ts
import {router} from './router/router'; 
import Mysql from './mysql/Mysql';

//import { response } from 'express';

const server=Server.init(3000);
server.app.use(router);

server.start(()=>{
    console.log("servidor corriendo en el puerto 3000");   
});

