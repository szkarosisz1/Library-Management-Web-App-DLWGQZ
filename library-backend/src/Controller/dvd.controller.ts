import { AppDataSource } from "../data-source";
import { DVD } from "../entity/DVD";
import { Controller } from "./base.controller";

export class DvdController extends Controller{
    repository = AppDataSource.getRepository(DVD);
} 