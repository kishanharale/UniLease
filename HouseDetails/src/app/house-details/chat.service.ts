import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = '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'; // Replace with your OpenAI API endpoint

  constructor(private http: HttpClient) {}

  sendMessage(user: string, content: string): Observable<any> {
    const requestBody = {
      model: 'gpt-3.5-turbo', // Change to your model
      messages: [
        { role: 'user', content: content }
      ],
    };

    return this.http.post<any>(this.apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_API_KEY` // Replace with your API key
      }
    });
  }
}
