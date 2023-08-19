import { Component } from '@angular/core';
import { Post } from 'src/app/models/postData';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  postData!:any[];


  constructor( private _postService:PostService){
    this._postService.loadPost().subscribe(res => {
      // this.postData = res
      this.postData = res
      console.log(res)
    })
  }


  delete(id:string,url:string){
    this._postService.deletePost(id,url)
  }


  isFeatured(id :string, isFeatured:boolean){

    this._postService.featuredPost(id,isFeatured)
  }

}
