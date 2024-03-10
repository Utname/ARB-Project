// chatbox.component.ts
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class ChatboxComponent implements OnInit {
  messages: string[] = [];
  newMessage: string = '';
  notes:any =[];
  chats:any =[];
  listGroupChats:any =[];


  constructor(
  private service: SharedService,
  ) { }

  ngOnInit(): void {
    this.refreshChats();
    this. getGroupChats();
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      this.messages.push(this.newMessage);
      this.newMessage = '';
    }
  }

  refreshChats(){
    this.service.getChats().subscribe((res)=>{
      this.chats = res;
    })
  }

  getGroupChats(){
    this.service.getGroupChats().subscribe((res)=>{
      this.listGroupChats = res;
    })
  }
  // addNotes(newNotes:string){
  //   this.service.addNotes(newNotes).then((res) =>{
  //     console.log(res);
  //     this.refreshNotes();
  //   })
  // }
  // deleteNotes(id:string){
  //   this.service.delteNote(id).then((res) =>{
  //     console.log(res);
  //     this.refreshNotes();
  //   })
  // }
}