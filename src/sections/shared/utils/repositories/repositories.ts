import { AuthRepository } from "@auth";
import { CityRepository } from "@city/infrastructure/cityRepository";
import { CompanyRepository } from "@company/infrastructure/companyRepository";
import { CountryRepository } from "@country/infrastructure/countryRepository";
import { InfluencerRepository } from "@influencer/infrastructure/influencerRepository";
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
  countries: new CountryRepository(),
  city: new CityRepository(),
};
