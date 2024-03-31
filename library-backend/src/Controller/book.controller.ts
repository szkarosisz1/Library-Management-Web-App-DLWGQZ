import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";

export class bookController extends Controller{
    repository = AppDataSource.getRepository(Book);
}