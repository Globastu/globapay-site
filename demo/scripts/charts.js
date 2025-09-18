// Interactive chart components using Recharts

const ChartComponents = {
  renderAreaChart: function(containerId, data) {
    const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = Recharts;
    const { createElement } = React;
    
    const AreaChartComponent = createElement(ResponsiveContainer, 
      { width: "100%", height: 300 },
      createElement(AreaChart, {
        data: data,
        margin: { top: 10, right: 30, left: 0, bottom: 0 }
      }, [
        createElement("defs", { key: "defs" }, 
          createElement("linearGradient", { 
            id: "areaGradient", 
            x1: "0", 
            y1: "0", 
            x2: "0", 
            y2: "1" 
          }, [
            createElement("stop", { 
              key: "stop1", 
              offset: "5%", 
              stopColor: "hsl(173, 100%, 36%)", 
              stopOpacity: 0.3 
            }),
            createElement("stop", { 
              key: "stop2", 
              offset: "95%", 
              stopColor: "hsl(173, 100%, 36%)", 
              stopOpacity: 0 
            })
          ])
        ),
        createElement(CartesianGrid, { 
          key: "grid",
          strokeDasharray: "3 3", 
          stroke: "hsl(214.3, 31.8%, 91.4%)", 
          strokeOpacity: 0.5 
        }),
        createElement(XAxis, { 
          key: "xaxis",
          dataKey: "date",
          axisLine: false,
          tickLine: false,
          tick: { fontSize: 12, fill: "hsl(215.4, 16.3%, 46.9%)" }
        }),
        createElement(YAxis, { 
          key: "yaxis",
          axisLine: false,
          tickLine: false,
          tick: { fontSize: 12, fill: "hsl(215.4, 16.3%, 46.9%)" }
        }),
        createElement(Tooltip, { 
          key: "tooltip",
          content: ({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return createElement("div", {
                className: "rounded-lg border bg-white dark:bg-gray-900 p-3 shadow-lg",
                style: { border: "1px solid hsl(214.3, 31.8%, 91.4%)" }
              }, [
                createElement("div", { key: "label", className: "text-xs uppercase text-gray-500 mb-1" }, label),
                createElement("div", { key: "value", className: "font-bold text-gray-900 dark:text-white" }, 
                  `$${payload[0]?.value?.toLocaleString()}`
                )
              ]);
            }
            return null;
          }
        }),
        createElement(Area, {
          key: "area",
          type: "monotone",
          dataKey: "revenue",
          stroke: "hsl(173, 100%, 36%)",
          strokeWidth: 2,
          fill: "url(#areaGradient)",
          animationDuration: 1000
        })
      ])
    );
    
    ReactDOM.render(AreaChartComponent, document.getElementById(containerId));
  },

  renderBarChart: function(containerId, data) {
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = Recharts;
    const { createElement } = React;
    
    const BarChartComponent = createElement(ResponsiveContainer, 
      { width: "100%", height: 300 },
      createElement(BarChart, {
        data: data,
        margin: { top: 10, right: 30, left: 0, bottom: 0 }
      }, [
        createElement(CartesianGrid, { 
          key: "grid",
          strokeDasharray: "3 3", 
          stroke: "hsl(214.3, 31.8%, 91.4%)", 
          strokeOpacity: 0.5 
        }),
        createElement(XAxis, { 
          key: "xaxis",
          dataKey: "date",
          axisLine: false,
          tickLine: false,
          tick: { fontSize: 12, fill: "hsl(215.4, 16.3%, 46.9%)" }
        }),
        createElement(YAxis, { 
          key: "yaxis",
          axisLine: false,
          tickLine: false,
          tick: { fontSize: 12, fill: "hsl(215.4, 16.3%, 46.9%)" }
        }),
        createElement(Tooltip, { 
          key: "tooltip",
          content: ({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return createElement("div", {
                className: "rounded-lg border bg-white dark:bg-gray-900 p-3 shadow-lg",
                style: { border: "1px solid hsl(214.3, 31.8%, 91.4%)" }
              }, [
                createElement("div", { key: "label", className: "text-xs uppercase text-gray-500 mb-1" }, label),
                createElement("div", { key: "value", className: "font-bold text-gray-900 dark:text-white" }, 
                  `${payload[0]?.value} transactions`
                )
              ]);
            }
            return null;
          }
        }),
        createElement(Bar, {
          key: "bar",
          dataKey: "volume",
          fill: "hsl(158, 64%, 52%)",
          radius: [4, 4, 0, 0],
          animationDuration: 1000
        })
      ])
    );
    
    ReactDOM.render(BarChartComponent, document.getElementById(containerId));
  }
};

// Sample chart data that matches your platform
const CHART_DATA = {
  revenueData: [
    { date: '2024-01-01', revenue: 4000 },
    { date: '2024-01-02', revenue: 3000 },
    { date: '2024-01-03', revenue: 5000 },
    { date: '2024-01-04', revenue: 7000 },
    { date: '2024-01-05', revenue: 6000 },
    { date: '2024-01-06', revenue: 8000 },
    { date: '2024-01-07', revenue: 9000 }
  ],
  
  volumeData: [
    { date: '2024-01-01', volume: 120 },
    { date: '2024-01-02', volume: 98 },
    { date: '2024-01-03', volume: 156 },
    { date: '2024-01-04', volume: 187 },
    { date: '2024-01-05', volume: 134 },
    { date: '2024-01-06', volume: 210 },
    { date: '2024-01-07', volume: 243 }
  ]
};