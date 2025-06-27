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
                if (newUser.affectedRows > 0){
                    console.log("Usuario registrado correctamente.");
                    return newUser[0];
                }
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
                console.log("Usuario encontrado, verificando contraseña...");
                const userData = existingUser[0];
                // Se verifica si la contraseña es correcta
                const isPasswordValid = await bcrypt.compare(password_user, userData.password_user);
                if(isPasswordValid){
                    // Si la constraseña es correcta, se retorna el usuario sin la contraseña
                    const { password_user, ...userWithoutPassword } = userData;
                    // Se verifica si ya existe el usuario en la tabla de login_users
                    const [existingLoginUser] = await connection.query(
                        `SELECT * FROM login_users WHERE id_user = ?`,
                        [userData.id_user]
                    );
                    if(existingLoginUser.length > 0){
                        // Si ya existe, se actualiza el estado del usuario a activo
                        const [updateUser] = await connection.query(
                            `UPDATE login_users SET is_active = ? WHERE id_user = ?`,
                            [1, userData.id_user]
                        );
                        if(updateUser.affectedRows <= 0) return { message: "Error al iniciar sesión." };
                    } else {
                        // Si no existe, se inserta el usuario en la tabla de login_users
                        const [insertUser] = await connection.query(
                            `INSERT INTO login_users (id_user, is_active) VALUES (?, ?)`,
                            [userData.id_user, 1]
                        );
                        if(insertUser.affectedRows <= 0) return { message: "Error al iniciar sesión." };
                    }
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
                `UPDATE login_users SET is_active = ? WHERE id_user = ?`,
                [0, userData.id_user]
            )
            if(LogoutUser.affectedRows <= 0) return { message: "Error al desloguear el usuario." };
            console.log("Usuario deslogueado correctamente.");
            return userData;
        }
    }

    // Actualizar los datos de un usuario
    static async UpdateUser({id_user,user}){
        if(user){
            // Se verifica si el usuario esta loguado
            const { account_balance_user, meta_user } = user;
            const [existingUser] = await connection.query(
                `SELECT * FROM login_users WHERE id_user = ? AND is_active = ?`,
                [id_user, 1]
            );
            if(existingUser.length > 0){
                console.log("Usuario logueado, actualizando datos...");
                // Si el usuario esta loguado se actualizan los datos
                const [updateUser] = await connection.query(
                    `UPDATE register_user SET account_balance_user = ?, meta_user = ? WHERE id_user = ?`,
                    [account_balance_user, meta_user, id_user]
                )
                if(updateUser.affectedRows > 0){
                    // Si se actualiza correctamente, se retorna el usuario actualizado
                    const [ userDB ] = await connection.query(
                        `SELECT * FROM register_user WHERE id_user = ?`,
                        [id_user]
                    )
                    if(userDB.length > 0){
                        console.log("Usuario actualizado correctamente.");
                        return userDB[0];
                    }
                    else{
                        console.error("Error al actualizar el usuario.");
                        return { message: "Error al actualizar el usuario." };
                    }
                }
            }
            
        }
    }
}