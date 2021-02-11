import {Router, Request, Response} from 'express';
import Mysql from '../mysql/Mysql';
import {config} from '../mysql/Mysql';
export const router = Router();  //Sirve para esplecificar las rutas 

const configConexion: config={
    host:'localhost',
    user:'node_us',
    password:'entrar', 
    database:'node_db',
}            

const mysql= new Mysql(configConexion);

router.get('/heroes',(req:Request,res:Response)=> {
    // res.json({
    //     ok:true,
    //     mensaje:"Todo bien desde heroes sin mysql!!!",
        
    // });
    mysql.ejecutarQuery('SELECT * from heroes',(err:any, heroes:Object[])=>{
        //Este callback será ejecutado despues de la consulta en clase Mysql
        if(err)
        {
            res.status(400).json({
                ok:false,
                error:err
            });        
        }else{
            res.json({ok:true, heroes:heroes});
        }
    
    });
});

router.get('/heroes/:id',(req:Request,res:Response)=> {
    let id=req.params.id;  //Recuerda para parametros por el url es params
    // res.json({
    //     ok:true,
    //     mensaje:"Todo bien con el id!!!",
    //     id:id
    // });
    const idConsulta = mysql.connection.escape(req.params.id);  //Escapamos el id

    mysql.ejecutarQuery(`SELECT * from heroes where id=${idConsulta}`,(err:any, heroes:Object[])=>{
        //Este callback será ejecutado despues de la consulta en clase Mysql, heroes es un arreglo de objetos
        if(err)
        {
            res.status(400).json({
                ok:false,
                error:err
            });        
        }else{
            res.json({ok:true, heroes:heroes[0]});
        }
    
    });
})

