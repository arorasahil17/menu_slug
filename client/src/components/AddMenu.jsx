import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const AddMenu = () => {
  const [menuName, setMenuName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedMenuValue, setSelectedMenuValue] = useState("Select a menu");
  const [isAddSlug, setIsAddSlug] = useState(false);
  const [slugValue, setSlugValue] = useState("");

  const addMenu = async () => {
    if (menuName === "") return toast.error("Enter menu name");
    setIsLoading(true);
    try {
      const res = await axios.post("/api/add-menu", {
        name: menuName,
      });
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        await getMenus();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getMenus = async () => {
    try {
      const res = await axios.get("/api/menus");
      if (res.data.success) {
        setMenus(res.data.menus);
        setMenuName("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleMenuChange = (e) => {
    const { value } = e.target;
    setSelectedMenuValue(e.target.value);
    //* find the selected menu from array
    const menu = menus.find((menu) => menu._id === value);
    setSelectedMenu(menu);
  };

  const updateMenu = async () => {
    setIsLoading(true);
    try {
      const res = await axios.patch(`/api/add-slugs/${selectedMenu._id}`, {
        slug: slugValue,
      });
      console.log(res);
      if (res.data.success) {
        console.log("success");
        setIsAddSlug(false);
        setSelectedMenu(null);
        setSelectedMenuValue("");
        setSlugValue("");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getMenus();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <Link
        to="/menus"
        className="bg-green-500 px-4 py-1 rounded text-white my-4"
      >
        View all menus
      </Link>
      <Toaster richColors position="bottom-center" />
      {isLoading ? (
        <div className="">
          <Loader />
          <p className="text-zinc-700 font-semibold text-lg">Please wait...</p>
        </div>
      ) : (
        <form className="bg-[#fff] shadow-lg rounded-lg w-[400px] h-auto py-6 flex flex-col justify-center items-center space-y-3 ">
          <h2 className="font-semibold text-2xl mb-6">Add Menu</h2>
          <div className="input-group w-64">
            <label htmlFor="" className="block text-gray-700 mb-1">
              Menu Name
            </label>
            <input
              type="text"
              className="border border-zinc-300 w-full rounded py-1 px-4 outline-none text-zinc-700"
              placeholder="Enter menu name"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
            />
          </div>

          <div className="input-group w-64">
            <button
              type="button"
              onClick={addMenu}
              className="py-1 px-6 w-full text-white bg-indigo-600 rounded"
            >
              Add Menu
            </button>
          </div>
          <div className="input-group w-64">
            <select
              className="border border-zinc-300 w-full rounded py-1 px-4 outline-none text-zinc-700"
              value={selectedMenuValue}
              onChange={handleMenuChange}
            >
              <option value="">Select menu</option>
              {menus.map((menu) => (
                <option key={menu._id} value={menu._id}>
                  {menu.name}
                </option>
              ))}
            </select>
            {selectedMenu && (
              <button
                className="py-1 px-6 w-full mt-4 bg-indigo-600 text-white rounded"
                onClick={() => setIsAddSlug(true)}
                type="button"
              >
                Add slugs for this menu
              </button>
            )}
          </div>
          {isAddSlug && (
            <div className="input-group w-64">
              <input
                type="text"
                className="border border-zinc-300 w-full rounded py-1 px-4 outline-none text-zinc-700"
                value={slugValue}
                onChange={(e) => setSlugValue(e.target.value)}
              />
              <button
                className="py-1 px-6 w-full mt-4 bg-indigo-600 text-white rounded"
                type="button"
                onClick={updateMenu}
              >
                Add Slug
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default AddMenu;
