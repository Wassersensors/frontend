function FlowChart() {
    this.config = null,
        this.chart = null
}

FlowChart.prototype.initialize = function () {
    this.config = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'WaterFlow',
                backgroundColor: 'rgb(255, 255, 255)',
                borderColor: 'rgb(113, 50, 168)',
                data: [],
            }]
        },
        options: {}
    };

    this.chart = new Chart(
        document.getElementById('flow-chart'),
        this.config,
    )
}

FlowChart.prototype.addRecord = function ({ label, dataValue }) {
    this.chart.data.labels.push(label);
    this.chart.data.datasets[0].data.push(dataValue);

    this.chart.update();
}