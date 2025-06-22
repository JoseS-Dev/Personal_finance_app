import express,{json} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { RoutesFinance } from './Routes/Finance.mjs';
import { RoutesUsers } from './Routes/User.mjs';

dotenv.config();
const app = express();

app.use(cors());
app.use(json());
app.use(cookieParser());

app.use('/Finances', RoutesFinance);
app.use('/Users', RoutesUsers);

// Inicialize the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})
