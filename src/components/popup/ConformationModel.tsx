import { useNavigate } from "react-router-dom";

export function ConformationModel({ open, onClose }: any) {
  const navigate = useNavigate();
  if (!open) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-white rounded-[10px] h-[350px] w-[350px] p-1">
        <div
          className="relative inset-0 flex items-center justify-end gap-4 p-3"
          onClick={onClose}
        >
          <i className="fi fi-br-circle-xmark"></i>
        </div>
        <div className="flex flex-col justify-center items-center  p-2">
          <img
            src="https://s3-alpha-sig.figma.com/img/8ffe/057d/f0f4d66761c39ddd3048f9159195cfb6?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gbC9XY5Kc9TNn6wUk94F1cAaxJmfVyqNfXydRDEsfjHiONpHNp00KrZ3AGWJQbMecHeG4XbqthAuUZBK7uvNYv290dmBh~ZQYaT4gotoJSYU5z3kdJFV2CFg8-X7CirdRiASyNBVI5TVj25rOTq-SwYpd9-pxh2~jXRpwStj9x1406XhW8AhiXuT27pv9awTgDXnt-TgSlIYsqaiHUb8qt0FWStJYP9TFBh2j06DFZjflTmpKtvOAOL9hWSzIIm61Iv~Um8vHBC9PSe7T6Hz5fADyS7XqMquUEzz5Lx9vPoLoUFTcvfxWWX95ABEIYeLkWDrTLSSdBTLZTEsBb4fEg__"
            alt="icon"
            className="h-12 w-12"
          />
          <h1 className="text-center font-semibold text-lg">
            Have You Uploaded The
          </h1>
          <h1 className="text-center font-semibold text-lg">
            Creatives TO The Media Bucket?
          </h1>
          <h1 className="text-sm text-[#717171] text-center pt-2">
            You Cannot Launch A Campaign Unless Your{" "}
          </h1>
          <h1 className="text-sm text-[#717171] text-center">
            Creatives Are Uploaded To The Media Bucket
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center pt-4">
          <button
            className="border border-1 py-2 px-8 bg-[#129BFF] text-white rounded-2xl w-[50%]"
            onClick={() => {
              onClose();
              navigate("/create-campaign");
            }}
          >
            Yes
          </button>
          <h1
            onClick={() => {
              onClose();
              navigate("/my-creatives");
            }}
            className="text-[16px] text-[#129BFF]  pt-2 underline"
          >
            {"I Don't Have Creative, Upload new"}
          </h1>
        </div>
      </div>
    </div>
  );
}
