import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Cassette } from "../entity/Cassette";


export class CassetteController extends Controller{
    repository = AppDataSource.getRepository(Cassette)
}