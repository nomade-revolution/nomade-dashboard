import { CollabTypes, FullCollab } from "modules/collabs/domain/Collabs";
import { User, UserTypes } from "modules/user/domain/User";
import {
  COLAB_ACCEPTED_STATE,
  COLAB_CANCELLED_STATE,
  COLAB_REJECTED_STATE,
  COLAB_SENT_STATE,
} from "sections/collabs/utils/collabsStates";

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

export const getCollabStateClassname = (
  state_id: number,
  className: string,
) => {
  return `${className}__state-section ${
    state_id === COLAB_ACCEPTED_STATE
      ? `${className}__state-section--accepted`
      : state_id === COLAB_REJECTED_STATE
        ? `${className}__state-section--rejected`
        : state_id === COLAB_CANCELLED_STATE
          ? `${className}__state-section--cancelled`
          : state_id === COLAB_SENT_STATE
            ? `${className}__state-section--sent`
            : ""
  }`;
};
