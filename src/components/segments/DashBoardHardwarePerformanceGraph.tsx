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
  labels: string[];
  percent?: boolean;
  allData?: any;
}

export const DashBoardHardwarePerformanceGraph: React.FC<BarChartProps> = ({
  currentData,
  labels,
  percent = true,
  allData,
}) => {
  const sortedDates = Object.keys(allData).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let zeroIndex = -1;
  for (let i = 0; i < sortedDates.length; i++) {
    const dateStr = sortedDates[i];
    const dateObj = new Date(dateStr);
    dateObj.setHours(0, 0, 0, 0);

    if (dateObj > today && allData[dateStr].hardwarePerformanceDelivered === 0) {
      zeroIndex = i;
      break;
    }
  }

  const formattedToday = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  const currentDateIndex = sortedDates.findIndex(date => date === formattedToday);
  const currentDayRemaining: number[] = currentData.map((item, index) => {
    if (index === currentDateIndex) {
      return Math.max(item.hardwarePerformancePromised - item.hardwarePerformanceDelivered, 0);
    }
    return 0;
  });

  const requiredToPlayed: number[] = currentData.map((item, index) => {
    const promised = item.hardwarePerformancePromised;
    const consumed = item.hardwarePerformanceDelivered;
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
  
  const dailyPlayedSlots: number[] = currentData.map(
    (played: any) => played.hardwarePerformanceDelivered
  );


  const futurePerformanceData: number[] = currentData.map((item, index) => {
    if (zeroIndex === -1) return 0;
    return index < zeroIndex ? 0 : item.hardwarePerformancePromised;
  });

  const newLabel = labels?.map((date: string) => formatDate(date));

  const chartData = {
    labels: newLabel,
    datasets: [
      {
        label: "Performance",
        data: dailyPlayedSlots,
        backgroundColor: "#6982FF",
        // borderColor: "#6982FF50",
        // borderWidth: 1,
        borderRadius: 5,
        datalabels: {
          color: "#fff",
          anchor: "center" as const,
          align: "center" as const,
          font: { size: 8 },
          rotation: 270,
          formatter: (value: number) =>
            value > 20 ? `${formatNumber(value?.toFixed(0))}%` : "", // Hide
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
          rotation: 270,
          formatter: (value: number) =>
            value > 20 ? `${formatNumber(value?.toFixed(0))}%` : "", // Hide
        },
      },
      {
        label: "Under-Performance",
        data: requiredToPlayed,
        backgroundColor: "#DFE5FF",
        // borderColor: "#DFE5FF50",
        // borderWidth: 1,
        borderRadius: 5,
        datalabels: {
          color: "#00000050",
          anchor: "center" as const,
          align: "center" as const,
          font: { size: 8 },
          rotation: 270,
          formatter: (value: number) =>
            value > 20 ? `${formatNumber(value?.toFixed(0))}%` : "", // Hide
        },
      },
      {
        label: "Still To Come",
        data: futurePerformanceData,
        backgroundColor: "#D7D7D750",
        // borderColor: "#DFE5FF50",
        // borderWidth: 1,
        borderRadius: 5,
        datalabels: {
          color: "#00000050",
          anchor: "center" as const,
          align: "center" as const,
          font: { size: 8 },
          rotation: 270,
          formatter: (value: number) =>
            value > 20 ? `${formatNumber(value?.toFixed(0))}%` : "", // Hide
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
            return `${label}: ${value?.toFixed(0) || 0}%`;
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
        }
      },
      y: {
        beginAtZero: true,
        stacked: true,
        grid: {
          // color: "#E5E7EB50",
          // drawBorder: true,
          // borderDash: [12, 20], // Add dashed lines (5px dash, 5px gap)
          // drawTicks: false, // Hide tick marks on y-axis
          color: function(context: any) {
            // Create dashed effect by returning transparent color for some pixels
            return context.tick.value % 2 === 0 ? '#E5E7EB50' : 'transparent';
          },
          lineWidth: function(context: any) {
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
          callback: function(value: number | string) {
            return formatNumber(value);
          },
        },
        
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    }
  };

  return (
    <div className="w-full h-[200px]">
      <Chart type="bar" data={chartData} options={options as any} />
    </div>
  );
};
