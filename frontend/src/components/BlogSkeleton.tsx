import { Circle } from "./BlogCard"

export const BlogSkeleton = () => {
    return <div role="status" className="animate-pulse">
        <div className="p-4 border-b border-gray-700 pb-4 w-full max-w-screen-md cursor-pointer bg-gray-900">
            <div className="flex">
                <div className="h-4 bg-gray-700 rounded-full w-48 mb-4"></div>
                <div className="h-2 bg-gray-700 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-700 rounded-full mb-2.5"></div>
                <div className="pl-2 flex justify-center flex-col">
                    <Circle />
                </div>
                <div className="pl-2 font-thin text-gray-400 text-sm flex justify-center flex-col">
                    <div className="h-2 bg-gray-700 rounded-full mb-2.5"></div>
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                <div className="h-2 bg-gray-700 rounded-full mb-2.5"></div>
            </div>
            <div className="text-md font-thin">
                <div className="h-2 bg-gray-700 rounded-full mb-2.5"></div>
            </div>
            <div className="text-gray-400 text-sm font-thin pt-4">
                <div className="h-2 bg-gray-700 rounded-full mb-2.5"></div>
            </div>
        </div>
    <span className="sr-only">Loading...</span>
</div>
}