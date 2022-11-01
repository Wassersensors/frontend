function FlowChart(device_id) {
    this.device_id = device_id,
    this.data = null,
    this.labels = null,
    this.config = null,
    this.chart = null,
    this.maxChartSize = 100
}

FlowChart.prototype.initialize = function () {
    this.data = [];
    this.labels = [];
    this.config = {
        type: 'line',
        data: {
            labels: this.labels,
            datasets: [{
                label: `${this.device_id}: water flow`,
                backgroundColor: 'rgb(255, 255, 255)',
                borderColor: 'rgb(113, 50, 168)',
                data: this.data,
            }]
        },
        options: {
            animation: false,
        }
    };

    const key = `flow-chart-${this.device_id}`;
    this.chart = new Chart(
        document.getElementById(key),
        this.config,
    )
}

FlowChart.prototype.addRecord = function ({ label, dataValue }) {
    const prevLabel = this.labels[this.labels.length - 1];
    const prevDataValue = this.data[this.data.length - 1];

    // don't add duplicate record
    if (
        prevLabel !== undefined &&
        prevDataValue !== undefined &&
        label === prevLabel &&
        dataValue === prevDataValue
    ) {
        return;
    }

    this.labels.push(label);
    this.data.push(dataValue);

    if (this.data.length > this.maxChartSize) {
        this.data = this.data.slice(1);
        this.labels = this.labels.slice(1);

        this.chart.data.labels = this.labels;
        this.chart.data.datasets[0].data = this.data;
    }


    this.chart.update();
}