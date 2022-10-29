const dateAddSeconds = (seconds) => {
    return new Date(new Date().getTime() + (seconds || 0) * 1000).toISOString();
}

const formatTimestamp = (dateString) => {
    const [date, time] = dateString.split('T');

    const [year, month, day] = date.split('-');

    const [displayTime] = time.split('.');

    return `${month} ${day}, ${year} - ${displayTime}`
}


const mockData = [
    { currentFlow: 1, timeStamp: dateAddSeconds(1) },
    { currentFlow: 15, timeStamp: dateAddSeconds(2) },
    { currentFlow: 17, timeStamp: dateAddSeconds(3) },
    { currentFlow: 18, timeStamp: dateAddSeconds(4) },
    { currentFlow: 19, timeStamp: dateAddSeconds(5) },
    { currentFlow: 2, timeStamp: dateAddSeconds(6) },
    { currentFlow: 20, timeStamp: dateAddSeconds(7) },
    { currentFlow: 30, timeStamp: dateAddSeconds(8) },
    { currentFlow: 40, timeStamp: dateAddSeconds(9) },
    { currentFlow: 50, timeStamp: dateAddSeconds(10) },
    { currentFlow: 60, timeStamp: dateAddSeconds(11) },
    { currentFlow: 70, timeStamp: dateAddSeconds(12) },
    { currentFlow: 65, timeStamp: dateAddSeconds(13) },
    { currentFlow: 43, timeStamp: dateAddSeconds(14) },
]

const labels = mockData.map(data => formatTimestamp(data.timeStamp));

const data = {
    labels: labels,
    datasets: [{
        label: 'Water flow',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: mockData.map(data => data.currentFlow),
    }]
};

const chartConfig = {
    type: 'line',
    data: data,
    options: {}
};
