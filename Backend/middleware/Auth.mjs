import jwt from 'jsonwebtoken';

// Funcion para dar el token de acceso al usuario
export function Auth(user){
    const token = jwt.sign(
        { id_user: user.id_user, email: user.email},
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: process.env.JWT_EXPIRATION || '1h' }
    )
    return token;
}
