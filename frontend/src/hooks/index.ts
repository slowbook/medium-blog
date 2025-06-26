import { useEffect, useState } from "react"
import axios from "axios" ;
import { BACKEND_URL } from "../config";

export interface Blog {
    content : string ;
    title : string ;
    id : string ;
    author : {
        name : string ;
    }
}

export const useBlogs = () =>{
    const [loading , setLoading] = useState(true) ;
    const [blogs , setBlogs] = useState<Blog[]>([]) ;

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            });
            setBlogs(response.data.blogs);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchBlogs();
    } , [])

    // Add a function to refresh blogs manually
    const refreshBlogs = () => {
        fetchBlogs();
    };

    return {
        loading ,
        blogs,
        refreshBlogs
    }
}

export const useBlog = ({id} : {id : string}) =>{
    const [loading , setLoading] = useState(true) ;
    const [blog , setBlog] = useState<Blog>() ;

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}` , {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
            .then(res =>{ 
                setBlog(res.data.blog) ;
                setLoading(false) ;
            })
    } , [id])

    return {
        loading ,
        blog
    }
}