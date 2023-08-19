import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/postData';
import { CategoryService } from 'src/app/service/category.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss']
})
export class PostNewComponent implements OnInit {
  singlePost!:any;
  buttonStatus:string='Submit'
  formStatus:string ='Add'
  docId:any;
  postForm!: FormGroup;
  imgPost:any ;
  categories!:Category[] ;
  selectedImg:any;

  constructor(private _categoryService:CategoryService, private route:Router,
    private _postService:PostService,
    private fb:FormBuilder,
    private _activateRoute: ActivatedRoute  ){

    
    this._activateRoute.queryParamMap.subscribe(params =>{
      if(params.get('id')){
      
     this.formStatus = 'Edit';
     this.buttonStatus = 'Update'
     this.docId = params.get('id');
     this._postService.loadSinglePost(this.docId).subscribe(
      res => {
        this.singlePost = res;
        console.log(res)
        this.setFormValues(this.singlePost)
      }
     )
      console.log(this.docId)}
      else{
        this.formStatus = 'Add';
        // this.buttonStatus = 'Submit'
        
      }
    })

    this._categoryService.loadCategory().subscribe(
      res => {
        this.categories = res
      }
    )

   

  }

  ngOnInit(): void {
    this.imgPost = './assets/1.png'

    this.postForm = new FormGroup({
      title:new FormControl('',Validators.required) ,
      excerpt:new FormControl(''),
      category: new FormControl('',Validators.required),
      postImg:new FormControl(''),
      description: new FormControl(''),


    })



  }

  setFormValues(data:any){
    const category =  `${data.category.categoryId}-${data.category.categoryName}`
    this.postForm = this.fb.group({
      title:[data.title,Validators.required] ,
      excerpt:[data.excerpt],
      category: [ category],
      postImg: [''],
      description: [data.description],
    })
    this.imgPost = data.postImgPath;
    // this.postForm.controls['title'].setValue(data.title)  //we can also pathc the values 
  }



  submit(postFormData:any ,formStatus:string){
    console.log(postFormData.value,'dddd')
    
    let category = this.postForm.value.category.split('-');
    // let categoryName = category[1];
    // let categoryId = category[0]

    const postData:Post = {
      title: this.postForm.value.title,
      excerpt: this.postForm.value.excerpt,
      category: {
        categoryName: category[1],
        categoryId: category[0]
      },
      description:  this.postForm.value.description,
      postImgPath: this.imgPost,
      views: 0,
      isFeatured:false,
      status: 'Active',
      createdAt: new Date()
    }
    // console.log(postData)




    this._postService.uploadImage(this.selectedImg, postData ,formStatus,this.docId  )
    this.postForm.reset()
    // .then(
    //   res:any => {
    //     console.log('data is uploaded')
    //     console.log(res)
    //     this.postForm.reset();
    //     this.imgPost = './assets/1.png'
    //     this.route.navigateByUrl('post')

    //   }
    // ).catch(err => {
    //   console.log(err)
    // }
    // )
  }

  // uploadImage(){
  //   this._postService.uploadImage(this.selectedImg)
  // }



  upload(event:any){
    // debugger;
    // console.log(event)
    // console.log(event.target.files)

    if(event.target.files.length){
    let file:File = event.target.files[0];
    this.selectedImg = file;
    const reader = new FileReader()
    reader.readAsDataURL(file)
    
    reader.onload = ()=>{
      this.imgPost = reader.result as string;
      // console.log(reader.result )
      // console.log(this.imgPost)
    }

    //
    // the above function is taking time 
    // console.log(this.imgPost)
  }
  }



}
