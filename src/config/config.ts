import * as dotenv from 'dotenv'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { DataSourceOptions } from 'typeorm'

export abstract class configServer {
  constructor(){
    const nodeNameEnv = this.createPathEnv(this.nodeEnv)
    dotenv.config({
      path: nodeNameEnv,
    })
  }
  public getEnvironment(key:string): string | undefined{
    return process.env[key] // Here we return a specific environment variable like 'process.env.PORT' but in this way 'process.env[PORT]
  }

  public getNumberEnv(key: string): number{ // 'key' is the name of the variable ex: PORT 
    return Number(this.getEnvironment(key))
  }

  public get nodeEnv(): string{ // Here we pass the execution environment
    return this.getEnvironment('NODE_ENV')?.trim() || "";
  }
  
  public createPathEnv(path: string): string{ // This function detects the environment in witch the application is executed
    const arrEnv:Array<string> = ['env']
    if(path.length>0){
      const stringToArray = path.split('.') // <- ['production']
      //console.log(stringToArray);
      arrEnv.unshift(...stringToArray)
    }
    //console.log(arrEnv); <- ['production', 'env']
    return '.'+arrEnv.join('.') // .production.env - take the name of the file 
  }

  public get typeORMConfig(): DataSourceOptions{
    return {
      type:"mysql",
      host: this.getEnvironment("DB_HOST"),
      port: this.getNumberEnv("DB_PORT"),
      username: this.getEnvironment("DB_USER"),
      password: this.getEnvironment("DB_PASSWORD"),
      database: this.getEnvironment("DB_DATABASE"),
      entities: [__dirname + "/../**/*.entity{.ts,.js}"], // * Search in any folder and any file with finish entity ts or js
      migrations:[__dirname + "/../../migrations/*{.ts,.js}"],
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy()
      
    }
  }
}