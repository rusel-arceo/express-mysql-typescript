import mysql = require('mysql');

export interface config{
    host: string,
    user:string,
    password: string,
    database:string
}

export default class Mysql
{
    private static _instance: Mysql  // esto es el patron singetón y sirve para tener una sola instancía de la clase.

    connection: mysql.Connection; // es el mysql de la importación
    conectado:boolean=false;
    
    constructor(private config:config)
    {
        const configConexion={
            host:config.host,
            user:config.user,
            password:config.password,
            database:config.database
        }    
        
        this.connection = mysql.createConnection(configConexion);

        console.log(" clase inicializada");
        this.establecerConexion();

    }

    public static instance(config:config)
    {
        return this._instance || (this._instance=new this(config));
    }

    public ejecutarQuery(query:string, callback:Function)
    {
     this.connection.query(query,(error:Error, results:Object[], fields)=>{
         if(error)
         {
             console.log("Ha sucedido un error al efectuar la consulta");
             console.log( error);
             return callback(error);
        }

        if(results.length===0)  //Si no se encontro el resgistro el manda como primer argumento el error, en este caso el callback que no nosotros definimos, siempre recibira error, si es null significa que no hubo error. Tambien pudo ser un simplre return del result y manejar la situacion al regresar, pero esta es una manera.
            {callback('No se encontró el registro');}

         callback(null,results);
     });
    }

    private establecerConexion()
    {
        this.connection.connect((err:mysql.MysqlError)=>{
            
            if(err)
            {
                console.log('Un error a sucedido');
            
                console.log(err.message);
                return;
            }

            this.conectado = true;
            console.log("Base de datos conectada");

    });   
    }

}

