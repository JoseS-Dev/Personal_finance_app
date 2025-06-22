import {Router} from 'express';
import { ControllerFinance } from '../Controller/Finance.mjs';
import { ModelsFinance } from '../Models/Finance.mjs';

const router = Router();
const controllerfinance = new ControllerFinance({ModelsFinance: ModelsFinance});
export const RoutesFinance = router;

// GET
// Obtener todas las finanzas
RoutesFinance.get('/', controllerfinance.getAllFinances);
// Obtener las finanzas de un usuario
RoutesFinance.get('/user/:id_user', controllerfinance.getByUserID);
// Obtener las finanzas por su cantidad
RoutesFinance.get('/amount/:amount_finance', controllerfinance.getByAmount);
// Obtener las finanzas por el tipo de finanza
RoutesFinance.get('/type/:type_finance', controllerfinance.getByType);
// Obtener la categoria de la finanza
RoutesFinance.get('/category/:category_finance', controllerfinance.getByCategory);
// Crear una nueva finanza
RoutesFinance.post('/create/:id_user', controllerfinance.createFinance);
// Actualizar una finanza
RoutesFinance.patch('/update/:id_finance', controllerfinance.updateFinanceByID);
// Eliminar una finanza
RoutesFinance.delete('/delete/:id_user/name/:name_finance', controllerfinance.deleteFinanceByName);
