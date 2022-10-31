window.onload = () => {
    const todaysDate = getTodaysMonthAndDayString();
    document.getElementById('todays-date').innerHTML = todaysDate;

    const flowChart = new FlowChart();
    flowChart.initialize();

    const client = new FlowClient();

    setInterval(() => {
        client.getFlowRecord()
            .then((res) => res.json())
            .then((res) => {
                const { rate, timestamp, total_volume } = res;

                flowChart.addRecord({
                    label: formatTimestamp(timestamp),
                    dataValue: rate
                })
                setTotalVolume(total_volume)
            })
    }, 1000);
}

const setTotalVolume = (newTotalVolume) => {
  document.getElementById('total-daily-volume').innerHTML = `Total volume: ${newTotalVolume || 0} Liters`;
}