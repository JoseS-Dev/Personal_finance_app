import {Router} from 'express';
import { ControllerFinance } from '../Controller/Finance.mjs';
import { ModelsFinance } from '../Models/Finance.mjs';

const router = Router();
const controllerfinance = new ControllerFinance({ModelsFinance: ModelsFinance});
export const RoutesFinance = router;

// GET
// Obtener todas las finanzas
RoutesFinance.get('/', )