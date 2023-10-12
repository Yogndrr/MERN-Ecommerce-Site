export const ChartDatabyYear = {
    options: {
        xaxis: {
            categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
            axisBorder: { show: true },
            axisTicks: { show: false },
            labels: { show: true }
        },
        yaxis: {
            min: 0,
            max: 500,
        },
        grid: { show: false },
        chart: {
            sparkline: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        }
    },
    series: [
        {
            name: "series-1",
            data: [100, 170, 200, 450, 300, 400]
        }
    ]
}

export const ChartDataMonth = {
    type: 'line',
    height: 90,
    options: {
        chart: {
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#fff'],
        fill: {
            type: 'solid',
            opacity: 1
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        yaxis: {
            min: 0,
            max: 100
        },
        tooltip: {
            theme: 'dark',
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: 'Total Order'
            },
            marker: {
                show: false
            }
        }
    },
    series: [
        {
            name: 'series1',
            data: [45, 66, 41, 89, 25, 44, 9, 54]
        }
    ]
};

export const ChartDataYear = {
    type: 'line',
    height: 90,
    options: {
        chart: {
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#fff'],
        fill: {
            type: 'solid',
            opacity: 1
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        yaxis: {
            min: 0,
            max: 100
        },
        tooltip: {
            theme: 'dark',
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: 'Total Order'
            },
            marker: {
                show: false
            }
        }
    },
    series: [
        {
            name: 'series1',
            data: [35, 44, 9, 54, 45, 66, 41, 69]
        }
    ]
};
