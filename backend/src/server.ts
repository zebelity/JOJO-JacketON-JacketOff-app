import express from 'express';
import cors from 'cors'
import * as dotenv from 'dotenv'

import { weatherRouter } from './routes/weather';
import { greetingRouter } from './routes/greeting'

dotenv.config({ path: '.env.local' })
dotenv.config()

const app = express();
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json());
app.use('/', weatherRouter);
app.use('/greeting', greetingRouter)



app.listen(PORT, () => { console.log(`Server listening to port ${PORT}`) })
