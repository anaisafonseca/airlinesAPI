import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Airline } from "./Airlines";
import { Airport } from "./Airports";
import { Reservation } from "./Reservations";

@Entity("flights")
class Flight {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    date: Date;

    @ManyToOne(() => Airport, (airport) => airport.flightsOrigin, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    origin: Airport;

    @ManyToOne(() => Airport, (airport) => airport.flightsDestination, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    destination: Airport;

    @ManyToOne(() => Airline, (airline) => airline.flights, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    airline: Airline;

    @Column("decimal", { precision: 8, scale: 2 })
    price: number;

    @Column()
    passengers: number;

    @OneToMany(() => Reservation, (reservation) => reservation.flight, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    reservations: Reservation[];
}

export { Flight };
