import { AuthRepository } from "@auth";
import { CityRepository } from "@city/infrastructure/cityRepository";
import { CompanyRepository } from "@company/infrastructure/companyRepository";
import { CountryRepository } from "@country/infrastructure/countryRepository";
import { InfluencerRepository } from "@influencer/infrastructure/influencerRepository";
import { AddressRepository } from "modules/address/infrastructure/addressRepository";
import { CategoriesRepository } from "modules/categories/infrastructure/CategoriesRepository";
import { CollabsRepository } from "modules/collabs/infrastructure/CollabsRepository";
import { ContactRepository } from "modules/contact/infrastructure/contactRepository";
import { LeadsRepository } from "modules/leads/infrastructure/leadsRepository";
import { OffersRepository } from "modules/offers/infrastructure";
import { PlansRepository } from "modules/plans/infrastructure/plansRepo";
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
  contact: new ContactRepository(),
  address: new AddressRepository(),
  categories: new CategoriesRepository(),
  plans: new PlansRepository(),
};
