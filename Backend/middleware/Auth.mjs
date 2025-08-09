import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

// Funcion para dar el token de acceso al usuario
export function Auth(user){
    const token = jwt.sign(
        { id_user: user.id_user, email: user.email},
        process.env.DB_JWT_SECRET || 'default_secret',
        { expiresIn: process.env.JWT_EXPIRATION || '1h' }
    )
    return token;
}

export const middlewareUserToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ message: 'Token no encontrado' });
    }
    try{
        const decode = jwt.verify(token, process.env.DB_JWT_SECRET);
        if(decode){
            req.user = decode;
            next()
        }
        else{
            console.log("El token asignado al usuario no coincide")
        }
    }
    catch(error){
        res.clearCookie('token');
        return res.status(403).json({ message: 'Token invalido' });
    }
}
