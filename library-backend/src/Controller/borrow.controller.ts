import { Controller } from "./base.controller"
import { AppDataSource } from "../data-source"
import { Borrow } from "../entity/Borrow"

export class borrowController extends Controller{
    repository = AppDataSource.getRepository(Borrow)
}