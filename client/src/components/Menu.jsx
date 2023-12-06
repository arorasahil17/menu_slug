import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "sonner";
const MenuListItem = ({ menu, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMenuName, setEditedMenuName] = useState(menu.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedMenuName(menu.name);
  };

  const handleSaveEdit = async () => {
    try {
      const res = await axios.patch(`/api/edit-menu/${menu._id}`, {
        name: editedMenuName,
      });
      if (res.data.success) {
        toast.success("Edit Successful");
        setIsEditing(false);
        onEdit();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error editing menu");
    }
  };
  return (
    <div key={menu._id}>
      <div>
        <div className="flex space-x-2  w-80">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedMenuName}
                className="px-4 outline-none border"
                onChange={(e) => setEditedMenuName(e.target.value)}
              />
              <button
                className="bg-green-500 text-white py-1 px-4 rounded"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-white py-1 px-4 rounded"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                value={menu.name}
                className="px-4 bg-gray outline-none border"
                disabled
              />
              <button
                className="bg-green-500 text-white py-1 px-4 rounded"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white py-1 px-4 rounded"
                onClick={() => onDelete(menu._id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
        <ul className="ml-10 space-y-2 mt-2">
          {menu.slugs.map((slug, i) => (
            <li key={i} className="border border-zinc-600 px-2 w-32">
              {slug}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

MenuListItem.propTypes = {
  menu: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default MenuListItem;
