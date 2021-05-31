import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./Reservations";

@Entity("tickets")
class Ticket {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Reservation, (reservation) => reservation.tickets, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    reservation: Reservation;
}

export { Ticket };
