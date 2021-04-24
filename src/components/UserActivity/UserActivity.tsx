import { type } from 'node:os';
import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts'
import { color, generalColor, graphColors, getRandomColor } from '../../resources/colors'
import './UserActivity.css'
import ActivityChart from './ActivityChart'


function UserActivity(props: { data?: { [key: string]: number } }) {
  let [data, setData] = useState<{ [key: string]: any }>({})
  let [isMainChart, setIsMainChart] = useState<boolean>(true)

 
  return (
    <div className="userActivity">
      <div className="head">
        <span>contributions</span>
      </div>
      <ActivityChart />
    </div>
  );
}

export default UserActivity;