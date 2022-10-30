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
                const { rate, timestamp } = res;

                flowChart.addRecord({
                    label: formatTimestamp(timestamp),
                    dataValue: rate
                })
            })
    }, 1000);
}