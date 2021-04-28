import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './UserLanguages.css';
import { color, generalColor, graphColors } from '../../resources/colors'
import { GetLablesAndValues } from "../../extentions/extentions"



type LanguageData = {
    [key: string]: number;
}


type PropType = {
    width?: string,
    height?: string,
    legendPosition?: string,
    username?: string,
    url?: string,
    reposName?: string,
};

function formatLanguageBytes(value: number){
    if (value > 1024 * 1024)
        return `${(value / (1024 * 1024)).toFixed(1)}MB`
    if (value > 1024)
        return `${(value / 1024).toFixed(1)}KB`
    return `${value}B`
}


function LanguagesChart(props: PropType) {
    let [data, setData] = useState<LanguageData>({});

    const options = (lables: string[], legendOffset: number, legendPosition?: string) => {
        return {
            // chart: {
            //     width: props.width || "99%",
            //     height: props.height || "99%"
            // },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 270,
                }
            },
            noData: {
                text: 'No languages',
                align: 'center',
                verticalAlign: 'middle',
                style: {
                  color: "#888888",
                  fontSize: '1vw',
                  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
                  'Droid Sans', 'Helvetica Neue', sans-serif`
                }
              },
            animations: {
                enabled: true,
                // easing: 'line',
                // speed: 800,
                // animateGradually: {
                //   enabled: true,
                //   delay: 150
                // },
                // dynamicAnimation: {
                //   enabled: true,
                //   speed: 350
                // }
            },
            //colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800', '#ffd230'],
            tooltip: {
                y: {
                    formatter: (value: number) => formatLanguageBytes(value)
                }
            },
            colors: graphColors,
            labels: lables,
            legend: {
                offsetX: legendOffset,
                position: legendPosition || 'right',
                horizontalAlign: 'left',
                // verticalAlign: 'center',
                fontSize: '17em',
                itemMargin: {
                    vertical: 5,
                },
                formatter: function (seriesName: any, opts: any) {
                    return [" " + seriesName]
                },
            },
            responsive: [{
                breakpoint: 1700,
                options: {
                    chart: {
                        width: 450,
                        height: 250
                    },
                },
            },
            {
                breakpoint: 1500,
                options: {
                    chart: {
                        width: 450,
                        height: 250
                    },
                },
            },
            {
                breakpoint: 1000,
                options: {
                    chart: {
                        width: 300,
                        height: 150
                    },
                },
            }]
        }
    };

    function getLanguagesPromise(data: PropType) {
        if (data.reposName) {
            return fetch(`/reposlangs`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ reposName: data.reposName })
            })
        }
        const queryUsername = props.username ? "?username=" + props.username : "";
        // const repositories = await fetch(`/lang${queryUsername}`);
        return fetch(`/userlangs${queryUsername}`);
    }

    async function getLanguagesStatistic() {
        const languages = await (await getLanguagesPromise(props)).json()


        console.log(languages, "LANG");
        setData(languages)
    }

    useEffect(() => {
        getLanguagesStatistic();
    }, [])

    let parsedData = GetLablesAndValues(data)
    const legendOffset = props.legendPosition === "left" ? 0 : -15;
    return (
        <div className="langStatistics">
            <div>
                <Chart
                    options={options(parsedData.lables, props.width ? legendOffset : 20, props.legendPosition)}
                    series={parsedData.values}
                    type="pie"
                    width={props.width || "99%"}
                    height={props.height || "99%"}
                    /* height={"100%"} */ />

            </div>
        </div>
    );
}

export default LanguagesChart;