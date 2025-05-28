import clsx from "clsx";

interface FirstCharForBrandNameProps {
  brandName: string;
}

export const FirstCharForBrandName = ({
  brandName,
}: FirstCharForBrandNameProps) => {
  const colors = [
    "bg-[#EF4444]", // Removed 50 opacity (now 100%)
    "bg-[#F59E0B]",
    "bg-[#EAB308]",
    "bg-[#22C55E]",
    "bg-[#06B6D4]",
    "bg-[#3B82F6]",
    "bg-[#6366F1]",
    "bg-[#8B5CF6]",
    "bg-[#78DCCA]",
    "bg-[#FF77E9]",
    "bg-[#3AB7BF]",
    "bg-[#3F3CBB]",
    "bg-[#22C55E]",
    "bg-[#06B6D4]",
    "bg-[#3B82F6]",
    "bg-[#6366F1]",
    "bg-[#EF4444]",
    "bg-[#F59E0B]",
  ];

  const getBgColors = (index: number) => colors[index % colors.length];

  // Improved logic: Use ASCII value of the first letter to generate a more distributed color index
  const bgColorIndex = brandName ? brandName.charCodeAt(0) % colors.length : 0;

  return (
    <div
      className={clsx(
        "rounded-[12px] flex justify-center items-center w-16 h-16 border border-[#D7D7D750]",
        getBgColors(bgColorIndex) // ✅ Uses ASCII-based indexing for better color distribution
      )}
    >
      <h1 className="text-[40px] text-white font-black">
        {brandName?.charAt(0)}
      </h1>
    </div>
  );
};
