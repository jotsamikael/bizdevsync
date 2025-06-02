
import { Injectable } from "@angular/core";
import { Contact, User } from "../../models/model";
import { LeadService } from "../lead/lead.service";


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private leadService: LeadService){

  }

convertDateTimeToDate(rawDate:string):string{
const formattedDate = rawDate ? rawDate.split('T')[0] : null;
return formattedDate
}

getTrueOrFalse(value: string): boolean {
    if(value == 'Yes'){
      return true;

    }else{
      return false;
    }
  }

  getYesOrNo(value: boolean): string {
    if(value == true){
      return "Yes";

    }else{
      return "No";
    }
  }

  getLeadContacts(lead_id: number): Promise<Contact[]> {
    return this.leadService.getLeadById(lead_id).then(lead => lead.contacts);
  }

  getCurrentUser(): User {
    const user = JSON.parse(localStorage.getItem("token") || "{}");
    return user
  }
  
}