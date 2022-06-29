import jwt from 'jsonwebtoken';
import { creatError } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(creatError(401, "You are not authenticated"));
    }

    jwt.verify(token, process.env.JWT, (err, user)=>{
        if (err) return next(creatError(403, "token is not valide"));
        req.user = user;
        next();
    })
}


// _______ verify is user exist or not _______
export const verifyUser = (req, res, next) => {
    // if user is not exist in database (authenticated)
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            if (err) return next(creatError(403, "You are not authorized"));
        }
    });
}

// ________ verify is admin or not ________
export const verifyAdmin = (req, res, next) => {
    // if user is not exist in database (authenticated)
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            if (err) return next(creatError(403, "You are not authorized"));
        }
    });
}