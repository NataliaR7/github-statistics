import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './UserLanguages.css';
import { color, generalColor, graphColors } from '../../resources/colors'
import LanguagesChart from './LanguagesChart'

type PropType = {
  data?: { [key: string]: number }
};

function UserLanguages(props: PropType) {

  return (
    <div className="userLanguages">
      <div className="head">
        <span>languages</span>
      </div>
      <LanguagesChart />
    </div>
  );
}

export default UserLanguages;