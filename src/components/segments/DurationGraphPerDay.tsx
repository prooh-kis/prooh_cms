import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { formatNumber } from "../../utils/formatValue";
import { convertTo12Hour } from "../../utils/dateAndTimeUtils";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

interface LineChartProps {
  currentData?: Record<string, { promised: number }>;
  color?: string;
  bgColor?: string;
  additionalLegends?: any;
}

export const DurationGraphPerDay: React.FC<LineChartProps> = ({
  currentData,
  color = "#DC6700",
  bgColor = "#DC670050",
  additionalLegends = [],
}) => {
  const totalPlayed = Object.values(currentData || {}).map(
    (data: any) => data.total
  );
  const played = Object.values(currentData || {}).map(
    (data: any) => data.delivery
  );
  const requiredToPlayed = Object.values(currentData || {}).map(
    (data: any) => data.promised
  );

  const overDelivered = Object.values(currentData || {}).map(
    (data: any) => data.extra
  )
  // Calculate the maximum value in the data
  const maxValue = Math.max(...totalPlayed, 0);
  // Set y-axis max to 1.5 times the maximum data value (with minimum of 1 if all values are 0)
  const yAxisMax = Math.max(maxValue * 1.2, 1).toFixed(0);

  const newLabel = Object.keys(currentData || {})?.map((v: any) => {
    return `Till ${convertTo12Hour(v)}`
  });

  const currentTimeIndex = newLabel?.map((l: any) => l.split("Till ")[1]).findIndex(label => label === convertTo12Hour(new Date().getHours()));

  const pointRadii = newLabel.map((_, index) => 
    index === currentTimeIndex ? 5 : 1.5
  );
  const chartData = {
    labels: newLabel?.map((label: any) => label?.split(" ")?.splice(1, 2)),
    datasets: [
      {
        label: "Total Delivery",
        data: totalPlayed,
        borderColor: color,
        backgroundColor: bgColor,
        borderWidth: 2,
        pointRadius: pointRadii,
        pointHoverRadius: 7,
        pointBackgroundColor: color,
        pointBorderColor: color,
        pointBorderWidth: 0,
        tension: 0.2,
        fill: true,
      },
      // Current time indicator dataset
      {
        label: "Current Time",
        data: newLabel.map((_, index) => 
          index === currentTimeIndex ? Math.max(...requiredToPlayed) * 1.1 : null
        ),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        pointRadius: 0,
        borderDash: [6, 6],
        fill: false,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
        // position: "bottom" as const,
        // labels: {
        //   color: "#6B7280",
        //   font: {
        //     size: 10,
        //   },
        //   padding: 12,
        //   usePointStyle: true,
        //   pointStyle: "circle",
        // },
      },
      tooltip: {
        backgroundColor: "#00000095",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderColor: "#37415190",
        borderWidth: 1,
        padding: 8,
        usePointStyle: true,
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || "";
            const value = context.raw;
            
            const tooltipLines = [
              `${label}: ${formatNumber(value.toFixed(0))}`,
            ];
            
            // Assuming your additional data is stored in an array matching your main data
            additionalLegends.forEach((legend: any) => {
              tooltipLines.push(
                `${legend.label}: ${
                  legend.label == "Hourly Delivery" ? played[context.dataIndex] 
                  : overDelivered[context.dataIndex] > 0 ? overDelivered[context.dataIndex]
                  : 0
                }`
              );
            });
            
            return tooltipLines;
          },
          // Format the title (x-axis label) if needed
          title: (context: any) => {
            return `Time: ${context[0].label?.split(",")?.join(" ")} to ${convertTo12Hour(context[0]?.dataIndex + 1)}`;
          },
        },
      },
      datalabels: {
        display: false
        // display: (context: any) => {
        //   return context.dataset.data[context.dataIndex] !== 0 && 
        //          context.dataIndex !== 0 && 
        //          context.dataIndex !== context.dataset.data.length - 1;
        // }
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 0,
            yMax: 0,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            borderDash: [6, 6],
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
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
          autoSkipPadding: 0, // Padding between labels when auto-skipping
          maxRotation: 0, // Prevent rotation
          minRotation: 0, // Prevent rotation
          callback: function(value: any) {
            return convertTo12Hour(value);
          },
        },
      },
      y: {
        beginAtZero: false,
        // display: false,
        max: yAxisMax, // Set the calculated maximum value
        grid: {
          color: "#E5E7EB50",
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
          padding: 0,
          callback: (value: number) => formatNumber(value),
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    }
  };

  return (
    <div className="w-auto h-auto p-4 bg-white rounded-[12px]">
      <div className="w-full h-[200px]">
        <Line data={chartData} options={options as any} />
      </div>
      {/* Additional Legends Container */}
      <div className="flex flex-wrap gap-2 justify-around mt-2">
        {/* Main dataset legend */}
        <div className="flex items-center">
          <span className="text-[10px] text-gray-600">Promised: {formatNumber(requiredToPlayed?.reduce((acc, num) => acc + num, 0))}</span>
        </div>
        
        {/* Additional legends */}
        <div className="flex items-center gap-1">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: "#D7D7D7" }}
          ></div>
          <span className="text-[10px] text-gray-600">
            Total Delivery: {formatNumber(played?.reduce((acc, num) => acc + num, 0))}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: "#D7D7D7" }}
          ></div>
          <span className="text-[10px] text-gray-600">
            Extra Delivery: {overDelivered?.reduce((acc, num) => acc + num, 0) > 0 ? formatNumber(overDelivered?.reduce((acc, num) => acc + num, 0)) : 0}
          </span>
        </div>
      </div>
    </div>
  );
};