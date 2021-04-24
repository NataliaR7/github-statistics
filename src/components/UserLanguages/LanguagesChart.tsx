import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './UserLanguages.css';
import { color, generalColor, graphColors } from '../../resources/colors'
import {GetLablesAndValues} from "../../extentions/extentions"

const options = (lables: string[], legendOffset: number, legendPosition?: string) => {
    return {
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270,
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
        //breakpoint: 480,
        // dataLabels: {
        //   enabled: true,
        // },
        // fill: {
        //   //type: 'solid',
        //   // colors: ["red", "blue", "white", "green", "orange"],
        //   // gradient: {
        //   //   gradientToColors: [ "green", "blue","red",  "orange", "white"],
        //   // },
        // },
        // title: {
        //   text: 'Popular user languages:'
        // },

        // responsive: [{
        //   breakpoint: 480,
        //   options: {
        //     chart: {
        //       width: 200
        //     },
        //     legend: {
        //       position: 'bottom',
        //       horizontalAlign: 'center',
        //       fontSize: '24px',
        //     }
        //   }
        // }]
    }
};

type LanguageData = {
    // language: string;
    // bytes: number;
    [key: string]: number;
}

// function GetLablesAndValues(data: LanguageData[]) {
//     let lables: string[] = []
//     let values: number[] = []
//     for (let languageData of data) {
//         lables.push(languageData.language);
//         values.push(languageData.bytes)
//     }
//     return { lables, values };
// }


type PropType = {
    // data?: { [key: string]: number },
    width?: string,
    height?: string,
    legendPosition?: string,
    username?: string,
    url?: string,
    reposName?: string,
};

// interface PropType {
//   url: string,
//   reposName?: string
// };

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
    return fetch(`/userlangs`);
}

function LanguagesChart(props: PropType) {
    let [data, setData] = useState<LanguageData>({});



    async function getLanguagesStatistic() {
        // const queryUsername = props.username ? "?username=" + props.username : "";
        // const repositories = await fetch(`/lang${queryUsername}`);
        // let result: LanguageData[] = await repositories.json();
        // console.log(result, "LANG");
        // setData(result);
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
                    height={props.height || "99%"} /* height={"100%"} */ />
            </div>
        </div>
    );
}

export default LanguagesChart;