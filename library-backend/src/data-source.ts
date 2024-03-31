import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Book } from "./entity/Book"
import { Borrow } from "./entity/Borrow"
import { Cassette } from "./entity/Cassette"
import { DVD } from "./entity/DVD"
import { Member } from "./entity/Member"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "library",
    synchronize: true,
    logging: false,
    entities: [User, Book, Borrow, Cassette, DVD, Member],
    migrations: [],
    subscribers: [],
})
