import { CollabTypes, FullCollab } from "modules/collabs/domain/Collabs";
import { User, UserTypes } from "modules/user/domain/User";

export const getTypesClassNames = (section: object, className: string) => {
  return `${className}__type-section ${
    (section as User).type === UserTypes.influencer
      ? `${className}__type-section--influencer`
      : (section as User).type === UserTypes.nomade
        ? `${className}__type-section--nomade`
        : (section as User).type === UserTypes.company
          ? `${className}__type-section--company`
          : (section as FullCollab).type === CollabTypes.restaurant
            ? `${className}__type-section--restaurant`
            : (section as FullCollab).type === CollabTypes.lodging
              ? `${className}__type-section--lodging`
              : (section as FullCollab).type === CollabTypes.delivery
                ? `${className}__type-section--delivery`
                : (section as FullCollab).type === CollabTypes.brand
                  ? `${className}__type-section--brand`
                  : (section as FullCollab).type === CollabTypes.activity
                    ? `${className}__type-section--activity`
                    : ""
  }`;
};
