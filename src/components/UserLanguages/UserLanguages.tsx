import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './UserLanguages.css';
import { color, generalColor, graphColors } from '../../resources/colors'
import { strict } from 'node:assert';
import {GetLablesAndValues} from "../../extentions/extentions"

const options = (lables: string[]) => {
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
      position: 'right',
      //horizontalAlign: 'center',
      //verticalAlign: 'center',
      fontSize: '17em',
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

// function GetLablesAndValues(data: {[key: string]: number}) {
//   let lables: string[] = []
//   let values: number[] = []
//   for (let lanuage in data) {
//     lables.push(lanuage);
//     values.push(data[lanuage])
//   }
//   return { lables, values };
// }


interface PropType {
  url: string,
  reposName?: string
};

function getLanguagesPromise(data: PropType){
  if (data.reposName){
    return fetch(`/${data.url}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({reposName: data.reposName})
    })
  }
  return fetch(`/${data.url}`);
}


function UserLanguages(props: PropType) {
  let [data, setData] = useState<{[key: string]: number}>({})

  async function getLanguagesStatistic() {
    const languages = await(await getLanguagesPromise(props)).json()


    console.log(languages, "LANG");
    setData(languages)
  }

  useEffect(() => {
    getLanguagesStatistic();
  }, [])

  let parsedData = GetLablesAndValues(data)
  return (
    <div className="userLanguages">
      <div className="head">
        <span>languages</span>
      </div>
      <div className="langStatistics">
        <Chart options={options(parsedData.lables)} series={parsedData.values} type="pie" width={"450"} />
      </div>
    </div>
  );
}

export default UserLanguages;