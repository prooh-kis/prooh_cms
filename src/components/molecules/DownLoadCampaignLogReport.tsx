import { message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as XLSX from "sheetjs-style";
import { convertDataTimeToLocale } from "../../utils/dateAndTimeUtils";

export const DownLoadCampaignLogReport = ({ campaignLog, campaign }: any) => {
  const getData = (campaign: any, index: number) => {
    return [
      index,
      convertDataTimeToLocale(campaign?.time),
      campaign.screenStatus,
    ];
  };

  const data = [
    [
      {
        v: "PROOH.AI ",
        s: {
          font: { bold: true, sz: 48 },
          border: {
            style: "thick",
            color: "000000",
          },
        },
      },
    ],
    [
      {
        v: `Campaign Name: ${campaign?.name} `,
        s: {
          font: {
            name: "arial",
          },

          border: {
            style: "thin",
            color: "000000",
          },
        },
      },
      {
        v: `Brand: ${campaign?.brandName}`,
        s: {
          font: {
            name: "arial",
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
      {
        v: "No. of Creative: 1",
        s: {
          font: {
            name: "arial",
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
    ],
    [
      {
        v: `Start Date: ${convertDataTimeToLocale(campaign?.startDate)}`,
        s: {
          font: {
            name: "arial",
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
      {
        v: `End Date: ${convertDataTimeToLocale(campaign?.endDate)}`,
        s: {
          font: {
            name: "arial",
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
      {
        v: `No. of Days: ${campaign?.campaignDuration}`,
        s: {
          font: {
            name: "arial",
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
    ],
    [
      {
        v: `Screen Name: ${campaign?.screenName}`,
        s: {
          font: {
            name: "arial",
            sz: 12,
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
      {
        v: `Log Generated at: ${convertDataTimeToLocale(new Date())}`,
        s: {
          font: {
            name: "arial",
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
      {
        v: `Campaign Type: ${campaign?.campaignType}`,
        s: {
          font: {
            name: "arial",
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
    ],
    [
      {
        v: `Total slots assigned: ${campaign?.totalSlotBooked}`,
        s: {
          font: {
            name: "arial",
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
      {
        v: `Total slots played: ${campaign?.totalSlotsPlayed}`,
        s: {
          font: {
            name: "arial",
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
      // {
      //   v: `Creative duration: ${campaign?.duration} Sec.`,
      //   s: {
      //     font: {
      //       name: "arial",
      //     },

      //     border: {
      //       right: {
      //         style: "thin",
      //         color: "000000",
      //       },
      //       left: {
      //         style: "thin",
      //         color: "000000",
      //       },
      //     },
      //   },
      // },
    ],
    [],
    [
      {
        v: "S.N.",
        s: {
          font: { bold: true, sz: 16 },
          fill: { fgColor: { rgb: "#C7C8CC" } },
        },
      },
      {
        v: "Time stamp",
        s: {
          font: { bold: true, sz: 16 },
          fill: { fgColor: { rgb: "#C7C8CC" } },
        },
      },
      {
        v: "Screen Status",
        s: {
          font: { bold: true, sz: 16 },
          fill: { fgColor: { rgb: "#C7C8CC" } },
        },
      },
      // {
      //   v: "Screen Mac",
      //   s: {
      //     font: { bold: true, sz: 16 },
      //     fill: { fgColor: { rgb: "#C7C8CC" } },
      //   },
      // },
      // {
      //   v: "Screen DeviceId",
      //   s: {
      //     font: { bold: true, sz: 16 },
      //     fill: { fgColor: { rgb: "#C7C8CC" } },
      //   },
      // },
      // {
      //   v: "Screen Ip",
      //   s: {
      //     font: { bold: true, sz: 16 },
      //     fill: { fgColor: { rgb: "#C7C8CC" } },
      //   },
      // },
      // {
      //   v: "Screen Display",
      //   s: {
      //     font: { bold: true, sz: 16 },
      //     fill: { fgColor: { rgb: "#C7C8CC" } },
      //   },
      // },
    ],
    [],
    ...campaignLog?.map((campaign: any, index: number) =>
      getData(campaign, index + 1)
    ),
  ];

  // Function to generate and download the .xlsx file
  const downloadExcel = useCallback(() => {
    // Creating the worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Adding some column widths (optional)
    worksheet["!cols"] = [
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
    ];

    worksheet["!rows"] = [
      { hpx: 50 }, // Height for the first row
      { hpx: 20 }, // Height for the second row
      { hpx: 20 }, // Height for the third row
      { hpx: 20 }, // Height for the fourth row
      { hpx: 20 }, // Height for the fifth row (empty)
      { hpx: 20 }, // Height for the header row
      { hpx: 20 }, // Height for the header row
    ];

    // Creating a new workbook and adding the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Campaign Report");

    // Writing and downloading the Excel file
    XLSX.writeFile(workbook, `${campaign?.name}.xlsx`);
  }, [campaignLog]);

  const handleClick = () => {
    downloadExcel();
  };

  return (
    <div className="py-4">
      <button
        className="border border-1 py-2 px-4 rounded-lg bg-blue-400 text-white hover:bg-blue-500 w-full text-center"
        onClick={handleClick}
      >
        <i className="fi fi-sr-file-download pr-4"></i>
        Download Logs
      </button>
    </div>
  );
};
