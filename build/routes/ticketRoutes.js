"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketController_1 = __importDefault(require("../controllers/ticketController"));
class TicketRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', ticketController_1.default.list);
        this.router.get('/:id', ticketController_1.default.getOne);
        this.router.get('/ticketPedido/:id', ticketController_1.default.getTicket);
        this.router.get('/data/ticket', ticketController_1.default.getData);
        this.router.get('/data/total', ticketController_1.default.getTotal);
        this.router.post('/', ticketController_1.default.create);
        this.router.put('/:id', ticketController_1.default.update);
        this.router.delete('/:id', ticketController_1.default.delete);
        this.router.put('/pedido/id/:id', ticketController_1.default.addPedido);
    }
}
const ticketRoutes = new TicketRoutes();
exports.default = ticketRoutes.router;
