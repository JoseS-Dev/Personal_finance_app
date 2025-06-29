import { validateFinance, validateFinanceUpdate} from '../Validations/SchemaFn.mjs';
export class ControllerFinance {
    constructor({ModelsFinance}){
        this.ModelsFinance = ModelsFinance;
    }
    // Obtener todas las finanzas
    getAllFinances = async (req, res) => {
        try{
            const finances = await this.ModelsFinance.getAllFinances();
            if(finances.length > 0){
                return res.status(200).json({
                    message: "Finanzas obtenidas correctamente",
                    data: finances
                });
            }
            else{
                return res.status(404).json({
                    message: "No se encontraron finanzas",
                    data: []
                });
            }
        }
        catch(error){
            console.error("Error al obtener las finanzas:", error);
            return res.status(500).json({
                message: "Error al obtener las finanzas",
                error: error.message
            });
        }
    }

    // Obtener las finanzas de un usuario
    getByUserID = async (req, res) => {
        const { id_user } = req.params;
        try{
            const finances = await this.ModelsFinance.getByUserID({ id_user });
            if(finances && finances.length > 0){
                return res.status(200).json({
                    message: "Finanzas obtenidas correctamente",
                    data: finances
                });
            }
            else{
                return res.status(404).json({
                    message: "No se encontraron finanzas para el usuario",
                    data: []
                });
            }
        }
        catch(error){
            console.error("Error al obtener las finanzas del usuario:", error);
            return res.status(500).json({
                message: "Error al obtener las finanzas del usuario",
                error: error.message
            });
        }
    }

    // Obtener las finanzas por su cantidad
    getByAmount = async (req, res) => {
        const { amount_finance } = req.params;
        try{
            const finances = await this.ModelsFinance.getByAmount({ amount_finance });
            if(finances && finances.length > 0){
                return res.status(200).json({
                    message: "Finanzas obtenidas correctamente",
                    data: finances
                });
            }
            else{
                return res.status(404).json({
                    message: "No se encontraron finanzas con esa cantidad",
                    data: []
                });
            }
        }
        catch(error){
            console.error("Error al obtener las finanzas por cantidad:", error);
            return res.status(500).json({
                message: "Error al obtener las finanzas por cantidad",
                error: error.message
            });
        }
    }

    // Obtener las finanzas por el tipo de finanza
    getByType = async (req, res) => {
        const { type_finance } = req.params;
        try{
            const finances = await this.ModelsFinance.getByType({ type_finance });
            if(finances && finances.length > 0){
                return res.status(200).json({
                    message: "Finanzas obtenidas correctamente",
                    data: finances
                })
            }
            else{
                return res.status(404).json({
                    message: "No se encontraron finanzas con ese tipo",
                    data: []
                });
            }
        }
        catch(error){
            console.error("Error al obtener las finanzas por tipo:", error);
            return res.status(500).json({
                message: "Error al obtener las finanzas por tipo",
                error: error.message
            });
        }
    }

    // Obtener la categoria de la finanza
    getByCategory = async (req, res) => {
        const { category_finance } = req.params;
        try{
            const finances = await this.ModelsFinance.getByCategory({ category_finance });
            if(finances && finances.length > 0){
                return res.status(200).json({
                    message: "Finanzas obtenidas correctamente",
                    data: finances
                });
            }
            else{
                return res.status(404).json({
                    message: "No se encontraron finanzas con esa categoria",
                    data: []
                });
            }
        }
        catch(error){
            console.error("Error al obtener las finanzas por categoria:", error);
            return res.status(500).json({
                message: "Error al obtener las finanzas por categoria",
                error: error.message
            });
        }
    }

    // Obtener el mes y el año de una finanza
    getByDate = async(req, res) => {
       const { date_finance } = req.params;
       try{
            const financeDate = await this.ModelsFinance.getByDate({date_finance});
            if(financeDate && financeDate.length > 0){
                return res.status(200).json({
                        message: "Finanzas obtenidas correctamente",
                        data: financeDate
                });
            }
            else{
                return res.status(404).json({
                    message: "No se encontraron finanzas con esa categoria",
                    data: []
                });
            }
       }
       catch(error){
            console.error("Error al obtener las finanzas por categoria:", error);
            return res.status(500).json({
                message: "Error al obtener las finanzas por categoria",
                error: error.message
            });
       }
    }

    // Crear una nueva finanza
    createFinance = async (req, res) => {
        const { id_user } = req.params;
        const result = validateFinance(req.body);
        try{
            if(!result.success){
                return res.status(400).json({
                    message: "Error de validación",
                    errors: result.error.errors
                });
            }
            const FinanceCreated = await this.ModelsFinance.createFinance({ id_user, finance: result.data });
            if(FinanceCreated){
                return res.status(201).json({
                    message: "Finanza creada correctamente",
                    data: FinanceCreated
                });
            }
            else{
                return res.status(400).json({
                    message: "Error al crear la finanza",
                    data: null
                });
            }
        }
        catch(error){
            console.error("Error al crear la finanza:", error);
            return res.status(500).json({
                message: "Error al crear la finanza",
                error: error.message
            });
        }
    }

    // Eliminar una finanza por el nombre
    deleteFinanceByName = async (req, res) => {
        const { id_user, description_finance } = req.params;
        try{
            const FinanceDeleted = await this.ModelsFinance.deleteFinanceByName({ id_user, description_finance });
            if(FinanceDeleted){
                return res.status(200).json({
                    message: "Finanza eliminada correctamente",
                    data: FinanceDeleted
                });
            }
            else{
                return res.status(404).json({
                    message: "Finanza no encontrada o error al eliminar",
                    data: null
                });
            }
        }
        catch(error){
            console.error("Error al eliminar la finanza:", error);
            return res.status(500).json({
                message: "Error al eliminar la finanza",
                error: error.message
            });
        }
    }

    // Actualizar una finanza por su ID
    updateFinanceByID = async (req, res) => {
        const { id_finance } = req.params;
        const result = validateFinanceUpdate(req.body);
        try{
            if(!result.success){
                return res.status(400).json({
                    message: "Error de validación",
                    errors: result.error.errors
                });
            }
            const FinanceUpdated = await this.ModelsFinance.updateFinanceByID({ id_finance, finance: result.data });
            if(FinanceUpdated){
                return res.status(200).json({
                    message: "Finanza actualizada correctamente",
                    data: FinanceUpdated
                });
            }
            else{
                return res.status(404).json({
                    message: "Finanza no encontrada o error al actualizar",
                    data: null
                });
            }
        }
        catch(error){
            console.error("Error al actualizar la finanza:", error);
            return res.status(500).json({
                message: "Error al actualizar la finanza",
                error: error.message
            });
        }
    }
}