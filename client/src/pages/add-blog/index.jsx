import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddNewBlog() {
  const { formData, setFormData, isEdited, setIsEdited } =
    useContext(GlobalContext);

  const navigate = useNavigate();
  const location = useLocation();

  console.log(formData);

  async function handleSaveBlogToDB() {
    try {
      const response = isEdited
        ? await axios.put(
            `http://localhost:5000/api/blogs/update/${location.state.getCurrentBlogToEdit._id}`,
            {
              title: formData.title,
              description: formData.description,
              name: formData.name,
            }
          )
        : await axios.post("http://localhost:5000/api/blogs/add", {
            title: formData.title,
            description: formData.description,
            name: formData.name,
          });
      const result = response.data;
      console.log("Post saved:", result);

      if (result) {
        setIsEdited(false);
        setFormData({
          title: "",
          description: "",
          name: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error saving post to DB:", error);
    }
  }

  useEffect(() => {
    console.log(location);
    if (location.state) {
      const { getCurrentBlogToEdit } = location.state;
      setIsEdited(true);
      setFormData({
        title: getCurrentBlogToEdit.title,
        description: getCurrentBlogToEdit.description,
        name: getCurrentBlogToEdit.name,
      });
    }
  }, [location, setIsEdited, setFormData]);

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
    <div className="flex justify-center">
      <h2 className="text-2xl font-bold mb-6">
        {isEdited ? "Edit A Post" : "Add A Post"}
      </h2>
      </div>
      <div className="space-y-4">
        <input
          name="members-name"
          placeholder="Enter your name"
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>
      <div className="space-y-4">
        <input
          name="title"
          placeholder="Enter post title"
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          placeholder="Enter post description"
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-40 resize-none"
        />
        <div className="flex justify-center">
          <button
            onClick={handleSaveBlogToDB}
            className="w-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            {isEdited ? "Edit Post" : "Add Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
