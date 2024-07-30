import { AuthRepository } from "@auth";
import { OffersRepository } from "modules/offers/infrastructure";

export const repositories = {
  user: new AuthRepository(),
  offers: new OffersRepository(),
};
