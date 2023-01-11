import * as dotenv from 'dotenv'

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
}