export interface Post {
 
    title:string;
    excerpt:string;
    category:{
        categoryName:string;
        categoryId:string;
    },
    description : string;
    postImgPath:string;
    views:number;
    isFeatured:boolean;
    status:string;
    createdAt:Date;

}