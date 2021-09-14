"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addnote = exports.mensaje = exports.desconectar = void 0;
const notes = [];
const desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
};
exports.desconectar = desconectar;
const mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('mensaje recibido', payload);
        io.emit('nuevo-mensaje', payload);
    });
};
exports.mensaje = mensaje;
const addnote = (cliente) => {
    cliente.on('Cliente:newnote', (payload) => {
        console.log('nueva nota', payload);
        notes.push;
    });
};
exports.addnote = addnote;
