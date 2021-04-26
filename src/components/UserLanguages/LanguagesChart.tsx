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
        },
        colors: graphColors,
        labels: lables,
        legend: {
            offsetX: legendOffset,
            position: legendPosition || 'right',
            horizontalAlign: 'left',
            fontSize: '17em',
            itemMargin: {
                vertical: 5,
            },
            formatter: function (seriesName: any, opts: any) {
                return [" " + seriesName]
            },
        },
    }
};

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