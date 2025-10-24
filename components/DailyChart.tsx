"use client";

type DailyChartProps = {
  data: {
    date: Date;
    value: number;
  }[];
  className?: string;
  title?: string;
  color?: "purple" | "neutral" | "green" | "red";
  gapSize?: "small" | "medium" | "large";
};

export const DailyChart = ({
  data,
  className,
  title,
  color = "purple",
  gapSize = "medium",
}: DailyChartProps) => {
  const borderColorClass = {
    purple: "border-purple-500",
    neutral: "border-white",
    green: "border-green-600",
    red: "border-red-600",
  };

  const backgroundColorClass = {
    purple: "bg-purple-500/50",
    neutral: "bg-white/50",
    green: "bg-green-600/50",
    red: "bg-red-600/50",
  };

  const gapSizeClass = {
    small: "gap-2",
    medium: "gap-4",
    large: "gap-6",
  };

  // Compute the max value in the data array
  const maxValue =
    data.length > 0 ? Math.max(...data.map((item) => item.value)) : 1;

  // Helper function to get the percent height for a value (0 to 100)
  const getPercentHeight = (value: number) =>
    maxValue === 0 ? 0 : (value / maxValue) * 100;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <h2 className="text-lg font-bold font-mono">{title}</h2>
      <div className={`flex ${gapSizeClass[gapSize]} flex-grow-1`}>
        {data.map((item) => (
          <div
            key={item.date.toISOString()}
            className={`flex flex-col flex-grow-1 h-full gap-2 hover:cursor-pointer hover:opacity-80 transition-opacity duration-200`}
          >
            <div
              className={`border-b ${borderColorClass[color]} relative h-full`}
              style={{ borderBottomWidth: "3px" }}
            >
              <div
                className={`${backgroundColorClass[color]} absolute bottom-0 left-0 right-0`}
                style={{ height: `${getPercentHeight(item.value)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-foreground/50">
        <div>
          {data[0]?.date?.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>
        <div>
          {data[data.length - 1]?.date?.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyChart;
