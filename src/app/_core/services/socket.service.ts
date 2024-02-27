import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { CacheService } from './cache.service';
import { AppConfig } from './app.config';


interface ISocketMessage
{
  action: String;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket$!: WebSocketSubject<any>;

constructor(
  private cache: CacheService,
  private config: AppConfig)
  {
  }

  connect() {
    if (this.socket$ && !this.socket$.closed) {
      console.warn('WebSocket is already connected.');
      return;
    }
    this.socket$ = webSocket({url: this.config.config('apiUrl'), deserializer: ({ data }) => JSON.parse(data)});
  }

  sendMessage(message: ISocketMessage) {
    this.socket$.next({
      ...message,
      authToken: this.cache.get('token')
    });
  }

  onMessage() {
    return this.socket$.asObservable();
  }

  closeConnection() {
    this.socket$.complete();
    this.socket$.closed = true;
  }
}
