import { useState } from "react";
import { generateColorFromAlphabet } from "../../utils/colorUtils";

export function ScreenListMonitoringView({screen, noImages}: any) {
  
  const [dropdownVisible, setDropdownVisible] = useState<any>({});
  

  const toggleDropdown = (screenId: string) => {
    setDropdownVisible((prev: any) => ({
      ...prev,
      [screenId]: !prev[screenId],
    }));
  };


  return (
    <div className="p-1" key={screen._id}>
    <div className="flex gap-2 p-2 hover:bg-gray-100 hover:rounded">
      {!noImages && (
        <img className="rounded h-16" src={screen.images[0]} alt={screen._id} />

      )}
      <div className="truncate">
        <h1 className="text-[16px] font-semibold truncate">
          {screen.screenName}
        </h1>
        <h1 className="text-[12px] text-gray-500 truncate">
          {screen.location.address || screen.location}, {screen.location.city || screen.city}
        </h1>
      </div>
      {!noImages && (
        <i
          className="fi fi-bs-menu-dots cursor-pointer"
          onClick={() => toggleDropdown(screen._id)}
        ></i>
      )}

    </div>
    {dropdownVisible[screen._id] && (
      <div className="relative inline-block top-0 right-[-100px] bg-white shadow-md w-32 z-10">
        <ul className="border rounded ">
          <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
            View Details
          </li>
          <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
            Edit
          </li>
          <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
            Delete
          </li>
        </ul>
      </div>
    )}
  </div>
  );
}