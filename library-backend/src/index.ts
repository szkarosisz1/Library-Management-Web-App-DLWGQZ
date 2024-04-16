import { AppDataSource } from "./data-source";
import { getRoutes } from "./routes";
import express from 'express';
import cors from 'cors'
import { handleAuthorizationError } from "./protect-routes";

async function main() {
  try {
    await AppDataSource.initialize();

    const app = express();

    app.use(cors({
      origin: 'http://localhost:4200',
      credentials: true
    }))

    app.use(express.json());
   
    app.use('/api', getRoutes(), handleAuthorizationError);

    app.listen(3000, () => {
      console.log("Listening on port 3000...");
    });

  } catch (error) {
    console.log(error);
  }
} 

main();

