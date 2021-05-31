import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Flight } from "./Flights";
import { Airport } from "./Airports";

@Entity("airlines")
class Airline {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToMany(() => Airport, (airport) => airport.airlines, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinTable()
    airports: Airport[];

    @Column()
    name: string;

    @OneToMany(() => Flight, (flight) => flight.airline, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    flights: Flight[];
}
export { Airline };
