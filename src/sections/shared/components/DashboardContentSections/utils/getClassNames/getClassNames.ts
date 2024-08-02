import { CollabTypes, FullCollab } from "modules/collabs/domain/Collabs";
import { User, UserTypes } from "modules/user/domain/User";

export const getTypesClassNames = (section: object) => {
  return `dashboard__type-section ${
    (section as User).type === UserTypes.influencer
      ? "dashboard__type-section--influencer"
      : (section as User).type === UserTypes.nomade
        ? "dashboard__type-section--nomade"
        : (section as User).type === UserTypes.company
          ? "dashboard__type-section--company"
          : (section as FullCollab).type === CollabTypes.restaurant
            ? "dashboard__type-section--restaurant"
            : (section as FullCollab).type === CollabTypes.lodging
              ? "dashboard__type-section--lodging"
              : (section as FullCollab).type === CollabTypes.delivery
                ? "dashboard__type-section--delivery"
                : (section as FullCollab).type === CollabTypes.brand
                  ? "dashboard__type-section--brand"
                  : (section as FullCollab).type === CollabTypes.activity
                    ? "dashboard__type-section--activity"
                    : ""
  }`;
};
