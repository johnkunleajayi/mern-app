import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-blue-500 text-white p-4 shadow-md flex justify-between items-center">
    <Link to={'/'}>
      <h2 className="text-2xl font-bold hover:text-gray-300">Status App</h2>
      </Link>
      <ul className="flex space-x-4">
        <Link to={'/'}>
          <li className="hover:text-gray-300">Home</li>
        </Link>
        <Link to={'/add-blog'}>
          <li className="hover:text-gray-300">Add Post</li>
        </Link>
      </ul>
    </div>
  );
}
