export const createPie = (data: any) => {
  const viewdata: {
    value: string | number;
    name: string;
    bv: string;
  }[] = [];
  data.map((el: any) => {
    viewdata.push({
      value: el.view,
      name: el.title,
      bv: el.bvid,
    });
  });
  const pieOption = {
    legend: {
      top: "bottom",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "热榜饼图",
        type: "pie",
        radius: [50, 110],
        center: ["50%", "40%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: viewdata,
      },
    ],
  };
  return pieOption;
};
