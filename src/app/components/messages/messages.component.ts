import {Component, OnInit} from '@angular/core';
import {MessagesService} from "../../services/messages.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit{
    ngOnInit(): void {

    }

    constructor(public messageService: MessagesService) { }

}
