import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './UserLanguages.css';
import { color, generalColor, graphColors } from '../../resources/colors'
import LanguagesChart from './LanguagesChart'

// type PropType = {
//   data?: { [key: string]: number }
// }

interface PropType {
  // url: string,
  // reposName?: string
};

// function getLanguagesPromise(data: PropType){
//   if (data.reposName){
//     return fetch(`/${data.url}`, {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//       },
//       body: JSON.stringify({reposName: data.reposName})
//     })
//   }
//   return fetch(`/${data.url}`);
// }


function UserLanguages(props: PropType) {
  let [data, setData] = useState<{[key: string]: number}>({})

  // async function getLanguagesStatistic() {
  //   const languages = await(await getLanguagesPromise(props)).json()


  //   console.log(languages, "LANG");
  //   setData(languages)
  // }

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