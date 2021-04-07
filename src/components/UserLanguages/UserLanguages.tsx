import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'

const options = (lables: string[]) => ({
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 270
    }
  },
  labels: lables,
  dataLabels: {
    enabled: true
  },
  fill: {
    type: 'solid',
    // colors: ["red", "blue", "white", "green", "orange"],
    // gradient: {
    //   gradientToColors: [ "green", "blue","red",  "orange", "white"],
    // },
  },
  title: {
    text: 'Gradient Donut with custom Start-angle'
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
})

function GetLablesAndValues(data: { [key: string]: number }) {
  let lables: string[] = []
  let values: number[] = []
  for (let key in data) {
    lables.push(key);
    values.push(data[key])
  }
  return { lables, values };
}



type PropType = { 
  data: { [key: string]: number } 
};

function UserLanguages(props: PropType) {
  let [data, setData] = useState<{ [key: string]: number }>({})
  let [isDataChange, setIsDataChange] = useState(false) 
  
  async function getLanguagesStatistic(){
    const repositories = await fetch("/lang");
    let result: { [key: string]: number }  = await repositories.json();
    setData(result);
    setIsDataChange(true);
  }

  useEffect(() => {
    getLanguagesStatistic()
  }, [])
  
  let parsedData = GetLablesAndValues(data)
  return (
    <div className="userLanguages">
      <Chart options={options(parsedData.lables)} series={parsedData.values} type="pie" width={380} />
    </div>
  );
}

export default UserLanguages;