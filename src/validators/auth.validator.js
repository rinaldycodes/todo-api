exports.register = async (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).send({
            code: 400,
            message: 'Name can not be empty!',
        });
    }

    if (!req.body.email) {
        return res.status(400).send({
            code: 400,
            message: 'Email can not be empty!',
        });
    }

    if (!req.body.password) {
        return res.status(400).send({
            code: 400,
            message: 'Password can not be empty!',
        });
    }

    next();
};

exports.login = async (req, res, next) => {
    if (!req.body.email) {
        return res.status(400).send({
            code: 400,
            message: 'Email can not be empty!',
        });
    }

    if (!req.body.password) {
        return res.status(400).send({
            code: 400,
            message: 'Password can not be empty!',
        });
    }

    next();
};