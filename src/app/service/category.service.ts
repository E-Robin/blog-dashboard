import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _AngularFireStore:AngularFirestore) { }


  loadCategory(){
    return this._AngularFireStore.collection('category').snapshotChanges().pipe(
      map(res => {
        return res.map(
          a => {
            const data =  a.payload.doc.data();
            const id = a.payload.doc.id

            return { data , id}
          }

        )
      })
    )
  }

  addCategory(formData:any){
    
      return  this._AngularFireStore.collection('category').add(formData)
  }

  updateCategory(formData:any , id:any){
    return this._AngularFireStore.collection('category').doc(id).update(formData)
  }

  delteItem(id:any){

   return  this._AngularFireStore.collection('category').doc(id).delete()

  }
}


