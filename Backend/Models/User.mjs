import { connection } from "./db/connection.mjs";
import bcrypt from "bcrypt";


export class ModelsUser {
    // Registrar un nuevo usuario
    static async registerUser({user}){
        if(user){
            const { name_user, lastName_user, email_user, password_user } = user;
            // Se verifica si el correo ya esta registrado en la base de datos
            const [existingUser] = await connection.query(
                `SELECT * FROM register_user WHERE email_user = ?`,
                [email_user]
            )
            if (existingUser.length > 0){
                console.error("El correo electrónico ya está registrado.");
                return { message: "El correo electrónico ya está registrado." };
            }
            else{
                // Si no esta registrado, se inserta el nuevo usuario
                const hashedPassword = await bcrypt.hash(password_user, 10);
                const [newUser] = await connection.query(
                    `INSERT INTO register_user (name_user, lastName_user, email_user, password_user) VALUES (?, ?, ?, ?)`,
                    [name_user, lastName_user, email_user, hashedPassword]
                );
                if (newUser.affectedRows <= 0) return { message: "Error al registrar el usuario." };
                return newUser[0];
            }
        }
    }

    // Iniciar sesión de un usuario
    static async LoginUser({user}){
        if(user){
            const {email_user, password_user} = user;
            // Se verifica si el correo existe en la base de datos
            const [existingUser] = await connection.query(
                `SELECT * FROM register_user WHERE email_user = ?`,
                [email_user]
            );

            if(existingUser.length > 0){
                const userData = existingUser[0];
                // Se verifica si la contraseña es correcta
                const isPasswordValid = await bcrypt.compare(password_user, userData.password_user);
                if(isPasswordValid){
                    // Si la constraseña es correcta, se retorna el usuario sin la contraseña
                    const { password_user, ...userWithoutPassword } = userData;
                    await connection.query(
                        `INSERT INTO login_user (id_user,is_active) VALUES (?,?)`,
                        [userWithoutPassword.id_user, 1]
                    )
                    return userWithoutPassword;
                }
            }
        }
    }

    // DesLoguar un usuario
    static async LogoutUser({user}){
        const {email_user} = user;
        // Se verifica si el correo existe en la base de datos
        const [existingUser] = await connection.query(
            `SELECT * FROM register_user WHERE email_user = ?`,
            [email_user]
        );
        if(existingUser.length > 0){
            const userData = existingUser[0];
            // Se actualiza el estado del usuario a inactivo
            const [LogoutUser] = await connection.query(
                `UPDATE login_user SET is_active = ? WHERE id_user = ?`,
                [0, userData.id_user]
            )
            if(LogoutUser.affectedRows <= 0) return { message: "Error al desloguear el usuario." };
            return userData;
        }
    }
}