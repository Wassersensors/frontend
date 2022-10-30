window.onload = () => {
    const flowChart = new FlowChart();
    flowChart.initialize();

    const client = new FlowClient();

    setInterval(() => {
        client.getFlowRecord().then((res) => {
            const { rate, timestamp } = res;

            flowChart.addRecord({
                label: formatTimestamp(timestamp),
                dataValue: rate
            })
        })

    }, 1000);
}