"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class TicketController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield database_1.default.query('SELECT * FROM ticket');
            res.json(ticket);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const ticket = yield database_1.default.query('SELECT * FROM ticket WHERE id_ticket =?', [id]);
            if (ticket.length > 0) {
                return res.json(ticket[0]);
            }
            res.status(404).json({ text: 'el ticket no existe' });
        });
    }
    getData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield database_1.default.query('SELECT id_ticket,producto.name, producto.valor FROM ticket INNER JOIN producto ON producto.id = ticket.producto WHERE estado = true');
            res.json(ticket);
        });
    }
    getTotal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const total = yield database_1.default.query('SELECT SUM(producto.valor) AS Total FROM ticket INNER JOIN producto ON producto.id = ticket.producto WHERE estado = true');
            res.json(total);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO ticket set ?', [req.body]);
            res.json({ message: 'ticket guardados' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM ticket WHERE id_ticket = ?', [id]);
            res.json({ message: 'the ticket was deleted' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE ticket set ? WHERE id_ticket =?', [req.body, id]);
            res.json({ text: 'el  ticket fue actualizado ' });
        });
    }
    addPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE ticket set id_pedido = ? WHERE estado = true', [id, req.body]);
            yield database_1.default.query('UPDATE ticket set estado = 0 WHERE estado = 1');
            res.json({ message: 'ticket asignado' });
        });
    }
}
const ticketController = new TicketController();
exports.default = ticketController;
