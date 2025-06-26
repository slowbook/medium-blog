import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

interface BlogCardProps {
    authorName : string ;
    title : string ;
    content : string ;
    publishedDate : string ;
    id : string ;
}

export const BlogCard = ({authorName , title , content , publishedDate , id} : BlogCardProps) => {
  return (
    <Link to ={`/blog/${id}`}>
        <div className="p-4 border-b border-gray-700 pb-4 w-full max-w-screen-md cursor-pointer bg-gray-900 hover:bg-gray-800 transition-colors duration-200">
            <div className="flex flex-wrap">
                <div>
                    <Avatar name={authorName} />
                </div>
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col text-gray-100 break-words"> {authorName} </div>
                <div className="flex flex-col justify-center pl-2 "> <Circle />  </div>
                <div className="pl-2 font-thin text-gray-400 text-sm flex justify-center flex-col"> {publishedDate} </div>
            </div>
            <div className="text-xl font-semibold pt-2 text-white content-text">
                {title}
            </div>

            <div className="text-md font-thin text-gray-300 content-text">
                {content.slice(0 , 100) + "..."}
            </div>

            <div className="text-gray-400 text-sm font-thin pt-2">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
    </Link>
  )
}

export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-gray-400">
    </div>
}

export function Avatar({name , size = "small", onLogout} : {name : string , size?: "small" | "big", onLogout?: () => void}){
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (size === "big" && onLogout) {
        return (
            <div className="relative" ref={dropdownRef}>
                <div 
                    className="relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full cursor-pointer w-10 h-10"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <span className="text-md text-gray-300">{name[0].toUpperCase()}</span>
                </div>
                {showDropdown && (
                    <div className="absolute right-0 top-12 bg-gray-800 border border-gray-600 rounded-md shadow-lg py-1 z-10 min-w-[120px]">
                        <button 
                            onClick={() => {
                                onLogout();
                                setShowDropdown(false);
                            }}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        );
    }
    
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size==='small'? "w-6 h-6" : "w-10 h-10"}`}>
        <span className={`${size==='small' ? "text-xs" : "text-md"} text-gray-300`}>{name[0].toUpperCase()}</span>
    </div>   
}

