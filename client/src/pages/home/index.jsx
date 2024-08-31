import { useContext, useEffect, useCallback } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const fetchListOBlogs = useCallback(async () => {
    setPending(true);
    const response = await axios.get("http://localhost:5000/api/blogs");
    const result = response.data;

    console.log(result);

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  }, [setPending, setBlogList]);

  async function handleDeleteBlog(getCurrentId) {
    console.log(getCurrentId);
    const response = await axios.delete(
      `http://localhost:5000/api/blogs/delete/${getCurrentId}`
    );
    const result = await response.data;
    if (result?.message) {
      fetchListOBlogs();
    }
  }

  function handleEditBlog(getCurrentBlogToEdit) {
    console.log(getCurrentBlogToEdit);
    navigate("./add-blog", { state: { getCurrentBlogToEdit } });
  }

  useEffect(() => {
    fetchListOBlogs();
  }, [fetchListOBlogs]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg">
      <h3 className="text-2xl font-bold mb-8 text-center">Posts So Far</h3>
      {pending ? (
        <h1 className="text-xl text-gray-600 text-center">Loading Posts! Please wait...</h1>
      ) : (
        <div className="space-y-6">
          {blogList && blogList.length ? (
            blogList.map((blogItem) => (
              <div
                key={blogItem._id}
                className="p-6 bg-white rounded-lg shadow-md flex items-start justify-between"
              >
                <div>
                  <p className="text-lg font-semibold">{blogItem.title}</p>
                  <p className="text-gray-700">{blogItem.description}</p>
                </div>
                <div className="flex space-x-4">
                  <FaEdit
                    onClick={() => handleEditBlog(blogItem)}
                    size={24}
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                  />
                  <FaTrash
                    onClick={() => handleDeleteBlog(blogItem._id)}
                    size={24}
                    className="text-red-500 cursor-pointer hover:text-red-700"
                  />
                </div>
              </div>
            ))
          ) : (
            <h3 className="text-sm text-gray-500 text-center">
              You have no Post here!
            </h3>
          )}
        </div>
      )}
    </div>
  );
}
