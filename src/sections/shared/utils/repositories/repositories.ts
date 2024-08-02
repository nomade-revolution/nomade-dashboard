import { AuthRepository } from "@auth";
import { InfluencerRepository } from "@influencer/infrastructure/influencerRepository";
import { CollabsRepository } from "modules/collabs/infrastructure/CollabsRepository";
import { OffersRepository } from "modules/offers/infrastructure";
import { UsersRepository } from "modules/user/infrastructure/userRepository";

export const repositories = {
  user: new AuthRepository(),
  offers: new OffersRepository(),
  collabs: new CollabsRepository(),
  users: new UsersRepository(),
  influencers: new InfluencerRepository(),
};
