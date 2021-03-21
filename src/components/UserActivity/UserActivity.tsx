import Chart from 'react-apexcharts'



const dataLabels = {
  enabled: false, ///данные внизу столба
  // formatter: function (val: string) {
  //   return val + "%";
  // },
  offsetY: -20,
  style: {
    fontSize: '12px',
    colors: ["#304758"]
  }
}

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
    }
  }
}

const yaxis = {
  axisBorder: {
    show: false
  },
  axisTicks: {
    show: false,
  },
  labels: {
    show: false,
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

const options = (xaxisData: string[]) => { 
  return {
    chart: {
      stacked: true,
      events: {

      },
      zoom: {
        enabled: true
      }
    },
    plotOptions: plotOptions,
    fill: {
      opacity: 1,     //прозрачность столбов
    },    
    colors: ["#228B22", "#FFCC00"],//цвет столбиков(если несколько - то для каждого отдельно)    
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


function getSeries(dataName: string, values: number[]){
  return [{name: dataName, data: values},{name: dataName + "_1", data: values} ]
}

const series =[{
  name: ['Inflation', 'asdf', 'asdf'],
  data: [2.3, 3.1, 0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
}]

function GetLablesAndValues(activityStatistic: {[key: string] : number}){
  let xaxisData: string[] = []
  let values: number[] = []
  for (let key in activityStatistic){
    xaxisData.push(key);
    values.push(activityStatistic[key])
  }
  return {xaxisData, values};
}

function UserActivity(props: {data: {[key: string] : number}}) {
  let parsedData = GetLablesAndValues(props.data);
    return (
      <div className="userActivity">
        <Chart type="bar" height={350} options={options(parsedData.xaxisData)} series={getSeries("Contributions" , parsedData.values)}/>
      </div>
    );
  }
  
  export default UserActivity;