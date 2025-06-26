import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"
import { useEffect } from "react";

export const Blogs = () => {
  const {loading , blogs, refreshBlogs} = useBlogs() ;
  
  useEffect(() => {
    refreshBlogs();
  }, []);

  if(loading){
    return (
      <div className="min-h-screen bg-gray-900">
        <AppBar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
    </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-900">
      <AppBar />
      <div className="flex justify-center">
        <div className="space-y-4">
          {blogs
            .slice()
            .reverse()
            .map((blog, index) =>(
            <BlogCard 
            key={`${blog.id}-${index}`}
            authorName ={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            id= {blog.id}
            publishedDate="2nd Feb 2024"
          />
          ))}   
        </div>
      </div>
    </div>
  )
}