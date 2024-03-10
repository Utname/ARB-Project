import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // readonly APIUrl ="https://localhost:7230/api";
  // readonly PhotoUrl ="https://localhost:7230/Photos";

  APIUrl: any;
  PhotoUrl: any;

  hostname: any;
  protocol: any;
  port: any;
  domain: any;
  constructor(
    private fs:Firestore,
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document) {
    this.protocol = this.document.location.protocol;
    this.hostname = this.document.location.hostname;
    this.port = this.document.location.port;
    if (this.hostname == "localhost") {
      this.domain =  "https://" + this.hostname + ":7230/";
      this.APIUrl = this.domain + "api";
      this.PhotoUrl = this.domain + "Photos"
    }
    else {
      this.domain =  "https://" + this.hostname + "/";
      this.APIUrl = this.domain + "api";
      this.PhotoUrl = this.domain + "Photos"
    }
  }

 
  taiAnh(val: any) {
    return this.http.post<any>(this.APIUrl + '/sys_upload_photo/SaveFile', val);
  }
  TaiCoverImage(val: any) {
    return this.http.post<any>(this.APIUrl + '/sys_upload_photo/SaveFile', val);
  }

  dangNhap(val: any): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/sys_user/dangNhap', val);
  }
  getAllUser(val: any) {
    return this.http.post<any>(this.APIUrl + '/sys_user/getAllUser', val);
  }

  xuatExcel(val: any, obj: any) {
    return this.http.get(this.APIUrl + '/' + val + '/xuatExcel');
  }

  createUser(val: any) {
    return this.http.post<any>(this.APIUrl + '/sys_user', val);
  }
  getAll(val: any) {
    return this.http.post<any>(this.APIUrl + '/' + val.controller + '/getAll', val);
  }

  getListUse(val: any) {
    return this.http.post<any>(this.APIUrl + '/' + val.controller + '/getListUse', val);
  }

  getOfList(val: any) {
    return this.http.post<any>(this.APIUrl + '/' + val.controller + '/getOfList', val);
  }
  getQuyenQuanTri(val: any) {
    return this.http.post<any>(this.APIUrl + '/' + val.controller + '/getQuyenQuanTri', val);
  }
  create(val: any) {
    return this.http.post<any>(this.APIUrl + '/' + val.controller, val);
  }

  edit(val: any) {
    return this.http.put<any>(this.APIUrl + '/' + val.controller, val);
  }
  delete(val: any) {
    return this.http.put<any>(this.APIUrl + '/' + val.controller + '/update', val);
  }
  convert(val: any) {
    return this.http.put<any>(this.APIUrl + '/' + val.controller + '/update', val);
  }
  saveExcel(val: any) {
    return this.http.post<any>(this.APIUrl + '/' + val.controller + '/saveDataExcel', val);
  }
  editUser(val: any) {
    return this.http.put<any>(this.APIUrl + '/sys_user', val);
  }
  deleteUser(val: any) {
    return this.http.put<any>(this.APIUrl + '/sys_user/updateUser', val);
  }
  convertUser(val: any) {
    return this.http.put<any>(this.APIUrl + '/sys_user/updateUser', val);
  }
  saveExcelUser(val: any) {
    return this.http.post<any>(this.APIUrl + '/sys_user/saveDataExcel', val);
  }
  create_success() {
    Swal.fire({
      title: 'Thêm mới thành công',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Đóng'
    }
    )
  }
  edit_success() {
    Swal.fire({
      title: 'Cập nhật thành công',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Đóng'
    }
    )
  }

  getChats(){
    let chatsCollection = collection(this.fs,'Chats');
    return collectionData(chatsCollection,{idField:'id'});
  }

  getGroupChats(){
    let chatsCollection = collection(this.fs,'groupChats');
    return collectionData(chatsCollection,{idField:'id'});
  }


  getNotes(){
    let notesCollection = collection(this.fs,'notes');
    return collectionData(notesCollection,{idField:'id'});
  }
  addNotes(desc:string){
    let data = {description:desc};
    let notesCollection = collection(this.fs,'notes');
    return addDoc(notesCollection,data);
  }
  delteNote(id:string){
    let docRef = doc(this.fs,'notes/'+id);
    return deleteDoc(docRef);
  }

}
