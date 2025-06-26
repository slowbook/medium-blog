import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const AppBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="border-b border-gray-700 bg-gray-900 flex justify-between px-10 py-4 transition-colors duration-200">
        <Link className="flex flex-col justify-center cursor-pointer text-white font-bold text-xl" to={'/blogs'}>
              Medium
        </Link>

        <div className="flex items-center space-x-4">
          <Link to = {'/publish'}>
            <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-colors duration-200">New</button>
          </Link>
          <Avatar size="big" name="Abhishek" onLogout={handleLogout} />
        </div>
    </div>
  )
}
