const validateRegister = async (req, res, next) => {
    const { name, email } = req.body;

    if(!name || !email ) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields."
        });
    }

    next ();
};

const validateCreateAccount = (req, res, next) => {
    const { password, confirmPassword } = req.body;

    if(!password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Please provide password and confirm password.",
        });
    }

    if(password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Passwords do not match.",
        });
    }

    if(password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters.",
        });
    }

    next();
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
    validateCreateAccount,
    validateLogin,
    validateUpdateProfile,
};