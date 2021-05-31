import { EntityRepository, Repository } from "typeorm";
import { Ticket } from "../models/Tickets";

@EntityRepository(Ticket)
class TicketsRepositories extends Repository<Ticket> {}
export { TicketsRepositories };
