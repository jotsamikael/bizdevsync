import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderBizdevService {
  constructor(private fb: FormBuilder) {}


  // --- User Form ---
  createUserForm(): FormGroup {
    return this.fb.group({
      id: [null, Validators.required], // Typically not user-editable for new entities
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      avatar: ['', Validators.required],
      is_activated: [false, Validators.required],
      is_verified: [false, Validators.required],
      role: ['', Validators.required],
      will_expire: ['', Validators.required], // Assuming date-time string
      is_archived: [false, Validators.required],
      createdAt: [{ value: '', disabled: true }, Validators.required], // Typically auto-generated
      updatedAt: [{ value: '', disabled: true }, Validators.required], // Typically auto-generated
      Enterprise_idEnterprise: [null],
      plan_id: [null, Validators.required],
      telephone: [null],
      last_ip: [null],
      last_login: [null],
      last_activity: [null],
      google_auth_secret: [null],
      email_signature: [null],
      default_language: [null],
      linkedIn: [null],
    });
  }

  // --- Lead Form ---
  createLeadForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required], // enum: ['UNQUALIFIED', 'QUALIFIED', 'CONVERTED']
      description: ['', Validators.required],
      website: [null],
      email: [null, Validators.email],
      country: [null],
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
      idActivity: [null, Validators.required], // Typically not user-editable for new entities
      title: [null],
      detail: [null],
      status: ['', Validators.required], // enum: ['COMPLETED', 'PENDING', 'IN_PROGRESS', 'NOT_STARTED', 'WAITING_FEEDBACK']
      start_date: ['', Validators.required],
      end_date: [null],
      tags: [null],
      priority: ['', Validators.required], // enum: ['CRITICAL', 'IMPORTANT', 'HIGH', 'MEDIUM', 'LOW']
      last_action: [null],
      last_action_date: [null],
      next_action: [null],
      next_action_date: [null],
      Followup_idFollowup: [null],
      Business_idBusiness: [null],
      is_archived: [false, Validators.required],
    });
  }

  // --- Meeting Form ---
  createMeetingForm(): FormGroup {
    return this.fb.group({
      idMeeting: [null, Validators.required], // Typically not user-editable for new entities
      date: ['', Validators.required],
      status: ['', Validators.required], // enum: ['COMPLETED', 'PENDING', 'IN_PROGRESS', 'NOT STARTED', 'WAITING FEEDBACK']
      due_date: ['', Validators.required],
      summary: ['', Validators.required],
      next_action: ['', Validators.required],
      next_action_date: [null],
      Followup_idFollowup: [null],
      Business_idBusiness: [null],
      is_archived: [false, Validators.required],
    });
  }

  // --- Contact Form ---
  createContactForm(): FormGroup {
    return this.fb.group({
      assignedToUser: [null, Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: [null, Validators.email],
      phone: [null],
      position: [null],
      language: [null], // { type: 'object', additionalProperties: true } -> Using a simple control for an object
      notes: [null],
      is_archived: [false, Validators.required],
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
      idFollowup: [null, Validators.required], // Typically not user-editable for new entities
      start_date: ['', Validators.required], // format: 'date'
      outcome: ['', Validators.required],
      notes: ['', Validators.required],
      status: ['', Validators.required],
      lead_score: [0, [Validators.required, Validators.min(0)]],
      priority: ['', Validators.required], // enum: ['CRITICAL', 'IMPORTANT', 'HIGH', 'MEDIUM', 'LOW']
      followup_status: ['', Validators.required], // enum: ['Hot', 'Warm', 'Cold']
      is_archived: [false, Validators.required],
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
      idBusiness: [null, Validators.required], // Typically not user-editable for new entities
      need: ['', Validators.required],
      stage: [null], // enum: ['OPPORTUNITY', ...]
      approach: [null],
      engagement_score: [0, [Validators.required, Validators.min(0)]],
      client_constraints: [null],
      business_type: [null],
      case_level: [null],
      total_turnover: [null],
      potential_time_for_delivery: [null],
      case_started_date: [null],
      current_supplier: [null],
      previous_vc: [null],
      turnover_signable: [null],
      notes: [null],
      closed_date: [null],
      is_archived: [false, Validators.required],
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

}
