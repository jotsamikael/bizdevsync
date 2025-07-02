
import { Injectable } from "@angular/core";
import { LeadService } from "src/app/services/indexdb/lead/lead.service";
import { Contact, User } from "../models";
import { UsersService } from "../services";
import Swal from "sweetalert2";
import { Observable } from "rxjs";
import { FormGroup } from "@angular/forms";
import { ApiConfiguration } from "../api-configuration";


@Injectable({
  providedIn: 'root'
})
export class CommonService {

constructor(private leadService: LeadService, private userService: UsersService){

  }

    // Helper method to construct the absolute URL
  getAbsoluteAvatarUrl(relativePath: string): string {
    // Check if the relative path already includes the base URL (e.g., if it's already a full URL from a previous save/refresh)
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }
    // Otherwise, prepend the assetsUrl from your environment
    return `${ApiConfiguration.assetsUrl}${relativePath}`;
  }

    resetForm(basicInfoForm: FormGroup<any>) {
  basicInfoForm.reset()
  }


  disableForm(basicInfoForm:FormGroup<any>) {
  basicInfoForm.disable()
}

enableForm(basicInfoForm:FormGroup<any>) {
  basicInfoForm.enable()
}


//converts "NEW","QUALIFIED","NOT INTERESTED" from db to ['NEW','QUALIFIED','NOT INTERESTED']
 stringToArray(text: string): string[] {
  if (typeof text === 'string' && text.trim() !== '') {
    return text.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
  }
  return [];
}

//converts ['NEW','QUALIFIED','NOT INTERESTED'] for db storage "NEW","QUALIFIED","NOT INTERESTED" 

  arrayToString(tags: any): string {
     if (Array.isArray(tags)) {
    return tags.join(', ');
  }
  return '';
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

  /*getLeadContacts(lead_id: number): Promise<Contact[]> {
    return this.leadService.getLeadById(lead_id).then(lead => lead.contacts);
  }*/

  getCurrentUser(): User {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user
  }
  
}