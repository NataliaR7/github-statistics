import { type } from 'node:os';
import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts'
import {color, generalColor, graphColors, getRandomColor} from '../../resources/colors'



const dataLabels = {
  enabled: true, ///данные внизу столба
  // formatter: function (val: string) {
  //   return val + "%";
  // },
  textAnchor: 'middle',
  style: {
    fontSize: '12px',
    // colors: ["#304758"]
  }
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
      position: 'bottom', // top, center, bottom
    },
  }
}

const xaxis = (xaxisData: string[]) => {return {
    categories: xaxisData, 
    position: 'bottom',
    labels: {
      show: true,
      style: {/// параметры верхних лейблов
        colors: "black",
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 400,
        cssClass: 'apexcharts-xaxis-label',
      },
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        }
      }
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
    // formatter: function (val: string) {
    //   return val + "%";
    // }
  },
  
}

const title = {
  text: 'Monthly Inflation in Argentina, 2002',
  floating: true,
  offsetY: 330,
  align: 'center',
  style: {
    color: '#444'
  }
}

function GetLablesAndSeries(activityStatistic: {[key: string] : any}){
  let xaxisData = Object.keys(activityStatistic)

  let values: number[] = []
  for (let key in activityStatistic){
    let allActivityPerMonth = 0
    for (let partKey in activityStatistic[key])
    {
      allActivityPerMonth += activityStatistic[key][partKey]
    }
    values.push(allActivityPerMonth)
  }
  return {xaxisData, series: [{name: "Activity", data: values}]};
}

function getTempSeries(data: {[key: string] : number}){
  let values = []
  let xaxisData = []
  for (let key in data){
    xaxisData.push(key)
    values.push(data[key])
  }
  return {xaxisData: xaxisData, series: [{name: "asd", data: values}]}
}

function getСolumnColor(value: number){
  switch(true){
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

type series = {
  name: string,
  data: number[]
}

type mainData = {
  xaxisData: string[],
  series: series[]
}


function UserActivity(props: {data: {[key: string] : number}}) {
  let [data, setData] = useState<{ [key: string]: any }>({})
  let [tempSeries, setTempSeries] = useState<mainData>()
  let [mainData, setMainData] = useState<mainData>()
  let [isMainChart, setIsMainChart] = useState<boolean>(true)

  const options = (xaxisData: string[]) => { 
    return {
      chart: {
        type: 'bar',
        // height: 350,
        // stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        },
  
        events: {
          dataPointSelection: function (e: any, chart: any, opts: any) {
            let dataPoints = chart.w.globals.selectedDataPoints
            // console.log(dataPoints)
            for (let point of dataPoints){
              if (point && point.length !== 0 && isMainChart){
                console.log(point)
                let month = Object.keys(data)[point[0]]
                let ser = getTempSeries(data[month])
                setIsMainChart(false)
                setTempSeries(ser)
              }
            }
          }
        }
      },
      responsive: responsive,
      plotOptions: plotOptions,
      fill: {
        opacity: 1,     //прозрачность столбов
      },    
      colors:[function(data: {value: number, seriesIndex: number, w: any}) {
        console.log(data.value)
        return getСolumnColor(data.value);
      }],//цвет столбиков(если несколько - то для каждого отдельно)    
      dataLabels: dataLabels,    
      xaxis: xaxis(xaxisData),
      yaxis: yaxis,
      legend: {
        position: 'right',
        offsetY: 40
      },
      // title: title
    }
  }

  async function getActivityStatistic(){
    const result = await (await fetch("/activity")).json()
    console.log(result, "LANG");
    setData(result)
    setMainData(GetLablesAndSeries(result))

  }

  useEffect(() => {
    getActivityStatistic();
  }, [])

  function backToMainChart(){
    if (!isMainChart)
    {
      setIsMainChart(true)
      // console.log("back only if need")
    }
  }
  const chartHeight = "90%"
  // let parsedData = GetLablesAndSeries(data);
  return (
    <div className="userActivity">
      {<button onClick={backToMainChart}>back</button>}
      {isMainChart 
      ? mainData && <Chart type="bar" height={chartHeight} options={options(mainData.xaxisData)} series={mainData.series}/>
      : tempSeries && <Chart type="bar" height={chartHeight} options={options(tempSeries.xaxisData)} series={tempSeries.series}/>
    }
    </div>
  );
}
  
export default UserActivity;