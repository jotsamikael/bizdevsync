import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CommonService } from 'src/app/bizdevsyncbackend/common/common.bizdev.service';
import { FormBuilderBizdevService } from 'src/app/bizdevsyncbackend/common/formbuilder.bizdev.service';
import { AuthService, UsersService } from 'src/app/bizdevsyncbackend/services';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  basicInfoForm: FormGroup;
  updatePasswordForm:FormGroup;
  public Editor = ClassicEditor;
  isLoading: boolean = false;
  profileDetails: any
  user: any;

  bgpreviewEvaluate = "../../../assets/images/profileplaceholder.png";
  profilePicExceedsMaxSize: boolean = false;

  selectedFiles?: FileList;
  currentFile?: File;
  MAX_IMAGE_SIZE = 1 * 1024 * 1024; //1 mb in bytes
  // bread crumb items
  breadCrumbItems: Array<{}>;
  
  constructor(
    private formbuilderBizdevService: FormBuilderBizdevService,
    private commonService: CommonService,
    private userService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {
    this.getCurrentUser()
  }

  ngOnInit(): void {
       // When the component initializes, construct the full avatar URL
    if (this.user && this.user.avatar) {
      this.bgpreviewEvaluate = this.commonService.getAbsoluteAvatarUrl(this.user.avatar);
      console.log(this.bgpreviewEvaluate)
    } else {
      this.bgpreviewEvaluate = "../../../assets/images/profileplaceholder.png";
    }
    this.basicInfoForm = this.formbuilderBizdevService.updateUserForm();
    this.updatePasswordForm =  this.formbuilderBizdevService.updatePasswordForm();
    this.setFormbasicInfoForm();

    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
  }

  updateProfile() {
    this.isLoading = true;
    // 1. Start with an empty object for the request body
    const requestBody: any = {}; // Use 'any' initially for flexibility

      // 2. Conditionally add text fields if they are present in the form
    //    It's good practice to only send changed fields or fields that have values.
    //    Your Joi schema on the backend already handles optional fields.
    //    You can decide if you want to send *all* form values or only non-null/non-undefined ones.
    //    For simplicity here, I'll send all current form values, letting Joi handle optionality.
    //    If you only want to send *changed* values, you'd compare form values to original user data.

    // Assign all form values directly
    requestBody.first_name = this.basicInfoForm.value.first_name;
    requestBody.last_name = this.basicInfoForm.value.last_name;
    requestBody.email = this.basicInfoForm.value.email;
    requestBody.telephone = this.basicInfoForm.value.telephone;
    requestBody.default_language = this.basicInfoForm.value.default_language;
    requestBody.linkedIn = this.basicInfoForm.value.linkedIn;
    requestBody.email_signature = this.basicInfoForm.value.email_signature;
    requestBody.google_auth_secret = this.basicInfoForm.value.google_auth_secret;

    // 3. Conditionally assign the avatar file
    //    This is the key part for solving your "item is undefined" error.
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      // If a file was selected, include it in the body
      requestBody.avatar = this.selectedFiles.item(0);
    }
    // ELSE: if no file was selected, 'requestBody.avatar' will simply not exist,
    // which is what your backend's Joi.binary().optional() expects.

    // 4. Send the request body
    this.authService
      .userUpdateProfileIdPut({
        id: this.user.id,
        body: requestBody // Send the constructed object,
      }).subscribe({
        next: () => {
          Swal.fire("Updated!", "Profile updated successfully!", "success");
          this.isLoading = false;
        },
        error: (error) => {
          console.error("Error updating profile:", error);
          Swal.fire("Error!", "An error occured.", "error");
          this.isLoading = false;
        },
      });
  }

 
  
  
  setFormbasicInfoForm() {
    this.basicInfoForm.controls["first_name"].setValue(this.user.first_name);
    this.basicInfoForm.controls["last_name"].setValue(this.user.last_name);
    this.basicInfoForm.controls["email"].setValue(this.user.email);
    this.basicInfoForm.controls["telephone"].setValue(this.user.telephone);
    this.basicInfoForm.controls["default_language"].setValue(this.user.default_language);

    this.basicInfoForm.controls["linkedIn"].setValue(this.user.linkedIn);
    this.basicInfoForm.controls["email_signature"].setValue(this.user.email_signature);
    this.basicInfoForm.controls["google_auth_secret"].setValue(this.user.google_auth_secret);
  }

  disableFormbasicInfoForm() {
    this.commonService.disableForm(this.basicInfoForm);
  }

  enableFormbasicInfoForm() {
    this.commonService.enableForm(this.basicInfoForm);
  }

  get f() {
    return this.basicInfoForm.controls;
  }

  getProfileDetails() {
    this.userService.userGetUserByEmailGet({ email: this.user.email }).subscribe({
      next: (response) => {
        const data: any = response;
        this.profileDetails = data.userData;
        console.log(this.profileDetails)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  onFileChangeProfile(event: any) {
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        const reader = new FileReader();

        if (!this.checkFileSize(this.MAX_IMAGE_SIZE, this.currentFile)) {
          reader.onload = async (e: any) => {
            this.bgpreviewEvaluate = e.target.result;
          };
          reader.readAsDataURL(this.currentFile);
        } else {
          this.profilePicExceedsMaxSize = true;
        }
      } else {
        console.log("no file");
      }
    }
  }

  //this function checks the size of a file and sends true or false if the size exceeds the specified value
  checkFileSize(maxAllowedSize: number, givenFile: File) {
    if (givenFile.size <= maxAllowedSize) {
      return false;
    } else {
      return true;
    }
  }

  getCurrentUser() {
    this.user = this.commonService.getCurrentUser()
    console.log(this.user)
  }
}
