import './ActivityChart.css';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { graphColors } from '../../resources/colors';

interface PropsType {
    username?: string
}

interface MainData {
    xaxisData: string[],
    series: Series[]
}

interface Series {
    name: string,
    data: number[]
}

const ActivityChart: React.FC<PropsType> = props => {
    const [data, setData] = useState<{ [key: string]: any }>({});
    const [tempSeries, setTempSeries] = useState<MainData>();
    const [mainData, setMainData] = useState<MainData>();
    const [isMainChart, setIsMainChart] = useState<boolean>(true);

    useEffect(() => {
        getActivityStatistic(props.username).then((res) => {
            setData(res);
            setMainData(GetLablesAndSeries(res));
        });
    }, [props.username])

    const options = (xaxisData: string[]) => {
        return {
            chart: {
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
                        pan: true,
                        reset: true,
                    }
                },
                zoom: {
                    enabled: true
                },

                events: {
                    dataPointSelection: function (e: any, chart: any, opts: any) {
                        let dataPoints = chart.w.globals.selectedDataPoints;
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
            plotOptions: plotOptions,
            colors: [function (data: { value: number, seriesIndex: number, w: any }) {
                return getСolumnColor(data.value);
            }],
            states: states(isMainChart),
            dataLabels: dataLabels,
            xaxis: xaxis(xaxisData),
            yaxis: yaxis,
            legend: {
                position: 'right',
                offsetY: 40
            },
        }
    }

    function backToMainChart() {
        !isMainChart && setIsMainChart(true);
    }

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

async function getActivityStatistic(username?: string) {
    const queryUsername = username ? "?username=" + username : "";
    return await (await fetch(`/activity${queryUsername}`)).json();
}

const chartHeight = "100%";

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

};

const plotOptions = {
    bar: {
        dataLabels: {
            position: 'top',
        },
    }
};

const states = (isMainChart: boolean) => ({
    normal: {
        filter: {
            type: 'none',
            value: 1,
        }
    },
    active: {
        filter: {
            type: isMainChart ? 'darken' : 'none',
            value: 1,
        }
    },
    hover: {
        filter: {
            type: isMainChart ? 'darken' : 'none',
            value: 0.5,
        }
    },
});

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
};

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

};

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
    const values = [];
    const xaxisData = [];
    for (let key in data) {
        xaxisData.push(key);
        values.push(data[key]);
    }
    return { xaxisData: xaxisData, series: [{ name: "Activity", data: values }] }
}

function getСolumnColor(value: number) {
    switch (true) {
        case value > 100:
            return graphColors[0];
        case value > 30:
            return graphColors[1];
        case value > 6:
            return graphColors[2];
        default:
            return graphColors[3];
    }
}

export default ActivityChart;