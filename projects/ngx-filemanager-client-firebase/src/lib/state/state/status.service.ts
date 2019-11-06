import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilemanagerStatusService {
  private _ActiveRequestsMap = new BehaviorSubject<ActiveRequestsMap>({});
  get ActiveRequestsMap(): Observable<ActiveRequestsMap> {
    return this._ActiveRequestsMap;
  }

  public UpdateStatus(key: string, status: RequestStatus, error?: string) {
    console.log('UpdateStatus()', { key, status, error });
    let currentValue: ActiveRequestsMap;
    currentValue = this._ActiveRequestsMap.value;
    if (!currentValue[key]) {
      currentValue[key] = {};
    }
    currentValue[key].status = status;
    currentValue[key].error = error;
    this._ActiveRequestsMap.next(currentValue);
  }
}

export interface ActiveRequestsMap {
  [key: string]: {
    status?: RequestStatus;
    error?: string;
  };
}

export type RequestStatus = 'SENDING' | 'SUCCESS' | 'FAILED';
