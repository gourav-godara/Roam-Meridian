const validateRegister = async (req, res, next) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields."
        });
    }

    next ();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide email and password.",
        });
    }

    next();
};

const validateUpdateProfile = (req, res, next) => {
    const { name, email } = req.body;

    if(!name && !email) {
        return res.status(400).json({
            success: false,
            message: "Please provide at least one field to update.",
        });
    }

    next();
};

module.exports = {
    validateRegister,
    validateLogin,
    validateUpdateProfile,
};