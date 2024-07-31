import { AuthRepository } from "@auth";
import { CollabsRepository } from "modules/collabs/infrastructure/CollabsRepository";
import { OffersRepository } from "modules/offers/infrastructure";

export const repositories = {
  user: new AuthRepository(),
  offers: new OffersRepository(),
  collabs: new CollabsRepository(),
};
