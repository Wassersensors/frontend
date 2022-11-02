const setTotalVolume = (newTotalVolume, deviceId) => {
  document.getElementById(`total-volume-${deviceId}`).innerHTML = `Total volume: ${newTotalVolume || 0} Liters`;
};

const processRecord = (recordData, charts, volumes) => {
  const { device_id: deviceId, record } = recordData;
  const { total_volume: totalVolume } = record;

  let chart = charts.get(deviceId);

  if (!chart) {
    const chartId = `chart-${deviceId}`;
    addChartContainerContent(chartId, deviceId);
    chart = createChart(deviceId, chartId);
    charts.set(deviceId, chart);
  }

  chart.addRecord({ label: formatTimestamp(record.timestamp), dataValue: record.rate });

  if (!volumes.has(deviceId)) {
    volumes.set(deviceId, totalVolume);
  }
  setTotalVolume(totalVolume, deviceId);
};

window.onload = () => {
  const todaysDate = getDisplayDate();
  document.getElementById('todays-date').innerHTML = todaysDate;

  const charts = new Map();
  const volumes = new Map();
  const client = new FlowClient();

  setInterval(() => {
    client.getFlowRecord()
      .then((res) => res.json())
      .then((res) => {
        for (let recordData of res) {
          processRecord(recordData, charts, volumes);
        }
      });
  }, 1000);
};

