window.onload = () => {
    const todaysDate = getTodaysMonthAndDayString();
    document.getElementById('todays-date').innerHTML = todaysDate;

    const charts = new Map()
    const volumes = new Map()

    const client = new FlowClient();

    setInterval(() => {
        client.getFlowRecord()
            .then((res) => res.json())
            .then((res) => {
                for (let out_rec of res) {
                  const { device_id, alias, record} = out_rec;
                  const { rate, timestamp, total_volume } = record;
                  
                  if (!charts.has(device_id)) {
                    const key = `flow-chart-${device_id}`;
                    if (!document.getElementById(key)) {
                      const newChartContainer = document.createElement('div');
                      newChartContainer.id = 'canvas-container';

                      const newChartDiv = document.createElement('canvas');
                      newChartDiv.id = key;

                      const newTitleEl = document.createElement('input');
                      const inputId = `device-name-input-${device_id}`;
                      newTitleEl.id = inputId;
                      newTitleEl.value = `Device: ${alias}`;

                      const newTitleButton = document.createElement('button');
                      newTitleButton.onclick = () => {
                        const inputEl = document.getElementById(inputId);
                        client.setAlias(inputEl.value, device_id);
                      }
                      newTitleButton.innerText = 'Update device name';

                      const newTotalVolumeEl = document.createElement('div');
                      newTotalVolumeEl.id = `total-daily-volume-${device_id}`;
                      
                      const appEl = document.getElementById('app');
                      appEl.append(newChartContainer);

                      newChartContainer.append(newTitleEl);
                      newChartContainer.append(newTitleButton);
                      newChartContainer.append(newChartDiv);
                      newChartContainer.append(newTotalVolumeEl);
                    }
                    const newFlowChart = new FlowChart(device_id);
                    newFlowChart.initialize();
                    charts.set(device_id, newFlowChart);
                  }

                  const currentChart = charts.get(device_id);
                  currentChart.addRecord({
                    label: formatTimestamp(timestamp),
                    dataValue: rate
                  })

                  if (!volumes.has(device_id)) {
                    volumes.set(device_id, total_volume);
                  }
                  setTotalVolume(total_volume, device_id)
                }
            })
    }, 1000);
}

const setTotalVolume = (newTotalVolume, device_id) => {
  document.getElementById(`total-daily-volume-${device_id}`).innerHTML = `Total volume: ${newTotalVolume || 0} Liters`;
}