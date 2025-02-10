import { FullCollab } from "modules/collabs/domain/Collabs";

export interface NextStepProps {
  step: State;
}

export interface Template {
  [key: number]: {
    leftText: string;
    rightText: string;
    rightExtraText?: string;
  };
}

export interface Props {
  collab: FullCollab;
  isCompany: boolean;
}

export interface State {
  id: number;
  name: string;
  created_at: string;
  type: string;
  reason?: string;
  limit_date?: string;
}
