import { useState } from "react";
import { PPT, ZIP } from "../../../assets";

interface DownloadMenuProps {
  onDownloadPPT: () => void;
  onDownloadZip: () => void;
}

export const DownloadMenu = ({
  onDownloadPPT,
  onDownloadZip,
}: DownloadMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex gap-2 items-center border border-gray-300 rounded-md px-4 py-2 transition-colors bg-[#129BFF] text-[#FFFFFF]"
      >
        <i className="fi fi-sr-folder-download text-[16px] flex items-center" />
        <span>Download</span>
        <i
          className={`fi ${
            isMenuOpen ? "fi-rr-angle-small-up" : "fi-rr-angle-small-down"
          } text-[16px] flex items-center`}
        />
      </button>

      {isMenuOpen && (
        <div className="absolute left-0 top-12 z-10 w-[100%] bg-white shadow-lg rounded-md border border-gray-200 overflow-hidden p-2">
          <div
            onClick={() => {
              onDownloadZip();
              setIsMenuOpen(false);
            }}
            className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer transition-colors rounded-md"
          >
            <div className="flex items-center gap-2">
              <img src={ZIP} alt="ZIp" className="" />
              <span>Zip</span>
            </div>
            <i className="fi fi-br-download text-[14px] text-gray-500 flex items-center" />
          </div>

          <div
            onClick={() => {
              onDownloadPPT();
              setIsMenuOpen(false);
            }}
            className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer transition-colors rounded-md"
          >
            <div className="flex items-center gap-2">
              <img src={PPT} alt="PPT" className="" />
              <span>PPT</span>
            </div>
            <i className="fi fi-br-download text-[14px] text-gray-500 flex items-center" />
          </div>
        </div>
      )}
    </div>
  );
};
