import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { DVD } from "../entity/DVD";

export class DvdController extends Controller{
    repository = AppDataSource.getRepository(DVD)
} 