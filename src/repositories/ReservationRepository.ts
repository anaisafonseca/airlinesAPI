import { EntityRepository, Repository } from "typeorm";
import { Reservation } from "../models/Reservations";

@EntityRepository(Reservation)
class ReservationsRepositories extends Repository<Reservation> {}
export { ReservationsRepositories };
