const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const getMonthName = (month) => {
    return months[month];
}

const formatTimestamp = (dateString) => {
    const dt = new Date(dateString);
    console.log(new Date(dateString));
    console.log(dateString);

    const month = dt.getMonth();
    const day = dt.getDate();
    const year = dt.getFullYear();
    
    const hours = dt.getHours();
    const min = dt.getMinutes();
    let sec = dt.getSeconds().toString();

    if (sec.length === 1) {
        sec = `0${sec}`;
    }

    return `${getMonthName(month)} ${day} ${year} - ${hours}:${min}:${sec}`;
}

const isSameMonth = (d1, d2) => {
    return new Date(d1).getMonth() === new Date(d2).getMonth();
}