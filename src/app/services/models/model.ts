
export interface User {
      id: number;
    email: string;
    password:string;
      role: string;
      full_name: string;
      enterprise_id?: number;
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
    
    export interface Product {
      id: number;
      user_id: number
      name: string;
      type: string;
      description: string;
    }
    
  export interface Contact{
      id: number;
      user_id: number;
      name: string;
      role: string;
      phone?: string;
      email?: string;
      weight?:string;//is he a decision maker in his company
  }

    export interface Lead {
      id: number;
      user_id: number;
      name: string;
      country: Country;
      actor_type: string;
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
      contacts:Contact[];
      activities: Activity[],
      meetings:Meeting[]
    
     
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
  
