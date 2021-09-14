import express from 'express';
import morgan from 'morgan';
import { SERVER_PORT } from '../global/enviroments';


// Socket configuracion
import  socketIO  from 'socket.io';
import http from 'http';


//Rutas
import indexRoutes from '../routes/indexRoutes';
import gamesRoutes from '../routes/gamesRoutes';
import userRoutes from '../routes/userRoutes';
import productRoutes from '../routes/productRoutes';
import ticketRoutes from '../routes/ticketRoutes';
import pedidoRoutes from '../routes/pedidoRoutes';

export default class Server {

    private static _intance: Server;

    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){

        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = require( "socket.io" )(this.httpServer,{
            cors:{
                origin: true,
                credentials: true
            }
        })

        this.config();
        this.routes();
        this.listenSockets();
    }

    public static get instance(){
        return this._intance || (this._intance = new this() );
    }
    //configuramos el servidor.
    config(): void{
        // vemos las peticiones enviando el comando dev
        this.app.use(morgan('dev'));
       // express permite leer los archivos .json
        this.app.use(express.json());
        // permite enlazar formulario html
        this.app.use(express.urlencoded({extended: true})); 
    }
    //configuramos las rutas de la app
    routes(): void{
        this.app.use(indexRoutes); 
        this.app.use('/api/games', gamesRoutes); 
        this.app.use('/api/user', userRoutes);
        this.app.use('/api/producto', productRoutes); 
        this.app.use('/api/ticket', ticketRoutes);
        this.app.use('/api/pedido', pedidoRoutes);    
    }
    //Funcion para escuchar sockets
    private listenSockets(){
        console.log('escuchando conexiones - sockets');
    }
    //configuramos la inicializacion del servicio por el puerto 3000
    start(): void{
        this.httpServer.listen(this.port, () => {
            console.log(`server in port ${SERVER_PORT}`);
        });        
    }
}