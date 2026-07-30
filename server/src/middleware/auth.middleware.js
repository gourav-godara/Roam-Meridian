const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};

// For routes that are public but behave differently for a logged-in user
// (e.g. GET /reviews?mine=true). Populates req.user when a valid token is
// present; otherwise just continues with req.user left unset instead of
// rejecting the request outright.
const optionalAuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            req.user = jwt.verify(token, process.env.JWT_SECRET);
        }
    } catch (error) {
        // An invalid/expired token on an optional route just means
        // "treat as logged out" rather than blocking the request.
    }

    next();
};

module.exports = authMiddleware;
module.exports.optionalAuthMiddleware = optionalAuthMiddleware;