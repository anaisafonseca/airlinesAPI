import { EntityRepository, Repository } from "typeorm";
import { Airport } from "../models/Airports";

@EntityRepository(Airport)
class AirportsRepositories extends Repository<Airport> {}
export { AirportsRepositories };
