import { Header } from "../../components/header";

export const PublicRoute = (props: any) => {
  const { children } = props;

  return (
    <div className="h-[100vh] w-full bg-gray-100 overflow-y-auto no-scrollbar">
      <Header />
      <div className="h-[92vh] overflow-y-auto no-scrollbar">{children}</div>
    </div>
  );
};
