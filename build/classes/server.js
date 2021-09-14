"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const enviroments_1 = require("../global/enviroments");
const http_1 = __importDefault(require("http"));
const socket = __importStar(require("../sockets/sockets"));
//Rutas
const indexRoutes_1 = __importDefault(require("../routes/indexRoutes"));
const gamesRoutes_1 = __importDefault(require("../routes/gamesRoutes"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const productRoutes_1 = __importDefault(require("../routes/productRoutes"));
const ticketRoutes_1 = __importDefault(require("../routes/ticketRoutes"));
const pedidoRoutes_1 = __importDefault(require("../routes/pedidoRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = enviroments_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = require("socket.io")(this.httpServer, {
            cors: {
                origin: true,
                credentials: true
            }
        });
        this.config();
        this.routes();
        this.listenSockets();
    }
    static get instance() {
        return this._intance || (this._intance = new this());
    }
    //configuramos el servidor.
    config() {
        // vemos las peticiones enviando el comando dev
        this.app.use(morgan_1.default('dev'));
        // express permite leer los archivos .json
        this.app.use(express_1.default.json());
        // permite enlazar formulario html
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    //configuramos las rutas de la app
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/games', gamesRoutes_1.default);
        this.app.use('/api/user', userRoutes_1.default);
        this.app.use('/api/producto', productRoutes_1.default);
        this.app.use('/api/ticket', ticketRoutes_1.default);
        this.app.use('/api/pedido', pedidoRoutes_1.default);
    }
    //Funcion para escuchar sockets
    listenSockets() {
        console.log('escuchando conexiones - sockets');
        this.io.on('connection', (cliente) => {
            console.log('cliente conectado', cliente.id);
            socket.mensaje(cliente, this.io);
            socket.desconectar(cliente);
            socket.addnote(cliente);
        });
    }
    //configuramos la inicializacion del servicio por el puerto 3000
    start() {
        this.httpServer.listen(this.port, () => {
            console.log(`server in port ${enviroments_1.SERVER_PORT}`);
        });
    }
}
exports.default = Server;
