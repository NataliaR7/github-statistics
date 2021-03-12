import Chart from 'react-apexcharts'

const options = {
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 270
    }
  },
  labels: ["1", "2", "3", "4", "5", "6", "7"],
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
}


function UserLanguages() {
    return (
      <div className="userLanguages">
        <Chart options={options} series={[44, 55, 41, 17, 15, 20, 43]} type="pie" width={380} />
      </div>
    );
  }
  
  export default UserLanguages;