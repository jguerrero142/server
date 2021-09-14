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
class PedidoController {
    //Traemos todos los ticket de un User.
    listDataUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const dataUserPedido = yield database_1.default.query('SELECT (pedido.id),(pedido.created_at),(pedido.valor),(user.id_user) ,(user.nickname),(user.name),(user.picture),(user.email) FROM pedido INNER JOIN user ON user.id_user = pedido.id_user WHERE pedido.id_user = ?', [id]);
            res.json(dataUserPedido);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedido = yield database_1.default.query('SELECT (pedido.id),(pedido.created_at),(pedido.valor),(user.id_user) ,(user.nickname),(user.name),(user.picture),(user.email) FROM pedido INNER JOIN user ON user.id_user = pedido.id_user');
            res.json(pedido);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pedido = yield database_1.default.query('SELECT * FROM pedido WHERE id_user = ?', [id]);
            res.json(pedido);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pedido = yield database_1.default.query('SELECT * FROM pedido WHERE id_user = ?', [id]);
            if (pedido.length > 0) {
                return res.json(pedido[0]);
            }
            res.status(404).json({ text: 'el pedido no existe' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO pedido set ?', [req.body]);
            const id_pedido = yield database_1.default.query('SELECT id FROM pedido WHERE estado_ped = true');
            yield database_1.default.query('UPDATE pedido set estado_ped = false WHERE estado_ped = true');
            return res.json(id_pedido[0]);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM ticket WHERE id_pedido = ?', [id]);
            yield database_1.default.query('DELETE FROM pedido WHERE id = ?', [id]);
            res.json({ message: 'the pedido was deleted' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE pedido set ? WHERE id_user=?', [req.body, id]);
            res.json({ text: 'el  pedido fue actualizado ' });
        });
    }
}
const pedidoController = new PedidoController();
exports.default = pedidoController;
