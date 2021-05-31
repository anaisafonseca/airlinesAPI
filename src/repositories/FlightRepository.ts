import { EntityRepository, Repository } from "typeorm";
import { Flight } from "../models/Flights";

@EntityRepository(Flight)
class FlightsRepositories extends Repository<Flight> {}
export { FlightsRepositories };
