const { Router, response } = require('express');
const { check, validationResult } = require('express-validator');
const Usuario = require('../models/usuario');
const router = Router();


router.get('/', async (req, res = response) => {
    const usuarios = await Usuario.find();

    res.json({
        ok: true,
        usuarios
    })
});

router.post('/', [
    check('correo', 'El email no es valido').isEmail(),
    check('cedula', 'Cedula debe ser numerica').isNumeric(),
    check('telefono', 'Telefono debe ser numerico').isNumeric()
], async (req, res) => {
    const { nombres, apellidos, cedula, correo, telefono } = req.body;
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }
    try {
        const existEmail = await Usuario.findOne({ correo });
        const existCedula = await Usuario.findOne({ cedula });

        if (existEmail || existCedula) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo y/o cedula esta duplicado'
            });
        }
        const usuario = new Usuario(req.body)
        await usuario.save();
        res.json({
            ok: true,
            usuario
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

});


module.exports = router;