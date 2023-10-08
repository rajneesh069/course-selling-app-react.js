import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

//Defining the authentication method
const adminSecret = process.env.ADMINSECRET;
const userSecret = process.env.USERSECRET;
const generateJwtAdmin = (admin) => {
    return jwt.sign(admin, adminSecret, { expiresIn: "5h" });
};

const authenticateJwtAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, adminSecret, (err, decoded) => {
            if (err) {
                if (err.expiredAt) {
                    console.log("expired");
                    res.status(403).json({ message: "token expired" });
                    return;
                }
                res.status(401).json({ message: "Unauthorized" });
            }
            req.admin = decoded;
            next();
        })
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}


const generateJwtUser = (user) => {
    return jwt.sign(user, userSecret, { expiresIn: "5h" });
};

const authenticateJwtUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, userSecret, (err, decoded) => {
            if (err) {
                if (err.expiredAt) {
                    console.log("expired");
                    res.status(403).json({ message: "token expired" });
                    return;
                }
                res.status(401).json({ message: "Unauthorized" });
            }
            req.user = decoded;
            next();
        })
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

export { generateJwtAdmin, authenticateJwtAdmin, generateJwtUser, authenticateJwtUser };