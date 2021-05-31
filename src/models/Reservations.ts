import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Flight } from "./Flights";
import { Ticket } from "./Tickets";
import { User } from "./Users";

@Entity("reservations")
class Reservation {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    date: Date;

    @ManyToOne(() => User, (user) => user.reservations, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    user: User;

    @OneToMany(() => Ticket, (ticket) => ticket.reservation, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    tickets: Ticket[];

    @ManyToOne(() => Flight, (flight) => flight.reservations, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    flight: Flight;
}

export { Reservation };
