import { Router } from "express";
import { AirlineController } from "./controller/airlineController";
import { AirportController } from "./controller/airportController";
import { FlightController } from "./controller/flightController";
import { UserController } from "./controller/userController";

const userController = new UserController();
const airportController = new AirportController();
const airlineController = new AirlineController();
const flightController = new FlightController();

const router = Router();

router.post("/user", userController.create);
router.post("/login", userController.login);
router.post("/validation", userController.validation);

router.post("/airport", airportController.create);
router.post("/listByAirline", airportController.listByAirline);

router.post("/airline", airlineController.create);

router.post("/flight", flightController.create);
router.post("/listByOrigin", flightController.listByOrigin);
router.post("/listByAirlineDate", flightController.listByAirlineDate);
router.post("/listByPrice", flightController.listByPrice);
router.post("/reservation", flightController.reservation);

export { router };
