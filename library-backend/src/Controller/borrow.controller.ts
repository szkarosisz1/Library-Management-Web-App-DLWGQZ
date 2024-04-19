import { AppDataSource } from "../data-source"
import { Borrow } from "../entity/Borrow"
import { Controller } from "./base.controller"

export class BorrowController extends Controller{
    repository = AppDataSource.getRepository(Borrow);
}