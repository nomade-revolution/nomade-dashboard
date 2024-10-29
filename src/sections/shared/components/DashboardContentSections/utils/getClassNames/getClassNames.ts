import { CollabTypes, FullCollab } from "modules/collabs/domain/Collabs";
import { User, UserTypes } from "modules/user/domain/User";
import {
  COLAB_ACCEPTED_STATE,
  COLAB_CANCELLED_STATE,
  COLAB_DONE_STATE,
  COLAB_FINISHED_STATE,
  COLAB_INCIDENT_STATE,
  COLAB_MODIFICATION_IN_PROGRESS_STATE,
  COLAB_PENDING_COMPANY_STATE,
  COLAB_PENDING_NOMADE_STATE,
  COLAB_PUBLISHED_STATE,
  COLAB_RECEIVED_STATE,
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
  let stateClass = "";

  switch (state_id) {
    case COLAB_ACCEPTED_STATE:
      stateClass = `${className}__state-section--accepted`;
      break;
    case COLAB_REJECTED_STATE:
      stateClass = `${className}__state-section--rejected`;
      break;
    case COLAB_CANCELLED_STATE:
      stateClass = `${className}__state-section--cancelled`;
      break;
    case COLAB_SENT_STATE:
      stateClass = `${className}__state-section--sent`;
      break;
    case COLAB_PENDING_NOMADE_STATE:
      stateClass = `${className}__state-section--pending-nomade`;
      break;
    case COLAB_PENDING_COMPANY_STATE:
      stateClass = `${className}__state-section--pending-company`;
      break;
    case COLAB_DONE_STATE:
      stateClass = `${className}__state-section--done`;
      break;
    case COLAB_FINISHED_STATE:
      stateClass = `${className}__state-section--finished`;
      break;
    case COLAB_INCIDENT_STATE:
      stateClass = `${className}__state-section--incident`;
      break;
    case COLAB_MODIFICATION_IN_PROGRESS_STATE:
      stateClass = `${className}__state-section--modification`;
      break;
    case COLAB_RECEIVED_STATE:
      stateClass = `${className}__state-section--received`;
      break;
    case COLAB_PUBLISHED_STATE:
      stateClass = `${className}__state-section--published`;
      break;
    default:
      stateClass = "";
  }

  return stateClass;
};
