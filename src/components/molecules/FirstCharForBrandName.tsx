import clsx from "clsx";

interface FirstCharForBrandNameProps {
  brandName: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number; // Predefined sizes or custom number
  className?: string; // Additional className for customization
}

export const FirstCharForBrandName = ({
  brandName,
  size = "md", // Default medium size
  className = "",
}: FirstCharForBrandNameProps) => {
  const newColorCode: any = {
    A: "bg-[#E69A9A]",
    B: "bg-[#E6BE9A]",
    C: "bg-[#E6E69A]",
    D: "bg-[#9AE6B0]",
    E: "bg-[#9AC2E6]",
    F: "bg-[#C29AE6]",
    G: "bg-[#E6A6BC]",
    H: "bg-[#A0D9E6]",
    I: "bg-[#A8D99A]",
    J: "bg-[#E6B89A]",
    K: "bg-[#9AE6E6]",
    L: "bg-[#E6BACC]",
    M: "bg-[#D6A0E6]",
    N: "bg-[#E6E09A]",
    O: "bg-[#B28FE6]",
    P: "bg-[#9ADC88]",
    Q: "bg-[#E6A6B8]",
    R: "bg-[#B2C6E6]",
    S: "bg-[#E6A3C6]",
    T: "bg-[#9AE6BA]",
    U: "bg-[#C8A6E6]",
    V: "bg-[#A6E6E3]",
    W: "bg-[#E6E099]",
    X: "bg-[#E6A6B0]",
    Y: "bg-[#C0E6A8]",
    Z: "bg-[#D6A06D]",
  };

  // Size configuration
  const sizeConfig = {
    xs: { width: 8, height: 8, text: 16 },
    sm: { width: 12, height: 12, text: 20 }, // 48px (12 * 4)
    md: { width: 16, height: 16, text: 40 }, // 64px (16 * 4)
    lg: { width: 20, height: 20, text: 48 }, // 80px (20 * 4)
    xl: { width: 24, height: 24, text: 56 }, // 96px (24 * 4)
  };

  // Handle custom numeric size
  const dimensions =
    typeof size === "number"
      ? {
          width: size,
          height: size,
          text: size * 2.5, // Proportional text size
        }
      : sizeConfig[size];

  // Get the first character and convert to uppercase
  const firstChar = brandName?.charAt(0)?.toUpperCase();
  // Get the color or fallback to a default color
  const bgColor =
    firstChar && newColorCode[firstChar]
      ? newColorCode[firstChar]
      : "bg-gray-400";

  return (
    <div
      className={clsx(
        "rounded-[12px] flex justify-center items-center border border-[#D7D7D750]",
        bgColor,
        className
      )}
      style={{
        width: `${dimensions.width * 4}px`, // Convert to pixels (Tailwind scale)
        height: `${dimensions.height * 4}px`,
      }}
    >
      <h1
        className="text-white font-black"
        style={{ fontSize: `${dimensions.text}px` }}
      >
        {firstChar}
      </h1>
    </div>
  );
};
