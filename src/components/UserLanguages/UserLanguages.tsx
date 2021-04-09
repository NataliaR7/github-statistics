import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './UserLanguages.css';
import {color, generalColor, graphColors} from '../../resources/colors'

const options = (lables: string[]) => {
  return {
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      }
    },
    //colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800', '#ffd230'],
    colors: graphColors,
    labels: lables,
    legend: {
      position: 'right',
      //horizontalAlign: 'center',
      //verticalAlign: 'center',
      //fontSize: '14px',
      itemMargin: {
        vertical: 5
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
  language: string;
  bytes: number;
}

function GetLablesAndValues(data: LanguageData[]) {
  let lables: string[] = []
  let values: number[] = []
  for (let languageData of data) {
    lables.push(languageData.language);
    values.push(languageData.bytes)
  }
  return { lables, values };
}


type PropType = {
  data: { [key: string]: number }
};

function UserLanguages(props: PropType) {
  let [data, setData] = useState<LanguageData[]>([])

  async function getLanguagesStatistic() {
    const repositories = await fetch("/lang")
    let result: LanguageData[] = await repositories.json()
    console.log(result, "LANG");
    setData(result)
  }

  useEffect(() => {
    getLanguagesStatistic();
  }, [])

  let parsedData = GetLablesAndValues(data)
  return (
    <div className="userLanguages">
      
        <Chart options={options(parsedData.lables)} series={parsedData.values} type="pie" width={"500"} />
      
    </div>
  );
}

export default UserLanguages;