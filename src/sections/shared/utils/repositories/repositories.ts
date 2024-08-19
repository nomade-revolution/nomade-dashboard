import { AuthRepository } from "@auth";
import { CompanyRepository } from "@company/infrastructure/companyRepository";
import { InfluencerRepository } from "@influencer/infrastructure/influencerRepository";
import { AddressRepository } from "modules/address/infrastructure/addressRepository";
import { CollabsRepository } from "modules/collabs/infrastructure/CollabsRepository";
import { LeadsRepository } from "modules/leads/infrastructure/leadsRepository";
import { OffersRepository } from "modules/offers/infrastructure";
import { UsersRepository } from "modules/user/infrastructure/userRepository";

export const repositories = {
  user: new AuthRepository(),
  offers: new OffersRepository(),
  collabs: new CollabsRepository(),
  users: new UsersRepository(),
  influencers: new InfluencerRepository(),
  companies: new CompanyRepository(),
  leads: new LeadsRepository(),
  address: new AddressRepository(),
};
