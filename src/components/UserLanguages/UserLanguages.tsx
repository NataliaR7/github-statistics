import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './UserLanguages.css';
import { color, generalColor, graphColors } from '../../resources/colors'
import LanguagesChart from './LanguagesChart'

type LanguageData = {
  [key: string]: number;
}


type PropType = {
  width?: string,
  height?: string,
  legendPosition?: string,
  username?: string,
  reposName?: string,
  isComparetion?: boolean
};

function formatLanguageBytes(value: number){
  if (value > 1024 * 1024)
      return `${(value / (1024 * 1024)).toFixed(1)}MB`
  if (value > 1024)
      return `${(value / 1024).toFixed(1)}KB`
  return `${value}B`
}



function UserLanguages(props: PropType) {
  let [data, setData] = useState<{[key: string]: number}>({})



  function getLanguagesPromise(data: PropType) {
      if (data.reposName) {
          return fetch(`/reposlangs`, {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json;charset=utf-8',
              },
              body: JSON.stringify({ reposName: props.reposName })
          })
      }
      const queryUsername = props.username ? "?username=" + props.username : "";
      // const repositories = await fetch(`/lang${queryUsername}`);
      return fetch(`/userlangs${queryUsername}`);
  }

  async function getLanguagesStatistic() {
      const languages = await (await getLanguagesPromise(props)).json()


      console.log(languages, "LANG");
      setData(languages)
  }

  useEffect(() => {
    getLanguagesStatistic();
  }, [])

  return (
    <div className="userLanguages">
      {!props.isComparetion && <div className="head">
        <span>languages</span>
      </div>}
      <div className="langStatistics">
      <LanguagesChart data={data}  width={props.width} height={props.height} tooltipFormater={formatLanguageBytes}/>
      </div>
    </div>
  );
}

export default UserLanguages;