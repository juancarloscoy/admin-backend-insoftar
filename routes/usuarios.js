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
    // check('telefono', 'Telefono debe ser numerico').isNumeric(),
    check('nombres', 'El nombre es requerido').not().isEmpty(),
], async (req, res) => {
    const { cedula, correo } = req.body;
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


router.put('/:id', [
    check('correo', 'El email no es valido').isEmail(),
    check('cedula', 'Cedula debe ser numerica').isNumeric(),
    check('telefono', 'Telefono debe ser numerico').isNumeric()
], async (req, res = response) => {
    const uid = req.params.id;
    try {

        const existeusuario = await Usuario.findById(uid);

        if (!existeusuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario para ese id'
            })
        }

        const campos = req.body;
        if (existeusuario.correo === req.body.correo) {
            delete campos.correo;
        } else {
            const existEmail = await Usuario.findOne({ correo: req.body.correo });
            if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese correo'
                })
            }
        }
        if (existeusuario.cedula === req.body.cedula) {
            delete campos.cedula;
        } else {
            const existCedula = await Usuario.findOne({ cedula: req.body.cedula });
            if (existCedula) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con esa cedula'
                })
            }
        }


        const usuarioUpdate = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        res.json({
            ok: true,
            usuario: usuarioUpdate
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

});

module.exports = router;