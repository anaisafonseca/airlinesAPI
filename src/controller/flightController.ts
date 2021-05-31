import { Request, Response } from "express";
import {
    getCustomRepository,
    Like,
    MinKey,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Reservation } from "../models/Reservations";
import { Ticket } from "../models/Tickets";
import { AirlinesRepositories } from "../repositories/AirlineRepository";
import { AirportsRepositories } from "../repositories/AirportRepository";
import { FlightsRepositories } from "../repositories/FlightRepository";
import { ReservationsRepositories } from "../repositories/ReservationRepository";
import { TicketsRepositories } from "../repositories/TicketRepository";
import { UsersRepositories } from "../repositories/UsersRepository";

class FlightController {
    async create(request: Request, response: Response) {
        try {
            const {
                date,
                price,
                airlineName,
                passengers,
                originName,
                destinationName,
            } = request.body;

            const flightRepository = getCustomRepository(FlightsRepositories);
            const airportRepository = getCustomRepository(AirportsRepositories);
            const airlineRepository = getCustomRepository(AirlinesRepositories);
            const origin = await airportRepository.findOne({
                name: originName,
            });
            const destination = await airportRepository.findOne({
                name: destinationName,
            });
            const airline = await airlineRepository.findOne({
                name: airlineName,
            });
            if (!origin || !destination || !airline) {
                return response.status(400).send("Dados inválidos!");
            }
            const flight = flightRepository.create({
                date: new Date(date),
                price,
                origin,
                destination,
                passengers,
                airline,
            });
            await flightRepository.save(flight);
            return response.json(flight);
        } catch (error) {
            return response.status(400).json(error);
        }
    }

    async listByOrigin(request: Request, response: Response) {
        try {
            const { originName } = request.body;
            const flightRepository = getCustomRepository(FlightsRepositories);
            const airportRepository = getCustomRepository(AirportsRepositories);
            try {
                const airport = await airportRepository.findOne({
                    name: originName,
                });
                const flights = await flightRepository.find({
                    relations: ["origin", "destination"],
                    where: { origin: airport },
                });
                const destinations = flights.map(
                    (flight) => flight.destination
                );
                return response.json(destinations);
            } catch (error) {
                console.log(error);
                return response.status(400).send("Aeroportos não encontrados!");
            }
        } catch (error) {
            return response.status(400).json(error.message);
        }
    }

    async listByAirlineDate(request: Request, response: Response) {
        try {
            const { airlineName, date } = request.body;
            const flightRepository = getCustomRepository(FlightsRepositories);
            const airlineRepository = getCustomRepository(AirlinesRepositories);

            const airline = await airlineRepository.findOne({
                name: airlineName,
            });
            const flights = await flightRepository.find({
                relations: ["origin", "destination"],
                where: { airline, date: Like(date + "%") },
            });
            return response.json(flights);
        } catch (error) {
            console.log(error);
            return response.status(400).json(error.message);
        }
    }

    async listByPrice(request: Request, response: Response) {
        try {
            const { passengersNumber } = request.body;
            const flightRepository = getCustomRepository(FlightsRepositories);
            const flights = await flightRepository.find({
                order: { price: 1 },
            });
            const minPrice = flights?.filter(
                (flight) => flight.price === flights[0].price
            );
            const total = passengersNumber * minPrice[0].price;
            return response.json({
                total,
                minPrice,
            });
        } catch (error) {
            console.log(error);
            return response.status(400).json(error.message);
        }
    }

    async reservation(request: Request, response: Response) {
        try {
            const { passengersNumber, flightId, email } = request.body;

            const userRepository = getCustomRepository(UsersRepositories);
            const flightRepository = getCustomRepository(FlightsRepositories);
            const reservationRepository = getCustomRepository(
                ReservationsRepositories
            );
            const ticketRepository = getCustomRepository(TicketsRepositories);

            const user = await userRepository.findOne({ email });
            const flight = await flightRepository.findOne({ id: flightId });

            if (!user) {
                return response.status(400).send("Usuário não cadastrado!");
            }
            if (!flight) {
                return response.status(400).send("Voo não encontrado!");
            }
            if (flight.passengers < passengersNumber) {
                return response
                    .status(400)
                    .send("Não há assentos suficientes disponíveis!");
            }

            flight.passengers -= passengersNumber;

            var tickets = [];
            for (let i = 0; i < passengersNumber; i++) {
                tickets[i] = new Ticket();
                await ticketRepository.save(tickets[i]);
            }

            const reservation = reservationRepository.create({
                date: Date(),
                user,
                flight,
                tickets,
            });

            await flightRepository.save(flight);
            await reservationRepository.save(reservation);

            const printFlight = await flightRepository.findOne({
                where: { id: flightId },
                relations: ["origin", "destination"],
            });

            return response.status(201).json({ reservation, origin:printFlight.origin, destination:printFlight.destination });
        } catch (error) {
            console.log(error);
            return response.status(400).json(error.message);
        }
    }
}
export { FlightController };
