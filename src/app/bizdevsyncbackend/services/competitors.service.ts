/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Competitor } from '../models/competitor';
import { competitorsBusinessesBusinessIdGet } from '../fn/competitors/competitors-businesses-business-id-get';
import { CompetitorsBusinessesBusinessIdGet$Params } from '../fn/competitors/competitors-businesses-business-id-get';
import { competitorsCreatePost } from '../fn/competitors/competitors-create-post';
import { CompetitorsCreatePost$Params } from '../fn/competitors/competitors-create-post';
import { competitorsDeleteIdDelete } from '../fn/competitors/competitors-delete-id-delete';
import { CompetitorsDeleteIdDelete$Params } from '../fn/competitors/competitors-delete-id-delete';
import { competitorsGetAllGet } from '../fn/competitors/competitors-get-all-get';
import { CompetitorsGetAllGet$Params } from '../fn/competitors/competitors-get-all-get';
import { competitorsGetByIdIdGet } from '../fn/competitors/competitors-get-by-id-id-get';
import { CompetitorsGetByIdIdGet$Params } from '../fn/competitors/competitors-get-by-id-id-get';
import { competitorsUpdateIdPut } from '../fn/competitors/competitors-update-id-put';
import { CompetitorsUpdateIdPut$Params } from '../fn/competitors/competitors-update-id-put';

@Injectable({ providedIn: 'root' })
export class CompetitorsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `competitorsCreatePost()` */
  static readonly CompetitorsCreatePostPath = '/competitors/create';

  /**
   * Create a new competitor.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `competitorsCreatePost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  competitorsCreatePost$Response(params: CompetitorsCreatePost$Params, context?: HttpContext): Observable<StrictHttpResponse<Competitor>> {
    return competitorsCreatePost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create a new competitor.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `competitorsCreatePost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  competitorsCreatePost(params: CompetitorsCreatePost$Params, context?: HttpContext): Observable<Competitor> {
    return this.competitorsCreatePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Competitor>): Competitor => r.body)
    );
  }

  /** Path part for operation `competitorsGetAllGet()` */
  static readonly CompetitorsGetAllGetPath = '/competitors/get-all';

  /**
   * Get all competitors (paginated).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `competitorsGetAllGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  competitorsGetAllGet$Response(params?: CompetitorsGetAllGet$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'count'?: number;
'rows'?: Array<Competitor>;
}>> {
    return competitorsGetAllGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all competitors (paginated).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `competitorsGetAllGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  competitorsGetAllGet(params?: CompetitorsGetAllGet$Params, context?: HttpContext): Observable<{
'count'?: number;
'rows'?: Array<Competitor>;
}> {
    return this.competitorsGetAllGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'count'?: number;
'rows'?: Array<Competitor>;
}>): {
'count'?: number;
'rows'?: Array<Competitor>;
} => r.body)
    );
  }

  /** Path part for operation `competitorsGetByIdIdGet()` */
  static readonly CompetitorsGetByIdIdGetPath = '/competitors/get-by-id/{id}';

  /**
   * Get a competitor by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `competitorsGetByIdIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  competitorsGetByIdIdGet$Response(params: CompetitorsGetByIdIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return competitorsGetByIdIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a competitor by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `competitorsGetByIdIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  competitorsGetByIdIdGet(params: CompetitorsGetByIdIdGet$Params, context?: HttpContext): Observable<void> {
    return this.competitorsGetByIdIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `competitorsUpdateIdPut()` */
  static readonly CompetitorsUpdateIdPutPath = '/competitors/update/{id}';

  /**
   * Update a competitor.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `competitorsUpdateIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  competitorsUpdateIdPut$Response(params: CompetitorsUpdateIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return competitorsUpdateIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update a competitor.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `competitorsUpdateIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  competitorsUpdateIdPut(params: CompetitorsUpdateIdPut$Params, context?: HttpContext): Observable<void> {
    return this.competitorsUpdateIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `competitorsDeleteIdDelete()` */
  static readonly CompetitorsDeleteIdDeletePath = '/competitors/delete/{id}';

  /**
   * Archive a competitor.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `competitorsDeleteIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  competitorsDeleteIdDelete$Response(params: CompetitorsDeleteIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return competitorsDeleteIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Archive a competitor.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `competitorsDeleteIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  competitorsDeleteIdDelete(params: CompetitorsDeleteIdDelete$Params, context?: HttpContext): Observable<void> {
    return this.competitorsDeleteIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `competitorsBusinessesBusinessIdGet()` */
  static readonly CompetitorsBusinessesBusinessIdGetPath = '/competitors/businesses/{businessId}';

  /**
   * Get paginated competitors linked to a business.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `competitorsBusinessesBusinessIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  competitorsBusinessesBusinessIdGet$Response(params: CompetitorsBusinessesBusinessIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return competitorsBusinessesBusinessIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get paginated competitors linked to a business.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `competitorsBusinessesBusinessIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  competitorsBusinessesBusinessIdGet(params: CompetitorsBusinessesBusinessIdGet$Params, context?: HttpContext): Observable<void> {
    return this.competitorsBusinessesBusinessIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
