
import * as XLSX from "sheetjs-style";
import { convertDataTimeToLocale } from "./dateAndTimeUtils";

// Function to generate and download the .xlsx file
export const downloadExcel = ({ campaign, campaignLog }: any) => {

    const getData = (campaign: any, index: number) => {
        return [
            index,
            convertDataTimeToLocale(campaign?.logTime),
            convertDataTimeToLocale(campaign?.deviceTime),
            campaign?.mediaId?.split("_")[1],
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
                v: "Log stamp",
                s: {
                    font: { bold: true, sz: 16 },
                    fill: { fgColor: { rgb: "#C7C8CC" } },
                },
            },
            {
                v: "Device stamp",
                s: {
                    font: { bold: true, sz: 16 },
                    fill: { fgColor: { rgb: "#C7C8CC" } },
                },
            },
            {
                v: "Media",
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



    try {

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
        XLSX.writeFile(workbook, `${campaign?.name}_${campaign?.screenName}.xlsx`);
        return Promise.resolve("success");

    } catch (error) {
        return Promise.reject(error);
    }


}

export const downloadExcel2 = ({ campaign, campaignLog }: any) => {
    const getData = (campaign: any, index: number) => {
        // Return styled objects for each cell
        const dataStyle = {
            font: { sz: 11 },
            border: {
                top: { style: "thin", color: { rgb: "D3D3D3" } },
                bottom: { style: "thin", color: { rgb: "D3D3D3" } },
                left: { style: "thin", color: { rgb: "D3D3D3" } },
                right: { style: "thin", color: { rgb: "D3D3D3" } },
            },
        };

        return [
            { v: index, s: dataStyle },
            { v: convertDataTimeToLocale(campaign?.logTime), s: dataStyle },
            { v: convertDataTimeToLocale(campaign?.deviceTime), s: dataStyle },
            { v: campaign?.mediaId?.split("_")[1], s: dataStyle },
            { v: campaign.screenStatus, s: dataStyle },
        ];
    };

    // Header styles
    const headerStyle = {
        font: { bold: true, sz: 12 },
        fill: { fgColor: { rgb: "C7C8CC" } },
        border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
        },
    };

    const data = [
        // Header row
        [
            { v: "S.N.", s: headerStyle },
            { v: "Log stamp", s: headerStyle },
            { v: "Device stamp", s: headerStyle },
            { v: "Media", s: headerStyle },
            { v: "Screen Status", s: headerStyle },
        ],
        // Data rows
        ...campaignLog?.map((campaign: any, index: number) =>
            getData(campaign, index + 1)
        ),
    ];

    try {
        const worksheet = XLSX.utils.aoa_to_sheet(
            data.map(
                (row) => row.map((cell: any) => cell.v) // Extract just the values for the sheet
            )
        );

        // Apply styles by modifying the worksheet
        Object.keys(worksheet).forEach((key) => {
            if (key !== "!ref" && key !== "!cols" && key !== "!rows") {
                const cell = worksheet[key];
                const rowNum = parseInt(key.replace(/[^\d]/g, ""));
                const isHeader = rowNum === 1; // Assuming header is first row

                cell.s = isHeader
                    ? headerStyle
                    : {
                        font: { sz: 11 },
                        border: {
                            top: { style: "thin", color: { rgb: "D3D3D3" } },
                            bottom: { style: "thin", color: { rgb: "D3D3D3" } },
                            left: { style: "thin", color: { rgb: "D3D3D3" } },
                            right: { style: "thin", color: { rgb: "D3D3D3" } },
                        },
                    };
            }
        });

        // Set column widths
        worksheet["!cols"] = [
            { wpx: 60 }, // SN
            { wpx: 150 }, // Log stamp
            { wpx: 150 }, // Device stamp
            { wpx: 80 }, // Media
            { wpx: 100 }, // Screen Status
        ];

        // Set row heights
        worksheet["!rows"] = [
            { hpx: 25 }, // Header row
            ...Array(campaignLog?.length || 0).fill({ hpx: 20 }), // Data rows
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Campaign Report");

        // Generate filename
        const filename = `${campaign?.name || "Campaign"}_${campaign?.screenName || "Report"
            }.xlsx`;
        XLSX.writeFile(workbook, filename);

        return Promise.resolve("success");
    } catch (error) {
        console.error("Error generating Excel file:", error);
        return Promise.reject(error);
    }
};
  



