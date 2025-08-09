import { Router } from "express";
import { ControllerUsers } from "../Controller/Users.mjs";
import { ModelsUser } from "../Models/User.mjs";
import { middlewareEmail } from "../middleware/MiddlewareEmail.mjs";
import { middlewareUserToken } from "../middleware/Auth.mjs";
const router = Router();
const controllerusers = new ControllerUsers({ ModelsUser: ModelsUser });
export const RoutesUsers = router;

// GET
// Registrar un nuevo usuario
RoutesUsers.post('/', middlewareEmail , controllerusers.registerUser);
// Login de un usuario
RoutesUsers.post('/Login', controllerusers.LoginUser);
// Logout de un usuario
RoutesUsers.post('/Logout', controllerusers.LogoutUser);
//Verificacion del token
RoutesUsers.post('/Verify', middlewareUserToken, controllerusers.UserToken)
// Actualizar un usuario
RoutesUsers.patch('/Update/:id_user', controllerusers.UpdateUser);
