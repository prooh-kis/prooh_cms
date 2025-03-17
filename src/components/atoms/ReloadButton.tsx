export const ReloadButton = ({ onClick }: any) => {
  return (
    <div
      className="flex gap-1 justify-cneter items-center hover:text:sky:600"
      onClick={onClick}
      title="Reload page, for latest data"
    >
      <i className="fi fi-bs-refresh flex items-center justify-center text-[14px] hover:text-[#129BFF]"></i>
    </div>
  );
};
