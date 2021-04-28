import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { color, generalColor, graphColors } from '../../resources/colors'
import { GetLablesAndValues } from "../../extentions/extentions"


interface PropType {
    data: {[key: string]: number},
    width?: string,
    height?: string,
    legendPosition?: string,
    noDataLabel?: string,
    colors?: string[],
    tooltipFormater?: (value: number) => string

};

const options = (lables: string[], props: PropType) => {
    const legendOffset = props.legendPosition === "left" ? 0 : -15;
    return {
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270,
            }
        },
        noData: {
            text: props.noDataLabel || "No data",
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
        colors: props.colors || graphColors,
        labels: lables,
        legend: {
            offsetX: legendOffset,
            position: props.legendPosition || 'right',
            horizontalAlign: 'left',
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



function PieChart(props: PropType) {   

    let parsedData = GetLablesAndValues(props.data)
    return (
            <div>
                <Chart
                    options={options(parsedData.lables, props)}
                    series={parsedData.values}
                    type="pie"
                    width={props.width || "99%"}
                    height={props.height || "99%"}
                    /* height={"100%"} */ />

            </div>
    );
}

export default PieChart;