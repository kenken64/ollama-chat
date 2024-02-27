import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../message';
import { OllamaService } from '../ollama.service';
import { forbiddenNameValidator } from './chat.custom.validator';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: Message[] = [];
  messageForm: FormGroup;
  
  constructor(private fb: FormBuilder, private ollamaService: OllamaService) {
    this.messageForm = this.fb.group({
      text: ['', Validators.required],
      // name: ['', 
      //   [Validators.required,
      //   Validators.minLength(4), forbiddenNameValidator(/kenneth/i)]
      // ],
    });
  }

  get name() {
    return this.messageForm.get('name');
  }

  sendMessage() {
    if (this.messageForm.valid) {
      const text = this.messageForm.value.text;
      this.messages.push({ text, sender: 'User', timestamp: new Date() });
      this.ollamaService.chatWithOllama(text).then(
        (value) => {
          this.messages.push({ text: value, sender: 'Ollama', timestamp: new Date() });
        }
      );
      this.messageForm.reset();
    }
  }
}