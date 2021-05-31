import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./Reservations";

@Entity("users")
class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Reservation, (reservation) => reservation.user, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    reservations: Reservation[];
}
export { User };
