import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'oct-blog-dashboard';

  
  constructor(private afs : AngularFirestore  ){
    
  }
  ngOnInit(): void {
//  this.loadData()
  }
    submit(form:any){
      let collection = {
        name : form.value.name,
        email:form.value.email

      }
      // this.afs.collection('categories').add(collection).then((res)=>{
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })

      form.reset()

    }

    // loadData(){
    //   this.afs.collection('categories').snapshotChanges().pipe(map(res=> {
    //     return  res.map(
          
    //       a => {
    //         const data = a.payload.doc.data();
    //         const id = a.payload.doc.id;
    //         return { id,data}
    //       }
    //     )
    //   }  ) ).subscribe(res =>  console.log(res))
    // }
  




}

