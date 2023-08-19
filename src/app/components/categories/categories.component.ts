import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  category:string | undefined;
  updatedId:string | undefined;
  isEdit:boolean = false
  // categories:any | undefined;
  categories:Category[] | undefined
  constructor(private _toastService: ToastrService,
    private  _categoryService: CategoryService
    )
  {
    
  }
  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this._categoryService.loadCategory().subscribe((res)=>{
      console.log(res)
      this.categories = res
      console.log(this.categories)
    })
  }


  submit(formData:any){

    let categories = {
      category: formData.value.category
    }

    if(this.isEdit){
    this._categoryService.updateCategory(categories,this.updatedId).then(res=>{
      console.log('updated data')
      this._toastService.success('Item updated successfully')
      this.isEdit = false;
      this.updatedId = '';
      formData.reset()
    })
    .catch(err =>{
      this._toastService.error('failed '),
      console.log(err)
    })
    
    }

    else{
      console.log(formData.value)
    console.log(formData.value.category)

   
    this._categoryService.addCategory(categories).then((res)=>{
      console.log(res)
      this._toastService.success("Category added successfully"),
      formData.reset()
    }).catch(err=>{
      console.log(err);
      this._toastService.error("Failed")
      
    })

    }
    
    
  }


  delete(id: any){
    console.log(id)
    this._categoryService.delteItem(id)
    .then(res=> {
      // console.log(res),
    this._toastService.success('item deleted successfully')
    }).catch(err=> console.log(err))

  }


  edit(category:any){
    this.isEdit  = true;
    this.category = category.data.category;
    this.updatedId = category.id;
  }

  // now i want to add this category data in firebase collection for this i need to use the 
  //service of firestore first need to import service from firebase and then in collection need 
  // to add new collection in firebase
  

}
