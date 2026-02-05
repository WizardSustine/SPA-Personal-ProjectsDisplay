import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

interface VisitorPath{
    ipVisitor:String;
    hasLogued:boolean;
    userId:number;
    userEmail:String;
    startDate:number;
    endDate:number;
    path:String;
}

@Injectable({ providedIn: 'root' })
export class FunnelPathService {
    ipAddress!: String;

    constructor(private http: HttpClient) {
        this.ipAddress = '';
        this.http.get<{ip: string}>('https://api.ipify.org?format=json')
        .subscribe(data => {
            this.ipAddress = data.ip;
            console.log(this.ipAddress);
        });
        const visitor: VisitorPath = {
            ipVisitor: this.ipAddress,
            hasLogued: false,
            userId: 0,
            userEmail: '',
            startDate: Date.now(),
            endDate: Date.now(),
            path: 'home'
        }
    }

    
}