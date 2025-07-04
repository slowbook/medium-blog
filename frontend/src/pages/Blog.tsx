import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { AppBar } from "../components/AppBar";

export const Blog = () => {
  const {id} = useParams() ;
  const {blog , loading} = useBlog({
    id : id || ""
  }) ;
    if(loading || !blog){
      return (
      <div className="min-h-screen bg-gray-900">
        <AppBar />
        <div className="h-screen flex flex-col justify-center items-center">
            <Spinner />
        </div>
      </div>
      )
    }

    return <div className="min-h-screen bg-gray-900">
      <FullBlog blog = {blog} />
    </div>
}

