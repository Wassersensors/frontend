const setTotalVolume = (newTotalVolume, deviceId) => {
  document.getElementById(`total-volume-${deviceId}`).innerHTML = `Total volume: ${newTotalVolume || 0} Liters`;
};

const setAliasHandler = (e, client, parentEl, deviceId) => {
  const alias = e.target.value;

  if (!alias) {
    addDeviceIdEl(deviceId, deviceId, parentEl);
    addDeviceNameClickHandlers(parentEl, client, deviceId);
    return;
  }

  client.setAlias(alias, deviceId).then((res) => {
    addDeviceIdEl(alias, deviceId, parentEl);
    addDeviceNameClickHandlers(parentEl, client, deviceId);
  });
};

const addDeviceNameClickHandlers = (containerEl, client, deviceId) => {
  const deviceIdEl = containerEl.getElementsByClassName('device-id')[0];

  if (!deviceIdEl) {
    return;
  }

  deviceIdEl.addEventListener('click', () => addDeviceAliasInput(containerEl, (e) => setAliasHandler(e, client, containerEl, deviceId)));
};

const processRecord = (recordData, charts, volumes, client) => {
  const { device_id: deviceId, record, alias } = recordData;
  const { total_volume: totalVolume } = record;

  let chart = charts.get(deviceId);

  if (!chart) {
    const chartId = `chart-${deviceId}`;
    addChartContainerContent(chartId, deviceId, alias);
    const deviceNameContainerEl = document.getElementById(getDeviceNameContainerId(deviceId));
    addDeviceNameClickHandlers(deviceNameContainerEl, client, deviceId);
    chart = createChart(deviceId, chartId);
    charts.set(deviceId, chart);
  }

  chart.addRecord({ label: formatTimestamp(record.timestamp), dataValue: record.rate });

  if (!volumes.has(deviceId)) {
    volumes.set(deviceId, totalVolume);
  }
  setTotalVolume(totalVolume, deviceId);
};

const initializePolling = (client, charts, volumes) => {
  const setPollingInterval = () => {
     return setInterval(() => {
        client.getFlowRecord()
          .then((res) => res.json())
          .then((res) => {
            for (let recordData of res) {
              processRecord(recordData, charts, volumes, client);
            }
          });
      }, 1000);
  }
  
  let interval = setPollingInterval();
  
  const pauseButton = document.getElementById('pause-button');
  
  pauseButton.addEventListener('click', (() => {
    if (interval) {
      clearInterval(interval);
      interval = undefined;
      pauseButton.innerText = 'Resume';
    } else {
      interval = setPollingInterval();
      pauseButton.innerText = 'Pause';
    }
  }));
}


window.onload = () => {
  const todaysDate = getDisplayDate();
  document.getElementById('todays-date').innerHTML = todaysDate;

  const charts = new Map();
  const volumes = new Map();
  const client = new FlowClient();

  initializePolling(client, charts, volumes);
};
