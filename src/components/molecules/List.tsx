import { Loading } from "../Loading";
import { NoDataView } from "./NoDataView";

// Reusable List Component
export const List = ({
  items,
  loading,
  renderItem,
  emptyView = <NoDataView />,
  className = "",
}: {
  items: any[];
  loading?: boolean;
  renderItem: (item: any, index: number) => React.ReactNode;
  emptyView?: React.ReactNode;
  className?: string;
}) => {
  if (loading) return <Loading />;

  return (
    <div
      className={`p-1 overflow-y-auto scrollbar-minimal h-full bg-white ${className}`}
    >
      {items?.length > 0 ? items.map(renderItem) : emptyView}
    </div>
  );
};

// Reusable List Item Component
export const ListItem = ({
  item,
  isActive,
  onClick,
  icon,
  text,
}: {
  item: any;
  isActive?: boolean;
  onClick: (item: any) => void;
  icon?: string;
  text: string;
}) => (
  <div
    onClick={() => onClick(item)}
    className={`flex gap-2 border-b border-gray-100 py-2 px-2 text-[12px]  hover:text-[#129BFF90] cursor-pointer rounded-lg ${
      isActive ? "text-[#129BFF] bg-[#E7F5FF]" : "text-[##363636]"
    }`}
  >
    <i className={`fi fi-rr-${icon} flex items-center`}></i>
    <h1 className="truncate">{text}</h1>
  </div>
);
