import { Influencer } from "@influencer/domain";
import { CompanyInterface } from "@company/domain";

export type AuthUserBaseType = {
  id: string;
  name: string;
  email: string;
};

export type AuthUserType = AuthUserBaseType & (Influencer | CompanyInterface);
