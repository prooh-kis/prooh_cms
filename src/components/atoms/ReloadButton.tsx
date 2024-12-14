export const ReloadButton = ({ onClick }: any) => {
  return (
    <div
      className="flex gap-2 items-center hover:text:sky:600"
      onClick={onClick}
      title="Reload page, for latest data"
    >
      <i className="fi fi-bs-refresh text-[14px] hover:text-sky-600"></i>
    </div>
  );
};
