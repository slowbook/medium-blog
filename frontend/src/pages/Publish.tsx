import { AppBar } from "../components/AppBar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const navigate = useNavigate() ;
    const [title , setTitle] = useState("") ;
    const [content , setContent] = useState("") ;
    return (
        <div className="min-h-screen bg-gray-900">
            <AppBar />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full px-4">
                    <input
                        onChange={(e)=> setTitle(e.target.value)}
                        type="text"
                        className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                        placeholder="Title"
                    />
                    <TextEditor onChange={(e)=> setContent(e.target.value)} />
                    <button
                        onClick={async () => {
                            try {
                                await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                                    title,
                                    content,
                                } , {
                                    headers : {
                                        Authorization : localStorage.getItem("token") || ""
                                    }
                                })

                                // Navigate to blogs page to see the new post in the list
                                navigate('/blogs')
                            } catch (error) {
                                console.error('Error publishing blog:', error);
                                alert('Failed to publish blog. Please try again.');
                            }
                        }}
                        type="submit"
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 transition-colors duration-200"
                    >
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    )
}

function TextEditor({onChange} : {onChange : (e : React.ChangeEvent<HTMLTextAreaElement>) => void}) {
    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between border border-gray-600 rounded-lg">
                    <div className="my-2 bg-gray-800 rounded-lg w-full">
                        <textarea
                            onChange={onChange}
                            id="editor"
                            rows={8}
                            className="focus:outline-none block w-full px-3 py-2 text-sm text-gray-200 bg-gray-800 border-0 rounded-lg placeholder-gray-400"
                            placeholder="Write an article..."
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
