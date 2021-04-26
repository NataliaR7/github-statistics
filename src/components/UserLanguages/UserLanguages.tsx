import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './UserLanguages.css';
import { color, generalColor, graphColors } from '../../resources/colors'
import LanguagesChart from './LanguagesChart'


interface PropType {
  // url: string,
  // reposName?: string
};



function UserLanguages(props: PropType) {
  let [data, setData] = useState<{[key: string]: number}>({})

  return (
    <div className="userLanguages">
      <div className="head">
        <span>languages</span>
      </div>
      <LanguagesChart width="500" height="300"/>
    </div>
  );
}

export default UserLanguages;