"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedidoController_1 = __importDefault(require("../controllers/pedidoController"));
class PedidoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', pedidoController_1.default.list);
        this.router.get('/user/:id', pedidoController_1.default.listOne);
        this.router.get('/dataPedido/:id', pedidoController_1.default.listDataUser);
        this.router.get('/:id', pedidoController_1.default.getOne);
        this.router.post('/', pedidoController_1.default.create);
        this.router.put('/:id', pedidoController_1.default.update);
        this.router.delete('/:id', pedidoController_1.default.delete);
    }
}
const pedidoRoutes = new PedidoRoutes();
exports.default = pedidoRoutes.router;
