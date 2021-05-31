import { Request, Response } from "express";
import { getCustomRepository, In } from "typeorm";
import { Airline } from "../models/Airlines";
import { Airport } from "../models/Airports";
import { AirlinesRepositories } from "../repositories/AirlineRepository";
import { AirportsRepositories } from "../repositories/AirportRepository";

class AirlineController {
    async create(request: Request, response: Response) {
        try {
            const { name, airportsNames } = request.body;
            if (!name || !airportsNames) {
                return response.status(400).send("Dados inválidos!");
            }
            const allNames: string[] = airportsNames;
            const airportRepository = getCustomRepository(AirportsRepositories);
            const airlineRepository = getCustomRepository(AirlinesRepositories);
            const airports = await airportRepository.find({
                name: In(allNames),
            });
            if (!airports) {
                return response.status(400).send("Aeroporto não cadastrado!");
            }
            const airline = airlineRepository.create({
                name,
                airports: airports,
            });
            await airlineRepository.save(airline);
            return response.status(201).json(airline);
        } catch (error) {
            console.log(error);
            return response.status(400).json(error);
        }
    }
}
export { AirlineController };
