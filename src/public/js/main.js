const setTotalVolume = (newTotalVolume, deviceId) => {
  document.getElementById(`total-volume-${deviceId}`).innerHTML = `Total volume: ${newTotalVolume || 0} Liters`;
};

const setAliasHandler = (e, client, parentEl, deviceId) => {
  const alias = e.target.value;

  client.setAlias(alias, deviceId).then((res) => {
    addDeviceIdEl(alias, parentEl)
  })
}

const addDeviceNameClickHandlers = (chartContainer, client, deviceId) => {
  const deviceNameContainerEls = chartContainer.getElementsByClassName('device-name-container');

  if (!deviceNameContainerEls || !deviceNameContainerEls.length) {
    return;
  }

  const deviceIdEls = deviceNameContainerEls[0].getElementsByClassName('device-id');
  if (!deviceIdEls || !deviceIdEls.length) {
    return;
  }
  deviceIdEls[0]
    .addEventListener(
      'click',
      () => addDeviceAliasInput(
        deviceNameContainerEls[0],
        (e) => setAliasHandler(e, client, deviceNameContainerEls[0], deviceId)
      )
    )
}

const processRecord = (recordData, charts, volumes, client) => {
  const { device_id: deviceId, record, alias } = recordData;
  const { total_volume: totalVolume } = record;

  let chart = charts.get(deviceId);

  if (!chart) {
    const chartId = `chart-${deviceId}`;
    const chartContainerEl = addChartContainerContent(chartId, deviceId, alias);
    addDeviceNameClickHandlers(chartContainerEl, client, deviceId);
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
          processRecord(recordData, charts, volumes, client);
        }
      });
  }, 1000);
};

