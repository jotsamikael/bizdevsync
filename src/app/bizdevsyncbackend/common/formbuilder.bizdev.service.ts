import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderBizdevService {
  constructor(private fb: FormBuilder) {}
  public Editor = ClassicEditor;


  // --- User Form ---
  createUserForm(): FormGroup {
    return this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [null],
      default_language: ['EN'],
      linkedIn: [null],
      password: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(64)]],
      confirmPassword: ['', Validators.required],
      termsAccepted:[false, Validators.required]}, { validators: this.passwordMatchValidator });
  }
   // --- User Form ---
  updateUserForm(): FormGroup {
    return this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [null],
      default_language: ['EN'],
      linkedIn: [null],
      email_signature:[null],
      google_auth_secret:[null],})
  }

     // --- User Form ---
  updatePasswordForm(): FormGroup {
    return this.fb.group({
     old_password: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(64)]],
     new_password: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(64)]],
     confirm_password: ['', [Validators.required]],

    },
       { validators: this.passwordMatchValidator });
  }

  // --- Lead Form ---
  createLeadForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      status: ['', Validators.required], // enum: ['UNQUALIFIED', 'QUALIFIED', 'CONVERTED']
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      website: [null],
      email: [null, [Validators.required,Validators.email]],
      country: [null],
      source: [null],
      assigned_to_user_id: [null],
      telephone: [null],
      address: [null],
      town: [null],
      tags: [null],
      activitySector: ['', Validators.required],
      is_private: [false, Validators.required],
      lead_value: [null],
      date_converted: [null],
    });
  }

  // --- Activity Form ---
  createActivityForm(): FormGroup {
    return this.fb.group({
      idActivity: [null], // Typically not user-editable for new entities
      title: [null,Validators.required],
      detail: [null],
      status: [''], // enum: ['COMPLETED', 'PENDING', 'IN_PROGRESS', 'NOT_STARTED', 'WAITING_FEEDBACK']
      start_date: ['', Validators.required],
      due_date: ['', Validators.required],
      tags: [null],
      priority: ['', Validators.required], // enum: ['CRITICAL', 'IMPORTANT', 'HIGH', 'MEDIUM', 'LOW']
      last_action: [null],
      last_action_date: [null],
      next_action: [null],
      next_action_date: [null],
      _idFollowup: [null],
      _idBusiness: [null],
    });
  }

  // --- Meeting Form ---
  createMeetingForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required], // Typically not user-editable for new entities
      status: [''], // enum: ['COMPLETED', 'PENDING', 'IN_PROGRESS', 'NOT STARTED', 'WAITING FEEDBACK']
      due_date: ['', Validators.required],
      summary: [''],
      next_action: ['', Validators.required],
      next_action_date: [null],
      _idFollowup: [null],
      _idBusiness: [null],
      contact_emails: this.fb.array([]) // <- array of emails

    });
  }

  // --- Contact Form ---
  createContactForm(): FormGroup {
    return this.fb.group({
      assignedToUser: [null],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: [null, Validators.email],
      country:['', Validators.required],
      phone: [null],
      position: [null],
      language: [null, Validators.required], // { type: 'object', additionalProperties: true } -> Using a simple control for an object
      notes: [null],
    });
  }

  // --- Product Form ---
  createProductForm(): FormGroup {
    return this.fb.group({
      id: [null, Validators.required], // Typically not user-editable for new entities
      name: ['', Validators.required],
      product_category_id: [null, Validators.required],
      short_description: [null],
      long_description: [null],
    });
  }

  // --- ProductCategory Form ---
  createProductCategoryForm(): FormGroup {
    return this.fb.group({
      idProductCategory: [null, Validators.required], // Typically not user-editable for new entities
      label: ['', Validators.required],
      description: [null],
      is_archived: [false, Validators.required],
    });
  }

  // --- Region Form ---
  createRegionForm(): FormGroup {
    return this.fb.group({
      idRegion: [null, Validators.required], // Typically not user-editable for new entities
      label: ['', Validators.required],
      is_archived: [false, Validators.required],
    });
  }

  // --- Source Form ---
  createSourceForm(): FormGroup {
    return this.fb.group({
      idSource: [null, Validators.required], // Typically not user-editable for new entities
      label: ['', Validators.required],
      description: ['', Validators.required],
      is_archived: [false, Validators.required],
    });
  }

  // --- Order Form ---
  createOrderForm(): FormGroup {
    return this.fb.group({
      invoice_no: ['', Validators.required],
      payment_id: ['', Validators.required],
      plan_id: [null, Validators.required],
      user_id: [null, Validators.required],
      gateway_id: [null, Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      tax: [0, [Validators.required, Validators.min(0)]],
      status: [0, Validators.required], // 0 = pending, 1 = paid
      will_expire: ['', Validators.required],
      meta: ['', Validators.required], // Assuming meta is a string, could be JSON string
      created_at: [{ value: '', disabled: true }, Validators.required], // Typically auto-generated
      updated_at: [{ value: '', disabled: true }, Validators.required], // Typically auto-generated
      is_archived: [false, Validators.required],
    });
  }

  // --- Plan Form ---
  createPlanForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      labelcolor: ['', Validators.required],
      iconname: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      is_featured: [0, Validators.required],
      is_recommended: [0, Validators.required],
      is_trial: [0, Validators.required],
      status: [0, Validators.required],
      days: [0, Validators.required],
      trial_days: [0, Validators.required],
      data: ['', Validators.required], // Assuming data is a string, could be JSON string
      created_at: [{ value: '', disabled: true }, Validators.required], // Typically auto-generated
      updated_at: [{ value: '', disabled: true }, Validators.required], // Typically auto-generated
      is_archived: [false, Validators.required],
    });
  }

  // --- Followup Form ---
  createFollowupForm(): FormGroup {
    return this.fb.group({
      _idLead: [null, Validators.required], 
      start_date: ['', Validators.required], // format: 'date'
      outcome: [''],
      notes: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required], // enum: ['CRITICAL', 'IMPORTANT', 'HIGH', 'MEDIUM', 'LOW']
    });
  }

  // --- Country Form ---
  createCountryForm(): FormGroup {
    return this.fb.group({
      idCountry: [null, Validators.required], // Typically not user-editable for new entities
      name: ['', Validators.required],
      code: [null],
      is_archived: [false, Validators.required],
    });
  }

  // --- Enterprise Form ---
  createEnterpriseForm(): FormGroup {
    return this.fb.group({
      idEnterprise: [null, Validators.required], // Typically not user-editable for new entities
      name: ['', Validators.required],
      logo: [null],
      slug: ['', Validators.required],
      sector: ['', Validators.required], // enum: ['Technology', ...]
      website: ['', Validators.required],
      email_domain: ['', Validators.required],
      contact_email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      plan: [null, Validators.required],
      is_verified: [false, Validators.required],
      subscription_status: ['', Validators.required],
      expires_at: [null],
      is_archived: [false, Validators.required],
    });
  }

  // --- Business Form ---
  createBusinessForm(): FormGroup {
    return this.fb.group({
      _idLead: [null, Validators.required], // Typically not user-editable for new entities
      need: ['', Validators.required],
      stage: [''], //["initial_contact", "qualification", "proposal_sent", "negotiation", "contract_signed" Represents the progression steps or pipeline stages the business opportunity is currently in (or has passed through)
      approach: [null],
      client_constraints: [null], //Lists any limitations, requirements, or restrictions set by the client. Examples:"Only available for meetings on Fridays","Requires eco-certified products"
      business_type: [null],//Classifies the business. Examples:"new_prospect", "existing_client", "former_client"
      case_level: [null],//Indicates the maturity or priority level of the business opportunity. Examples:"lead", "qualified", "hot", "negotiation", "closed_won", "closed_lost"
      total_turnover: [null],//The estimated or actual annual turnover of the business (typically in local currency Use case: Helps assess potential deal size or prioritize high-value clients.
      potential_time_for_delivery: [null],//The estimated timeframe within which a product or service should be delivered if the deal is won.Examples: "Q4 2025", "within 2 weeks after signature"
      case_started_date: [null],//The date when the business case was initiated or entered into the system. The date when the business case was initiated or entered into the system.
      current_supplier: [null],//Name of the current supplier or service provider the client is working with (if applicable).Use case: Useful for competitive analysis or positioning
      previous_vc: [null],//Description: Name of the previous vendor contact or key person previously managing the account or business case.Note: "VC" here likely stands for "Vendor Contact" or "Vendor Consultant."
      turnover_signable: [null], //The portion of turnover that could realistically be signed or captured by your company.Use case: Helps focus on the actual business potential instead of just total company size.
      notes: [null],
      closed_date: [null],
    });
  }

  // --- Competitor Form ---
  createCompetitorForm(): FormGroup {
    return this.fb.group({
      idCompetitor: [null, Validators.required], // Typically not user-editable for new entities
      last_updated: [null],
      name: ['', Validators.required],
      sector: [null],
      headquater_location: [null],
      reference_clients: [null],
      product_line: [null],
      website: [null],
      notes: [null],
      is_archived: [false, Validators.required],
    });
  }

  // --- Gateway Form ---
  createGatewayForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      currency: ['', Validators.required],
      logo: ['', Validators.required],
      charge: [0, [Validators.required, Validators.min(0)]],
      multiply: [0, [Validators.required, Validators.min(0)]],
      namespace: ['', Validators.required],
      min_amount: [0, [Validators.required, Validators.min(0)]],
      max_amount: [0, [Validators.required, Validators.min(0)]],
      is_auto: [0, Validators.required],
      image_accept: [0, Validators.required],
      test_mode: [0, Validators.required],
      status: [0, Validators.required],
      phone_required: [0, Validators.required],
      data: ['', Validators.required], // Assuming data is a string, could be JSON string
      comment: ['', Validators.required],
      created_at: [{ value: '', disabled: true }, Validators.required], // Typically auto-generated
      updated_at: [{ value: '', disabled: true }, Validators.required], // Typically auto-generated
    });
  }


  passwordMatchValidator(form: FormGroup) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
  } else {
    const errors = form.get('confirmPassword')?.errors;
    if (errors) {
      delete errors.passwordMismatch;
      if (Object.keys(errors).length === 0) {
        form.get('confirmPassword')?.setErrors(null);
      } else {
        form.get('confirmPassword')?.setErrors(errors);
      }
    }
  }

  return null;
}
}
