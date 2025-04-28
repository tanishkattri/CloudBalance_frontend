import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

Charts(FusionCharts);
FusionTheme(FusionCharts);

const TwoDBarChart = ({ costData = [], groupByKey = "MYCLOUD_COST_EXPLORER_USAGE_GROUP_TYPE" }) => {
  if (!costData.length) return null;

  // Step 1: Extract unique months
  const uniqueMonths = Array.from(new Set(costData.map(item => item.USAGE_MONTH)));

  // Step 2: Extract unique group names (filter nulls)
  const uniqueGroups = Array.from(
    new Set(
      costData
        .filter(item => item[groupByKey] !== null)
        .map(item => item[groupByKey])
    )
  );

  // 🔥 Step 3: Prepare categories (months on x-axis)
  const categories = [
    {
      category: uniqueMonths.map(month => ({
        label: month
      }))
    }
  ];

  // 🔥 Step 4: Prepare dataset correctly
  const dataset = uniqueGroups.map(group => ({
    seriesname: group,
    data: uniqueMonths.map(month => {
      const record = costData.find(
        (item) =>
          item.USAGE_MONTH === month &&
          item[groupByKey] === group
      );
      return { value: record ? record.TOTAL_USAGE_COST.toFixed(2) : "0" };
    })
  }));

  const dataSource = {
    chart: {
      caption: "Cloud Cost Explorer",
      xAxisName: "Month",
      yAxisName: "Total Cost ($)",
      numberPrefix: "$",
      theme: "fusion",
      drawCrossLine: "1",
      showValues: "0",
      decimals: "2",
      plotToolText: "$seriesName in $label: $dataValue"
    },
    categories,
    dataset
  };

  return (
    <ReactFusioncharts
      type="mscolumn2d" 
      width="100%"
      height="500"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default TwoDBarChart;
