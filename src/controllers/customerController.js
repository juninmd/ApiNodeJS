'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const ValidationContract = require('../validators/fluent-validator');
const customerRepository = require('../repositories/customerRepository');
const md5 = require('md5');

exports.get = async(req, res, next) => { 
    try{
        var data = await customerRepository.get();
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres');

    if(!contract.isValid()){
        res.status(400).send(contract.errors().end());
        return;
    }

    try{
        await customerRepository.post({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (e){
        res.status(500).send({
            message: 'Erro ao cadastrar cliente!'
        });
    }
};