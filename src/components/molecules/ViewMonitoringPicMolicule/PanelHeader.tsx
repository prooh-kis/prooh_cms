interface HeaderProps {
  icon: string;
  title: string;
}
export const PanelHeader = ({ icon, title }: HeaderProps) => {
  return (
    <div className="bg-[#FAFAFA] text-gray-800 text-[16px] font-medium font-inter p-2 flex items-center gap-2 px-2">
      <div className="h-[26px] w-[26px] rounded-full bg-[#129BFF] flex items-center justify-center">
        <i className={`fi ${icon} text-white text-[16px] flex items-center`} />
      </div>
      <h1>{title}</h1>
    </div>
  );
};
