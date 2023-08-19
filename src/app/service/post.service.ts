import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Post } from '../models/postData';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor( private storage:AngularFireStorage, private afs:AngularFirestore 
    ,private _toastService:ToastrService ,private route : Router ) { }


  uploadImage(file:any,postData:Post,formStatus:string,id:string){
    
    if(file){
      const path = `imgPath/${Date.now()}`;
      this.storage.upload(path,file ).then(res => {
      this.storage.ref(path).getDownloadURL().subscribe(url =>{
        postData.postImgPath = url;
        console.log(postData)

       if(formStatus == 'Edit') {
        this.updatePost(postData,id)

       }
       else{
        this.saveForm(postData)
       }
       
      })

    }   
    ).catch(err=>{
      this._toastService.error('failed')
    })
      
    }
    // else{
    //   this.updatePost(postData,id)
      
    // }
    else{
      if(formStatus == 'Edit'){
        this.updatePost(postData,id)
      }
      else{
        this.saveForm(postData)
      }
     
    }
    
  }


  saveForm(postData: any){
    this.afs.collection('posts').add(postData).then(res=>{
      this._toastService.success('Post added successfully')
      this.route.navigateByUrl('post')
    }).catch(err=>{
      this._toastService.error('Failed to update')
    })

  }

  updatePost(data:any,id:string){
    this.afs.collection('posts').doc(id).update(data).then(res=>{
      this._toastService.success('Data updated successfully');
      this.route.navigateByUrl('post')
    }).catch(err=>{
      this._toastService.error('Failed to update')
    })

  }



  loadPost(){

    return this.afs.collection('posts').snapshotChanges().pipe(
      tap(res=>{
        console.log(res)
      }),map(res => {
        return res.map(
          a=>{
            const data = a.payload.doc.data();
            const id = a.payload.doc.id
            return {data , id}
          }
        )
      })
    )
  }

  loadSinglePost(id:any){
    return this.afs.collection('posts').doc(id).valueChanges()
  }



 deletePost(id:string,url:string){
  this.storage.storage.refFromURL(url).delete().then(
    res =>{
      this.afs.collection('posts').doc(id).delete().then(res=>{
        this._toastService.success('Item deleted successfully')
      }).catch(
        err=>{
          this._toastService.error('Failed to delete')
        }
      )
    }
  )
 }


 featuredPost(id:string,isFeatured:boolean){
     this.afs.collection('posts').doc(id).update({'isFeatured':isFeatured})
     
 }

}
