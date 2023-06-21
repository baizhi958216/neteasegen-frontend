const createViewPie = (data: any) => {
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
      type: "scroll",
      orient: "vertical",
      right: 10,
      top: "center",
      data: viewdata,
    },
    title: {
      text: "Bili热度排行饼图",
      left: 20,
      top: 20,
    },
    tooltip: {},
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
        name: "播放量",
        type: "pie",
        radius: [20, 140],
        center: ["20%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 5,
        },
        label: {
          show: false,
        },
        data: viewdata,
      },
    ],
  };
  return pieOption;
};

export { createViewPie };
