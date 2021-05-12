"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const heroesController_1 = __importDefault(require("../controllers/heroesController"));
class HeroesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', heroesController_1.default.list);
        this.router.get('/:id', heroesController_1.default.getOne);
        this.router.post('/', heroesController_1.default.create);
        this.router.put('/:id', heroesController_1.default.update);
        this.router.delete('/:id', heroesController_1.default.delete);
    }
}
const heroesRoutes = new HeroesRoutes();
exports.default = heroesRoutes.router;
