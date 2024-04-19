import { AppDataSource } from "../data-source";
import { Cassette } from "../entity/Cassette";
import { Controller } from "./base.controller";


export class CassetteController extends Controller{
    repository = AppDataSource.getRepository(Cassette);
}