import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
    convertUTCToLocalDate(utcDate: string, timezone: string): Date {
        return new Date(new Date(utcDate).toLocaleString('en-US', { timeZone: timezone }));
    }

    convertLocalToUTCDate(localDate: Date): string {
        return localDate.toISOString(); 
    }
}
