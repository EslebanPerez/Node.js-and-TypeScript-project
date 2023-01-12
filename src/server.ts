import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { UserRouter } from './router/user.router';
import { configServer } from './config/config';
import { DataSource } from 'typeorm';

class ServerBootstrap extends configServer{
  public app: express.Application = express();
  private port: number = this.getNumberEnv('PORT');

  constructor(){
    super();
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    
    this.dbConnect();
    
    this.app.use(morgan('dev'))
    this.app.use(cors())
  
    this.app.use('/api', this.routers())

    this.listen();
  }

  routers(): Array<express.Router>{
    return [new UserRouter().router];
  }

  async dbConnect(): Promise<void>{
    try {
      await new DataSource(this.typeORMConfig).initialize();
      console.log("Database Connected");
    } catch (error) {
      console.log(`Database Connection error: ${error}`);
    }
  }
  
  public listen(){
    this.app.listen(this.port, () => {
      console.log("Server listen on port "+ this.port + " 🚀");
    })
  }
}

new ServerBootstrap()

