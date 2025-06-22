import { Router } from "express";
import { ControllerUsers } from "../Controller/Users.mjs";
import { ModelsUser } from "../Models/User.mjs";

const router = Router();
const controllerusers = new ControllerUsers({ ModelsUser: ModelsUser });
export const RoutesUsers = router;

// GET
// Registrar un nuevo usuario
RoutesUsers.post('/', controllerusers.registerUser);
// Login de un usuario
RoutesUsers.post('/Login', controllerusers.LoginUser);
// Logout de un usuario
RoutesUsers.post('/Logout', controllerusers.LogoutUser);
