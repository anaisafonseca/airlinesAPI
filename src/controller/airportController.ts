import { Request, Response } from "express";
import { getCustomRepository, In } from "typeorm";
import { AirlinesRepositories } from "../repositories/AirlineRepository";
import { AirportsRepositories } from "../repositories/AirportRepository";
import { FlightsRepositories } from "../repositories/FlightRepository";

class AirportController {
    async create(request: Request, response: Response) {
        try {
            const { name, location } = request.body;
            const airportRepository = getCustomRepository(AirportsRepositories);
            if (!name || !location) {
                return response.status(400).send("Dados inválidos!");
            }
            const airport = airportRepository.create({ name, location });
            await airportRepository.save(airport);
            return response.status(201).json(airport);
        } catch (error) {
            return response.status(400).json(error);
        }
    }

    async listByAirline(request: Request, response: Response) {
        try {
            const { airlineName } = request.body;
            const airlineRepository = getCustomRepository(AirlinesRepositories);

            try {
                const { airports } = await airlineRepository.findOne(
                    { name: airlineName },
                    {
                        relations: ["airports"],
                    }
                );
                return response.json(airports);
            } catch {
                return response.status(400).send("Aeroportos não encontrados!");
            }
        } catch (error) {
            return response.status(400).json(error.message);
        }
    }
}
export { AirportController };
