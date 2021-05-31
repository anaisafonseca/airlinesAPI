import { Request, Response } from "express";
import { FindOperator, getCustomRepository } from "typeorm";
import { User } from "../models/Users";
import { UsersRepositories } from "../repositories/UsersRepository";
import * as jwt from "jsonwebtoken";
import { key } from "./key";

class UserController {
    async create(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            const userRepository = getCustomRepository(UsersRepositories);
            if (!email || !password) {
                return response.status(400).send("Entradas inválidas!");
            }
            const testUser = await userRepository.findOne({ email });
            if (!testUser) {
                const user = userRepository.create({ email, password });
                await userRepository.save(user);
                return response.status(201).json(user);
            }
            return response.status(400).send("E-mail já existe!");
        } catch (error) {
            return response.status(400).json(error);
        }
    }

    async login(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            const userRepository = getCustomRepository(UsersRepositories);
            const user = await userRepository.findOne({ email });
            if (user) {
                if (user.password === password) {
                    const token = jwt.sign(
                        { id: user.id, email: user.email },
                        key
                    );
                    return response.json(token);
                }
                return response.status(400).send("Senha inválida!");
            }
            return response.status(400).send("E-mail não cadastrado!");
        } catch (error) {
            return response.status(400).json(error);
        }
    }

    async validation(request: Request, response: Response) {
        const { token } = request.body;
        try {
            const decoded = jwt.verify(token, key);
            return response.json(decoded);
        } catch (error) {
            return response.status(401).send("Não autorizado");
        }
    }
}
export { UserController };
