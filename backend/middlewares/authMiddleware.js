const JWT = require("jsonwebtoken");

module.exports.authMiddleware = async(req, res, next) => {
    const {accessToken} = req.cookies;
    if (!accessToken) {
        return res.status(409).json({
            error: "Please Login First"
        });
    } else {
        try {
            const decodedToken = await JWT.verify(accessToken, process.env.JWT_SECRET);

            req.role = decodedToken.role;
            req.id = decodedToken.id;
            next(); 
          
        } catch (error) {
            return res.status(409).json({
                error: "Please login first"
            });
        }
    }
};