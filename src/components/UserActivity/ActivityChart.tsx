import { type } from 'node:os';
import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts'
import { color, generalColor, graphColors, getRandomColor } from '../../resources/colors'
import './ActivityChart.css'

const dataLabels = {
    enabled: true,
    formatter: function (val: number) {
        return val === 0 ? "" : val
    },
    textAnchor: 'middle',
    style: {
        fontSize: '0.8em',
        colors: ["#888888"]
    },
    offsetY: -10,

}

const responsive = [{
    breakpoint: 480,
    options: {
        legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
        }
    }
}]

const plotOptions = {
    bar: {
        dataLabels: {
            position: 'top',
        },
    }
}

const xaxis = (xaxisData: string[]) => {
    return {
        categories: xaxisData,
        position: 'bottom',
        labels: {
            show: true,
            style: {
                colors: "#646464",
                fontSize: '0.8em',
                fontFamily: 'Segoe UI, Roboto',
            },
        },
        tooltip: {
            enabled: false,
        },
        tickPlacement: 'on'
    }
}

const yaxis = {
    axisBorder: {
        show: true
    },
    axisTicks: {
        show: true,
    },
    labels: {
        show: true,
    },

}

function GetLablesAndSeries(activityStatistic: { [key: string]: any }) {
    let xaxisData = Object.keys(activityStatistic)

    let values: number[] = []
    for (let key in activityStatistic) {
        let allActivityPerMonth = 0
        for (let partKey in activityStatistic[key]) {
            allActivityPerMonth += activityStatistic[key][partKey]
        }
        values.push(allActivityPerMonth)
    }
    return { xaxisData, series: [{ name: "Activity", data: values }] };
}

function getTempSeries(data: { [key: string]: number }) {
    let values = []
    let xaxisData = []
    for (let key in data) {
        xaxisData.push(key)
        values.push(data[key])
    }
    return { xaxisData: xaxisData, series: [{ name: "Activity", data: values }] }
}

function getСolumnColor(value: number) {
    switch (true) {
        case value > 100:
            return graphColors[0]//'#fa5b16'
        case value > 30:
            return graphColors[1]//'#f0a91d'
        case value > 6:
            return graphColors[2]//'#eafa41'
        default:
            return graphColors[3]//'#72f276'
    }
}

interface Series {
    name: string,
    data: number[]
}

interface MainData {
    xaxisData: string[],
    series: Series[]
}


function ActivityChart(props: { data?: { [key: string]: number }, username?: string }) {
    let [data, setData] = useState<{ [key: string]: any }>({})
    let [tempSeries, setTempSeries] = useState<MainData>()
    let [mainData, setMainData] = useState<MainData>()
    let [isMainChart, setIsMainChart] = useState<boolean>(true)

    const options = (xaxisData: string[]) => {
        return {
            chart: {
                type: 'bar',
                toolbar: {
                    show: true,
                    offsetX: -15,
                    offsetY: 0,
                    tools: {
                        customIcons: !isMainChart && [{
                            icon: '<span>⮌ back</span>',
                            index: -10,
                            title: 'back to general',
                            class: 'backButton',
                            click: backToMainChart
                        }],
                        download: true,
                        selection: false,
                        zoom: false,
                        zoomin: true,
                        zoomout: true,
                        pan: false,
                        reset: true,

                    }
                },
                zoom: {
                    enabled: true
                },

                events: {
                    dataPointSelection: function (e: any, chart: any, opts: any) {
                        let dataPoints = chart.w.globals.selectedDataPoints
                        for (let point of dataPoints) {
                            if (point && point.length !== 0 && isMainChart) {
                                let month = Object.keys(data)[point[0]]
                                let ser = getTempSeries(data[month])
                                setIsMainChart(false)
                                setTempSeries(ser)
                            }
                        }
                    },
                }
            },
            responsive: responsive,
            plotOptions: plotOptions,
            fill: {
                opacity: 1,            },
            colors: [function (data: { value: number, seriesIndex: number, w: any }) {
                return getСolumnColor(data.value);
            }],  
            dataLabels: dataLabels,
            xaxis: xaxis(xaxisData),
            yaxis: yaxis,
            legend: {
                position: 'right',
                offsetY: 40
            },
        }
    }

    async function getActivityStatistic() {
        const queryUsername = props.username ? "?username=" + props.username : "";
        const result = await (await fetch(`/activity${queryUsername}`)).json();
        setData(result)
        setMainData(GetLablesAndSeries(result))

    }

    useEffect(() => {
        getActivityStatistic();
    }, [])

    function backToMainChart() {
        if (!isMainChart) {
            setIsMainChart(true)
        }
    }
    const chartHeight = "100%"
    return (
        <div className="activityStatistics">
            {isMainChart
                ? mainData && <Chart type="bar" height={chartHeight} width={chartHeight} options={options(mainData.xaxisData)} series={mainData.series} />
                : tempSeries && <>
                    <Chart type="bar" height={chartHeight} options={options(tempSeries.xaxisData)} series={tempSeries.series} />
                </>
            }
        </div>
    );
}

export default ActivityChart;