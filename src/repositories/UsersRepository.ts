import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/Users";

@EntityRepository(User)
class UsersRepositories extends Repository<User> {}
export { UsersRepositories };
