import { validateUser, validateLogin, validateUpdateUser } from "../Validations/SchemaUsr.mjs";
import { Auth } from "../middleware/Auth.mjs";

export class ControllerUsers {
    constructor({ ModelsUser }){
        this.ModelsUser = ModelsUser;
    }
    
    // Registrar un nuevo usuario
    registerUser = async (req, res) => {
        try{
            const result = validateUser(req.body);
            if (!result.success) {
                return res.status(400).json({ error: result.error.errors });
            }
            const user = await this.ModelsUser.registerUser({ user: result.data});
            return res.status(201).json({
                message: "Usuario registrado correctamente",
                data: user,
            })
        }
        catch(error){
            console.error("Error al registrar el usuario:", error);
            return res.status(500).json({ message: "Error al registrar el usuario." });
        }
    }

    // Iniciar sesión de un usuario
    LoginUser = async( req, res) => {
        try{
            const result = validateLogin(req.body);
            if (!result.success) {
                return res.status(400).json({ error: result.error.errors });
            }
            const user = await this.ModelsUser.LoginUser({ user: result.data });
            if(!user) return res.status(401).json({ message: "Correo electrónico o contraseña incorrectos." });
            return res.cookie("token", Auth(user), {
                httpOnly: true
            }).status(200).json({
                message: "Usuario logueado correctamente",
                data: user,
            });
        }
        catch(error){
            console.error("Error al iniciar sesión:", error);
            return res.status(500).json({ message: "Error al iniciar sesión." });
        }
    }

    //Token de usuario
    UserToken = async (req, res) => {
        if(!req.user){
            return res.status(401).json({ 
                message: "No esta autorizado",
                isAuthorized: false
            });
        }
        return res.status(200).json({
            message: "Usuario verificado exitosamente",
            isAuthorized: true
        });
    }

    // Cerrar Sesión un usuario
    LogoutUser = async (req, res) => {
        try{
            const user = await this.ModelsUser.LogoutUser({ user: req.body });
            return res.clearCookie("token").status(200).json({
                message: "Usuario deslogueado correctamente",
                userLogoutOut: user
            });
        }
        catch(error){
            console.error("Error al cerrar sesión:", error);
            return res.status(500).json({ message: "Error al cerrar sesión." });
        }
    }

    // Actualizar los datos de un usuario
    UpdateUser = async (req, res) => {
        try{
            const { id_user } = req.params;
            const result = validateUpdateUser(req.body);
            if (!result.success) {
                return res.status(400).json({ error: result.error.errors });
            }
            const user = await this.ModelsUser.UpdateUser({ id_user, user: result.data });
            if(!user) return res.status(404).json({ message: "Usuario no encontrado." });
            return res.status(200).json({
                message: "Usuario actualizado correctamente",
                data: user,
            });
        }
        catch(error){
            console.error("Error al actualizar el usuario:", error);
            return res.status(500).json({ message: "Error al actualizar el usuario." });
        }
    }

}