/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

export interface Meeting {
  Business_idBusiness?: number | null;
  Followup_idFollowup?: number | null;
  date?: string;
  due_date?: string;
  idMeeting?: number;
  is_archived?: boolean;
  next_action?: string;
  next_action_date?: string | null;
  status?: 'COMPLETED' | 'PENDING' | 'IN_PROGRESS' | 'NOT STARTED' | 'WAITING FEEDBACK';
  summary?: string;
}
