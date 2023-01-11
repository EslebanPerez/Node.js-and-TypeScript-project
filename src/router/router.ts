import { Router } from "express";

export class BaseRouter<T> { //T: Controller, U:Middleware
  public router: Router; // <- Declarando el tipo
  public controller: T;
  constructor(TController: { new(): T }) {
    this.router = Router() //<- Declarando la funcionalidad(lógica)
    this.controller = new TController()
    this.routes()
  }

  routes() {

  }
}