import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 h-screen w-1/4 p-4">
      <div className="text-white text-xl mb-4">Dashboard</div>
      <ul>
        <li className="mb-2">
          <a href="#" className="text-white hover:text-gray-400">
            Link 1
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-white hover:text-gray-400">
            Link 2
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-white hover:text-gray-400">
            Link 3
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
