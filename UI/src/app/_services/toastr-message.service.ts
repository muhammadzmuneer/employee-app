import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class ToastrMessageService {

  constructor(private messageService: MessageService) { }

    ShowSuccessMessage(summary: string, detail: string) {
      this.messageService.add({ severity: 'success', summary: summary, detail: detail});
    }
  
    ShowErrorMessage(summary: string, detail: string) {
      this.messageService.add({ severity: 'error', summary: summary, detail: detail});
    }
  
    ShowInfoMessage(summary: string, detail: string) {
      this.messageService.add({ severity: 'info', summary: summary, detail: detail});
    }
}
