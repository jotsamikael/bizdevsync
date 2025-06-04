
import { Injectable } from "@angular/core";
import { LeadService } from "src/app/services/indexdb/lead/lead.service";
import { Contact, User } from "../models";


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

  formatTagsForDisplay(tags:string){
  return tags?.split(',').map(tag => tag.trim()) || [];
}

  formatTagsForPost(tags:string[]){
  return tags.join(',');
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