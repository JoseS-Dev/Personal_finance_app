import { validateUser, validateLogin } from "../Validations/SchemaUsr.mjs";
import { Auth } from "../middleware/Auth.mjs";

export class ControllerUsers {
    constructor({ ModelsUser }){
        this.ModelsUser = ModelsUser;
    }
    
}