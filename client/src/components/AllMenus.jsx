import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import axios from "axios";
import MenuListItem from "./Menu";
import { Link } from "react-router-dom";

const AllMenus = () => {
  const [menus, setMenus] = useState([]);

  const getMenus = async () => {
    try {
      const res = await axios.get("/api/menus");
      if (res.data.success) {
        setMenus(res.data.menus);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching menus");
    }
  };

  const deleteMenu = async (id) => {
    try {
      const res = await axios.delete(`/api/delete-menu/${id}`);
      if (res.data.success) {
        toast.info("Deleted Successfully");
        await getMenus();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error deleting menu");
    }
  };

  const editMenu = async () => {
    await getMenus();
  };

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <div className="h-screen">
      <Toaster richColors position="bottom-center" />
      <div className="flex flex-col justify-center items-center space-y-4 pt-12">
        {menus.map((menu) => (
          <MenuListItem
            key={menu._id}
            menu={menu}
            onDelete={deleteMenu}
            onEdit={() => editMenu()}
          />
        ))}
        <Link to="/" className="bg-green-500 px-4 py-1 rounded text-white my-4">
          Back
        </Link>
      </div>
    </div>
  );
};

export default AllMenus;
