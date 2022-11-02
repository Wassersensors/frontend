const createChart = (deviceId, chartId) => {
  const chart = new FlowChart(deviceId, chartId);
  chart.initialize();
  
  return chart;
};
  
const createChartContainerEl = () => {
  const chartContainerEl = document.createElement('div');
  chartContainerEl.classList.add('chart-container');
  
  return chartContainerEl;
};
  
const createChartEl = (chartId) => {
  const chartEl = document.createElement('canvas');
  chartEl.id = chartId;
  chartEl.classList.add('chart');
  
  return chartEl;
};

const addDeviceIdEl = (deviceId, chartContainerEl) => {
  const wrapperEl = document.createElement('div');
  const deviceIdEl = document.createElement('h2');
  deviceIdEl.innerText = `Device: ${deviceId}`

  wrapperEl.appendChild(deviceIdEl);
  chartContainerEl.appendChild(wrapperEl);
}
  
const addNewChartEl = (chartId, chartContainerEl) => {
  const chartEl = createChartEl(chartId);
  chartContainerEl.appendChild(chartEl);
};

const addTotalVolumeEl = (deviceId, chartContainerEl) => {
  const totalVolumeEl = document.createElement('div');
  totalVolumeEl.id = `total-volume-${deviceId}`;

  chartContainerEl.appendChild(totalVolumeEl);
};
  
const addChartContainerContent = (chartId, deviceId) => {
  const chartsParentEl = document.getElementById('charts');
  
  const chartContainerEl = createChartContainerEl();
  chartsParentEl.appendChild(chartContainerEl);
  
  addDeviceIdEl(deviceId, chartContainerEl);
  addNewChartEl(chartId, chartContainerEl);
  addTotalVolumeEl(deviceId, chartContainerEl);
};