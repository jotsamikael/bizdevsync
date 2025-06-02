/** DENORMALIZED MODEL */
export interface User {
      id?: number;
    email: string;
    password:string;
      role: string;
      full_name: string;
      enterprise_id?: number; //some users don't have enterpris 
    }
    
    export interface Enterprise {
      id: number;
     name: string;
      country: string;
      sector: string;
    }
    
    export interface Country {
      idcountry: number;
      name: string;
      language: string[];
      countrycode: string;
      region: string;
    }
    

    export interface ProductCategory {
        id: number;
        user_id: number
        name: string;
        description: string;
      }

    export interface Product {
      id: number;
      user_id: number
      name: string;
      image: string;
      product_category_id: number;
      short_description: string;
      long_description: string;
    }
    
  export interface Contact{
      id: number;
      user_id: number;
      name: string;
      role: string;
      phone?: string;
      email?: string;
      description?: string;
      language: string[];
      weight?:string;//is he a decision maker in his company
  }

    export interface Lead {
      id: number;
      assigned_to_user_id: number;
      created_by_user_id: number;
      name: string;
      country: Country;
      actor_type: string;
      is_private: boolean;
      contacts: Contact[];
    }

    export interface Activity{
      action_detail:string;
      last_action:string;
      last_action_date:string;
      next_action:string;

    }

    export interface Meeting{
      date: string,
      summary: string,
      paticipants: Contact[],
      next_action: string

    }

    export interface FollowUp {
        id: number;
        lead_id: number;
        user_id: number;
      start_date:string;
      source:string;
      activities: Activity[],
      meetings:Meeting[]
      }

    
    export interface Case {
      id: number;
      lead_id: number; //the client (a lead that has been qualified)
      user_id: number;
      need: string; //what the client needs
      product_id: number; //the product the bizdev believes can solve the clients need
      approach: string; // could be either a whole new launch, the replacement of a current solution or a value added solution that will complement the existing solution
      like_type: string; //either new business or an upselling
      case_level: string; //VRAC: opportunity identified and prospection going on, VAC: the business dev is in financial talks with the client, SAC: biz dev and client has reached a presale agreement, Won: Contract is signed
      total_turnover: number; //when financial offer is not yet done, do an estinate
      potential_time_for_delivery: string; //in what quarter of the year can the solution be implemented (T1,T2,T3,T4)
      last_action: string;
      last_action_date: string;
      next_action: string;
      case_started_date: string;
      current_supplier: string;
      competitors: string[]; //list of competitors and potential competitors
      source: string; //where or how the bizdev got this case
      ic: number; //how confident is the bizdev that a deal will be stroke (value in decimal <=1)
      previous_ic: number;
      turnover_signable: number; //total_turnover x ic
      notes: string;
    activities: Activity[],
    meetings:Meeting[]
    }
  
/** NORMALIZED MODEL
 * 
 * export interface User {
  id: number;
  email: string;
  password: string;
  role: string; // e.g. super_admin, admin, etc.
  full_name: string;
  enterprise_id?: number;
}
export interface Enterprise {
  id: number;
  name: string;
  country_id: number; // reference
  sector: string;
}
export interface Country {
  id: number;
  name: string;
  countrycode: string;
  language: string[];
  region: string;
}
  export interface Contact {
  id: number;
  user_id: number;
  name: string;
  role: string;
  phone?: string;
  email?: string;
  description?: string;
  language: string[];
  weight?: string; // decision-maker weight
}
export interface Lead {
  id: number;
  assigned_to_user_id: number;
  created_by_user_id: number;
  name: string;
  country_id: number; // reference to Country
  actor_type: string;
  is_private: boolean;
}
export interface LeadContact {
  lead_id: number;
  contact_id: number;
}
export interface Activity {
  id: number;
  lead_id: number;
  action_detail: string;
  last_action: string;
  last_action_date: string;
  next_action: string;
}
export interface Meeting {
  id: number;
  lead_id: number;
  date: string;
  summary: string;
  next_action: string;
}
export interface MeetingParticipant {
  meeting_id: number;
  contact_id: number;
}
export interface FollowUp {
  id: number;
  lead_id: number;
  user_id: number;
  start_date: string;
  source: string;
}
export interface FollowUpActivity {
  followup_id: number;
  activity_id: number;
}

export interface FollowUpMeeting {
  followup_id: number;
  meeting_id: number;
}
export interface Case {
  id: number;
  lead_id: number;
  user_id: number;
  need: string;
  product: string;
  approach: string;
  like_type: string;
  case_level: string;
  total_turnover: number;
  ca_signable: number;
  last_action: string;
  last_action_date: string;
  next_action: string;
  escalation_date: string;
  source: string;
  ic: number;
  previous_ic: number;
  notes: string;
}


 * 
 * 
 */

