import { EntityRepository, Repository } from "typeorm";
import { Airline } from "../models/Airlines";

@EntityRepository(Airline)
class AirlinesRepositories extends Repository<Airline> {}
export { AirlinesRepositories };
