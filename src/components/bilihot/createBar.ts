const createViewBar = (
  data: {
    pub_location: string;
    view: string;
    like: string;
    coin: string;
    favorite: string;
  }[]
) => {
  const isource: [string, string, string, string, string][] = [];
  data.map((el) => {
    if (el.pub_location == "未知") return;
    isource.push([el.pub_location, el.view, el.like, el.coin, el.favorite]);
  });
  const option = {
    tooltip: {},
    dataset: [
      {
        dimensions: ["pub_location", "view", "like", "coin", "favorite"],
        source: isource,
      },
      {
        transform: {
          type: "sort",
          config: { dimension: "view", order: "desc" },
        },
      },
    ],
    xAxis: {
      type: "category",
      axisLabel: { interval: 0, rotate: 30 },
    },
    yAxis: {},
    series: {
      type: "bar",
      encode: { x: "pub_location", y: "view" },
      datasetIndex: 1,
    },
  };
  return option;
};

export { createViewBar };
