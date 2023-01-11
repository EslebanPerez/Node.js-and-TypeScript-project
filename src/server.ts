import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { UserRouter } from './router/user.router';
import { configServer } from './config/config';

class ServerBootstrap extends configServer{
  public app: express.Application = express();
  private port: number = this.getNumberEnv('PORT');

  constructor(){
    super();
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(morgan('dev'))
    this.app.use(cors())

    this.app.use('/api', this.routers())

    this.listen();
  }

  routers(): Array<express.Router>{
    return [new UserRouter().router];
  }
  
  public listen(){
    this.app.listen(this.port, () => {
      console.log("Server listen on port "+ this.port + " 🚀");
    })
  }
}

new ServerBootstrap()

