import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import Fraction from "fraction.js";

interface UploadCreativesTableProps {
  userInfo?: any;
  step?: any;
  setStep?: any;
  screenData?: any;
  handleScreenSelection?: any
  selectedScreens?: any;
  requestBody?: any;
}

export const UploadCreativesTable = ({
  userInfo,
  step,
  setStep,
  screenData,
  handleScreenSelection,
  selectedScreens,
  requestBody,

}: UploadCreativesTableProps) => {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="bg-[#EBF6FF]">
          <tr className="">
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1">
                <CheckboxInput
                  label={``}
                  textSize="12px"
                  color="#129BFF"
                />
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                Screen Name
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                Network
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                Ratio
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                Resolution
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                Slot Duration
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                Repeat
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                Creative
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {screenData?.map((s: any, i: any) => (
            <tr key={i}>
              <td className="py-2 px-1">
                <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                  <CheckboxInput
                    label={``}
                    textSize="12px"
                    color="#129BFF"
                    onChange={(e) => {
                      handleScreenSelection({
                        screen: s,
                        status: e
                      });
                    }}
                    checked={selectedScreens?.map((sc: any) => sc.id)?.includes(s.id) ? true : false}
                  />
                </div>
              </td>
              <td className="py-2 px-1">
                <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]">
                  {s.screenName}
                </div>
              </td>
              <td className="py-2 px-1">
                <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]">
                  {s.network || "Individual"}
                </div>
              </td>
              <td className="py-2 px-1">
                <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]">
                  {s.ratio || `${new Fraction(Number(s?.resolution?.split("x")[0] / s?.resolution?.split("x")[1])).n}:${new Fraction(Number(s?.resolution?.split("x")[0] / s?.resolution?.split("x")[1]).toFixed(2).toString()).d}`}
                </div>
              </td>
              <td className="py-2 px-1">
                <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]">
                  {s.resolution }
                </div>
              </td>
              <td className="py-2 px-1">
                <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]">
                  {s.slotDuration} seconds
                </div>
              </td>
              <td className="py-2 px-1">
                <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]">
                  {requestBody.filter((rb: any) => rb.screenResolution === s.resolution)?.map((r: any) => r.standardDayTimeCreatives)[0]?.length > 1 ? "Multiple" : "Single"}
                </div>
              </td>
              <td className="py-2 px-1">
                <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]">
                  {requestBody.map((r: any) => r.screenResolution)?.includes(s.resolution) ? "uploaded" : "??"}
                </div>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  )
}