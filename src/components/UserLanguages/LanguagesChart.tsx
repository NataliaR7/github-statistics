import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './UserLanguages.css';
import { color, generalColor, graphColors } from '../../resources/colors'
import { GetLablesAndValues } from "../../extentions/extentions"


type PropType = {
    data: {[key: string]: number},
    width?: string,
    height?: string,
    legendPosition?: string,
    tooltipFormater?: (value: number) => string
};


function LanguagesChart(props: PropType) {

    const options = (lables: string[], legendOffset: number, legendPosition?: string) => {
        return {
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
            },
            tooltip: {
                y: {
                    formatter: props.tooltipFormater
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

    let parsedData = GetLablesAndValues(props.data)
    const legendOffset = props.legendPosition === "left" ? 0 : -15;
    return (
            <div>
                <Chart
                    options={options(parsedData.lables, props.width ? legendOffset : 20, props.legendPosition)}
                    series={parsedData.values}
                    type="pie"
                    width={props.width || "99%"}
                    height={props.height || "99%"}
                    /* height={"100%"} */ />

            </div>
    );
}

export default LanguagesChart;