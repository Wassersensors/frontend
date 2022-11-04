const getDeviceIdElId = (deviceId) => {
  return `device-name-${deviceId}`;
};

const getDeviceNameContainerId = (deviceId) => `device-name-container-${deviceId}`;

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

const addDeviceNameContainer = (deviceId, chartContainerEl) => {
  const wrapperEl = document.createElement('div');
  wrapperEl.id = getDeviceNameContainerId(deviceId);
  wrapperEl.classList.add('device-name-container');
  chartContainerEl.appendChild(wrapperEl);

  return wrapperEl;
};

const addDeviceIdEl = (alias, deviceId, parentEl) => {
  const deviceIdEl = document.createElement('h2');
  deviceIdEl.innerText = `Device: ${alias}`;
  deviceIdEl.classList.add('device-id');
  deviceIdEl.id = getDeviceIdElId(deviceId);

  removeAliasInput(parentEl);
  parentEl.appendChild(deviceIdEl);
};

const removeDeviceIdEl = (parentEl) => {
  const deviceIdEls = parentEl.getElementsByClassName('device-id');

  if (deviceIdEls && deviceIdEls.length) {
    parentEl.removeChild(deviceIdEls[0]);
  }
};

const addDeviceAliasInput = (parentEl, onBlur) => {
  const aliasInput = document.createElement('input');
  aliasInput.classList.add('device-alias');
  aliasInput.placeholder = 'Set device alias';
  aliasInput.addEventListener('blur', onBlur);

  removeDeviceIdEl(parentEl);
  parentEl.appendChild(aliasInput);
};

const removeAliasInput = (parentEl) => {
  const aliasInputs = parentEl.getElementsByClassName('device-alias');

  if (aliasInputs && aliasInputs.length) {
    parentEl.removeChild(aliasInputs[0]);
  }
};

const addNewChartEl = (chartId, chartContainerEl) => {
  const chartEl = createChartEl(chartId);
  chartContainerEl.appendChild(chartEl);
};

const addTotalVolumeEl = (deviceId, chartContainerEl) => {
  const totalVolumeEl = document.createElement('div');
  totalVolumeEl.id = `total-volume-${deviceId}`;

  chartContainerEl.appendChild(totalVolumeEl);
};

const addChartContainerContent = (chartId, deviceId, alias) => {
  const chartsParentEl = document.getElementById('charts');

  const chartContainerEl = createChartContainerEl();
  chartsParentEl.appendChild(chartContainerEl);

  const deviceNameContainer = addDeviceNameContainer(deviceId, chartContainerEl);

  addDeviceIdEl(alias, deviceId, deviceNameContainer);
  addTotalVolumeEl(deviceId, chartContainerEl);
  addNewChartEl(chartId, chartContainerEl);

  return chartContainerEl;
};