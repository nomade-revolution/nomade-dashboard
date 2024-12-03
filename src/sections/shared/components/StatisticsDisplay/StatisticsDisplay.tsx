import { useMediaQuery } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

interface Props {
  barCategories: string[];
  data: number[];
}

const StadisticsDisplay = ({
  barCategories,
  data,
}: Props): React.ReactElement => {
  const matches = useMediaQuery("(max-width: 1000px)");
  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: barCategories,
          scaleType: "band",
          tickLabelStyle: {
            fontWeight: "bold",
          },
        },
      ]}
      yAxis={[
        {
          id: "yAxis",
          scaleType: "linear",
          max: 100,
        },
      ]}
      series={[
        {
          data: data,
        },
      ]}
      width={matches ? 320 : 500}
      height={300}
    />
  );
};

export default StadisticsDisplay;
