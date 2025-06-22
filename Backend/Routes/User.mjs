import { Router } from "express";
import { ControllerFinance } from "../Controller/Finance.mjs";
import { ModelsFinance } from "../Models/Finance.mjs";

const router = Router();
const controllerFinance = new ControllerFinance({ ModelsFinance: ModelsFinance });
export const RoutesUsers = router;

// GET
RoutesUsers.post('/', )