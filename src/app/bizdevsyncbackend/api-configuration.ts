/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
 //rootUrl: string = 'http://localhost:8885/api';
  //static assetsUrl: string = 'http://localhost:8885';
  rootUrl: string = 'https://bizdevsync-backend.onrender.com/api';
 static assetsUrl: string = 'https://bizdevsync-backend.onrender.com';
}

/**
 * Parameters for `ApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
