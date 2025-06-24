import { Chart, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { formatNumber } from "../../utils/formatValue";
import { formatDate } from "../../utils/dateAndTimeUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
  Filler
);

ChartJS.register(ChartDataLabels);

interface BarChartProps {
  currentData: any[];
  targetData?: number[]; // Optional target data
  labels: string[];
  label?: string;
  total?: string;
  color?: string;
  bgColor?: string;
  color2?: string;
  bgColor2?: string;
  percent?: boolean;
  allData?: any;
  campaignDetails?: any;
}

export const DashBoardSlotGraph: React.FC<BarChartProps> = ({
  currentData,
  labels,
  percent = true,
  allData,
  campaignDetails,
}) => {
  const sortedDates = Object.keys(allData).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let zeroIndex = -1;
  for (let i = 0; i < sortedDates.length; i++) {
    const dateStr = sortedDates[i];
    const dateObj = new Date(dateStr);
    dateObj.setHours(0, 0, 0, 0);

    if (dateObj > today && allData[dateStr].slotsDelivered === 0) {
      zeroIndex = i;
      break;
    }
  }

  const formattedToday = `${
    today.getMonth() + 1
  }/${today.getDate()}/${today.getFullYear()}`;
  const currentDateIndex = sortedDates.findIndex(
    (date) => date === formattedToday
  );
  const currentDayRemaining: number[] = currentData.map((item, index) => {
    if (index === currentDateIndex) {
      return Math.max(item.slotsPromised - item.slotsDelivered, 0);
    }
    return 0;
  });

  const requiredToPlayed: number[] = currentData.map((item, index) => {
    const promised = item.delayedSlots ? item.slotsPromised - item.delayedSlots : item.slotsPromised;
    const consumed = item.slotsDelivered;
    const originalValue = Math.max(promised - consumed, 0);

    if (zeroIndex !== -1) {
      if (index === zeroIndex - 1 || index >= zeroIndex) {
        return 0;
      }
      return originalValue;
    } else {
      // zeroIndex === -1
      if (index === currentData.length - 1 && currentDateIndex !== zeroIndex) {
        return 0;
      }
      return originalValue;
    }
  });

  const extraSlots: number[] = currentData?.map(
    (played: any) => {
      if (played.delayedSlots && played.slotsDelivered > played.slotsPromised - played.delayedSlots) {
        return played.extraSlotsDelivered + played.slotsDelivered - (played.slotsPromised - played.delayedSlots);
      }
      return played.extraSlotsDelivered;
    }
  );

  const dailyPlayedSlots: number[] = currentData?.map(
    (played: any) => {
      if (played.delayedSlots && played.slotsDelivered > played.slotsPromised - played.delayedSlots) {
        return played.slotsPromised - played.delayedSlots;
      }
      return played.slotsDelivered;
    }
  );

  const futurePerformanceData: number[] = currentData.map((item, index) => {
    if (zeroIndex === -1) return 0;
    const delayedSlots = item.delayedSlots || 0;
    return index < zeroIndex ? 0 : Math.max(0, item.slotsPromised - delayedSlots);
  });

  const partialDaySlots: number[] = currentData.map((item, index) => {
    if (zeroIndex === -1) return 0;
    return index < zeroIndex && item.delayedSlots ? item.delayedSlots : 0;
  });

  const newLabel = labels?.map((date: string) => formatDate(date));

  const chartData = {
    labels: newLabel,
    datasets: [
      
      {
        label: "Daily Delivery",
        data: dailyPlayedSlots,
        backgroundColor: "#77BFEF",
        // borderColor: "#77BFEF50",
        // borderWidth: 1,
        borderRadius: 5,
        datalabels: {
          color: "#fff",
          anchor: "center" as const,
          align: "center" as const,
          font: { size: 8 },
          formatter: (value: number) =>
            value > 75 ? formatNumber(value?.toFixed(0)) : "", // Hide
        },
      },
      {
        label: "Remaining Delivery",
        data: requiredToPlayed,
        backgroundColor: "#E5F4FF",
        // borderColor: "#E5F4FF50",
        // borderWidth: 1,
        borderRadius: 5,
        datalabels: {
          color: "#00000050",
          anchor: "center" as const,
          align: "center" as const,
          font: { size: 8 },
          formatter: (value: number) =>
            value > 75 ? formatNumber(value?.toFixed(0)) : "", // Hide
        },
      },
      {
        label: "Current Day",
        data: currentDayRemaining,
        backgroundColor: "#FFE896",
        // borderColor: "#FFE89650",
        // borderWidth: 1,
        borderRadius: 5,
        datalabels: {
          color: "#00000050",
          anchor: "center" as const,
          align: "center" as const,
          font: { size: 8 },
          formatter: (value: number) =>
            value > 10 ? formatNumber(value?.toFixed(0)) : "", // Hide
        },
      },
      {
        label: "Partial Delivery",
        data: partialDaySlots,
        backgroundColor: "#00000070",
        // borderColor: "#77BFEF50",
        // borderWidth: 1,
        borderRadius: 5,
        datalabels: {
          color: "#fff",
          anchor: "center" as const,
          align: "center" as const,
          rotation: -90,
          font: { size: 8 },
          formatter: (value: number) => value > 0 ? "Partial" : ""
        },
      },
      {
        label: "Adjustment Delivery",
        data: extraSlots,
        backgroundColor: "#CDC5FF",
        // borderColor: "#CDC5FF50",
        borderWidth: 0,
        borderRadius: 5,
        datalabels: {
          color: "#fff",
          anchor: "center" as const,
          align: "center" as const,
          font: { size: 8 },
          formatter: (value: number) =>
            value > 75 ? formatNumber(value?.toFixed(0)) : "", // Hide
        },
      },
      {
        label: "Still To Come",
        data: futurePerformanceData,
        backgroundColor: "#D7D7D750",
        // borderColor: "#CDC5FF50",
        borderWidth: 0,
        borderRadius: 5,
        datalabels: {
          color: "#fff",
          anchor: "center" as const,
          align: "center" as const,
          font: { size: 8 },
          formatter: (value: number) =>
            value > 75 ? formatNumber(value?.toFixed(0)) : "", // Hide
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        align: "end" as const,
        labels: {
          color: "#6B7280",
          font: {
            size: 10,
          },
          padding: 10,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || "";
            let value = context.raw;
            if (label == "Current Day" && value == 0) {
              return null;
            }
            return [
              `${label}: ${value?.toFixed(0) || 0}`, 
            ];
          },
          // afterLabel: (context: any) => {
          //   const dataIndex = context.dataIndex;
          //   const slotsPromised = currentData[dataIndex]?.slotsPromised;
          //   return `Total Promised: ${slotsPromised?.toFixed(0) || 0}`;
          // },
          afterBody: (context: any) => {
            const dataIndex = context[0].dataIndex;
            const lastDayRemaining = 
              dataIndex === 0 ? 0 : 
              Math.max(0, currentData[dataIndex-1].slotsPromised - (currentData[dataIndex-1].delayedSlots || 0) - currentData[dataIndex-1].slotsDelivered);
            const requiredToPlayedValue = 
              currentData[dataIndex].delayedSlots ? 
                currentData[dataIndex]?.slotsPromised - currentData[dataIndex].delayedSlots : 
                currentData[dataIndex]?.slotsPromised + lastDayRemaining;
            
            const datasets = context[0]?.chart?.data?.datasets?.filter(
              (data: any) =>
                ["Daily Delivery", "Adjustment Delivery"].includes(data.label)
            );
            let total = 0;
            datasets?.forEach((dataset: any) => {
              if (dataset.data[dataIndex] > 0) {
                total += dataset.data[dataIndex];
              }
            });

            return [
              `Overall Delivery`,
              `Delivered (${total.toFixed(0)}) / Promised (${requiredToPlayedValue?.toFixed(0) || 0})`,
              context[0].dataset.label === "Partial Delivery" ? `Campaign started at ${new Date(campaignDetails.startDate).toLocaleTimeString()}` : "* inc. remaining previous day deliveries",
            ];
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          color: "#6B728050",
          font: {
            size: 10,
          },
          maxTicksLimit: 6, // Maximum number of ticks to show
          autoSkip: true, // Automatically skip labels to avoid overlap
          autoSkipPadding: 0, // Padding between labels when auto-skipping
          maxRotation: 0, // Prevent rotation
          minRotation: 0, // Prevent rotation
        },
      },
      y: {
        beginAtZero: true,
        stacked: true,
        grid: {
          // color: "#E5E7EB50",
          // drawBorder: true,
          // borderDash: [12, 20], // Add dashed lines (5px dash, 5px gap)
          // drawTicks: false, // Hide tick marks on y-axis
          color: function (context: any) {
            // Create dashed effect by returning transparent color for some pixels
            return context.tick.value % 2 === 0 ? "#E5E7EB50" : "transparent";
          },
          lineWidth: function (context: any) {
            return context.tick.value % 2 === 0 ? 1 : 0;
          },
          drawBorder: false,
        },
        ticks: {
          color: "#6B728050",
          font: {
            size: 10,
            // weight: "500",
          },
          maxTicksLimit: 6, // Maximum number of ticks to show
          autoSkip: true, // Automatically skip labels to avoid overlap
          autoSkipPadding: 20, // Padding between labels when auto-skipping
          maxRotation: 0, // Prevent rotation
          minRotation: 0, // Prevent rotation
          padding: 1,
          callback: function (value: number | string) {
            return formatNumber(value);
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="w-full h-[200px]">
      <Chart type="bar" data={chartData} options={options as any} />
    </div>
  );
};
