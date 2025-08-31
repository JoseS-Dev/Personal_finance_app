import { connection } from "./db/connection.mjs";
export class ModelsFinance {
    // Obtener todas las finanzas
    static async getAllFinances(){
        const [ Finances ] = await connection.query("SELECT * FROM register_finance");
        if(Finances.length > 0){
            console.log("Finanzas obtenidas correctamente");
            return Finances;
        }
        else{
            console.log("No hay finanzas registradas");
            return [];
        }
    }

    // Obtener las finanzas de un usuario
    static async getByUserID({ id_user }){
        if(!id_user) return { error: "ID de usuario no proporcionado" };
        const [ Finances ] = await connection.query(
            "SELECT id_finance,type_finance,category_finance,amount_finance,description_finance,DATE_FORMAT(date_finance, '%Y-%m-%d') as date_finance FROM register_finance WHERE id_user = ?", 
            [id_user]);
        if(Finances.length > 0){
            console.log("Finanzas obtenidas correctamente");
            return Finances;
        }
        else{
            console.log("No hay finanzas registradas para este usuario");
            return [];
        }
    }

    // Obtener una finanza por su ID primario
    static async getFinanceByID({id_finance}){
        if(!id_finance) return {error: "ID de finanza no encontrado"};
        const [ Finance ] = await connection.query("SELECT * FROM register_finance WHERE id_finance = ?", [id_finance]);
        if (Finance.length > 0){
            console.log("Finanzas obtenidas correctamente");
            return Finance;
        }
        else{
            console.log("No hay finanzas registradas para este usuario");
            return [];
        }
    }

    // Obtener las finanzas por su cantidad
    static async getByAmount({amount_finance}){
        if(!amount_finance) return { error: "Cantidad no propocionada" };
        const [ Finances ] = await connection.query("SELECT * FROM register_finance WHERE amount_finance = ?", [amount_finance]);
        if(Finances.length > 0){
            console.log("Finanzas obtenidas correctamente");
            return Finances;
        }
    }

    // Obtener las finanzas por el tipo de finanza
    static async getByType({ type_finance }){
        if(!type_finance) return { error: "Tipo de finanza no proporcionado"};
        const [ Finances ] = await connection.query("SELECT * FROM register_finance WHERE type_finance = ?", [type_finance]);
        if(Finances.length > 0){
            console.log("Finanzas obtenidas correctamente");
            return Finances;
        }
    }

    // Obtener la categoria de la finanza
    static async getByCategory({ category_finance }){
        if(!category_finance) return { error: "Categoria de finanza no proporcionada" };
        const [ Finances ] = await connection.query("SELECT * FROM register_finance WHERE category_finance = ?", [category_finance]);
        if(Finances.length > 0){
            console.log("Finanzas obtenidas correctamente");
            return Finances;
        }
    }

    // Obtener el mes y el año de la finanza
    static async getByDate({date_finance, id_user}){
        if(date_finance){
            const [FinancesDate] = await connection.query(
                `SELECT MONTH(date_finance) AS mes, YEAR(date_finance) as Año, type_finance,amount_finance FROM register_finance WHERE MONTH(date_finance) = MONTH(?) AND YEAR(date_finance) = YEAR(?) AND id_user = ?`,
                [date_finance, date_finance, id_user]
            )
            if(FinancesDate.length > 0){
                console.log("Fechas encontradas exitosamente");
                return FinancesDate;
            }
            else{
                console.log("Hubo un error a la hora de encontrar la fecha");
                return null;
            }
        }
    }

    // Crear una nueva finanza
    static async createFinance({ id_user, finance}){
        if(!id_user || !finance) return { error: "ID de usuario o finanza no proporcionados" };
        // Se verifica si el usuario esta loguado
        const [ user ] = await connection.query("SELECT * FROM login_users WHERE id_user = ? AND is_active = 1", [id_user]);
        if(user.length > 0){
            console.log("Usuario encontrado, creando finanza...");
            const userID = user[0].id_user;
            console.log(userID)
            const { description_finance, date_finance, type_finance, category_finance, amount_finance } = finance;
            // Se inserta la nueva finanza en la base de datos
            const [ financeCreated ] = await connection.query(
                `INSERT INTO register_finance (id_user, description_finance, date_finance, type_finance, category_finance, amount_finance)
                VALUES (? ,?, ?, ?, ?, ?)`,
                [userID, description_finance, date_finance, type_finance, category_finance, amount_finance]
            )
            
            if(financeCreated.affectedRows > 0){
                console.log("Finanza creada correctamente");
                return {
                    id_finance: financeCreated.insertId,
                    id_user: userID,
                    description_finance,
                    date_finance,
                    type_finance,
                    category_finance,
                    amount_finance
                };
            }
            else{
                console.log("Error al crear la finanza");
                return { error: "Error al crear la finanza" };
            }
        }
        else{
            console.log("El usuario no esta loguado")
        }
    }

    // Eliminar una finanza por el nombre
    static async deleteFinanceByName({ id_finance }){
        if(!id_finance ) return { error: "ID de la finanza no proporcionados"};
        // Se elimina la finanza de la base de datos
        const [ financeDeleted ] = await connection.query(
            `DELETE FROM register_finance WHERE id_finance = ?`,
            [id_finance]
        )
        if(financeDeleted.affectedRows > 0){
            console.log("Finanza eliminada correctamente");
            return financeDeleted
        }
        else{
            console.log("Error al eliminar la finanza o no se encontró la finanza");
            return { error: "Error al eliminar la finanza o no se encontró la finanza" };
        }
    }

    // Actualizar una finanza por su ID
    static async updateFinanceByID({ id_finance, finance }){
        if(!id_finance || !finance) return { error: "ID de finanza o finanza no proporcionados" };
        // Se actualiza la finanza en la base de datos
        const { description_finance, date_finance, type_finance, category_finance, amount_finance } = finance;
        const [ financeUpdated ] = await connection.query(
            `UPDATE register_finance SET description_finance = ?, date_finance = ?, type_finance = ?, category_finance = ?, amount_finance = ? WHERE id_finance = ?`,
            [description_finance, date_finance, type_finance, category_finance, amount_finance, id_finance]
        )
        if(financeUpdated.affectedRows > 0){
            console.log("Finanza actualizada correctamente");
            return {
                id_finance,
                ...finance
            };
        }
        else{
            console.log("Error al actualizar la finanza o no se encontró la finanza");
            return { error: "Error al actualizar la finanza o no se encontró la finanza" };
        }
    }
    
}