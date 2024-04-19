import { AppDataSource } from "../data-source";
import { Member } from "../entity/Member";
import { Controller } from "./base.controller";

export class MemberController extends Controller{
    repository = AppDataSource.getRepository(Member);
}