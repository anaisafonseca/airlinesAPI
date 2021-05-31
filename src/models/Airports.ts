import {
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Airline } from "./Airlines";
import { Flight } from "./Flights";

@Entity("airports")
class Airport {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    location: string;

    @ManyToMany(() => Airline, (airline) => airline.airports, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    airlines: Airline[];

    @OneToMany(() => Flight, (flight) => flight.origin, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    flightsOrigin: Flight[];

    @OneToMany(() => Flight, (flight) => flight.destination, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    flightsDestination: Flight[];
}

export { Airport };
