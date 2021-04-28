import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './UserLanguages.css';
import { color, generalColor, graphColors } from '../../resources/colors'
import PieChart from '../Charts/PieChart'


interface PropType {
  width?: string,
  height?: string,
  legendPosition?: string,
  username?: string,
  reposName?: string,
};

function formatLanguageBytes(value: number){
  if (value > 1024 * 1024)
      return `${(value / (1024 * 1024)).toFixed(1)}MB`
  if (value > 1024)
      return `${(value / 1024).toFixed(1)}KB`
  return `${value}B`
}

  function getLanguagesPromise(data: PropType) {
      if (data.reposName) {
          return fetch(`/reposlangs`, {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json;charset=utf-8',
              },
              body: JSON.stringify({ reposName: data.reposName })
          })
      }
      const queryUsername = data.username ? "?username=" + data.username : "";
      return fetch(`/userlangs${queryUsername}`);
  }



function UserLanguages(props: PropType) {
  let [data, setData] = useState<{[key: string]: number}>({})


  async function getLanguagesStatistic() {
      const languages = await (await getLanguagesPromise(props)).json()
      setData(languages)
  }

  useEffect(() => {
    getLanguagesStatistic();
  }, [])

  return (
    <div className="userLanguages">
      <div className="langStatistics">
      <PieChart data={data}  width={props.width} height={props.height}
       noDataLabel="No languages" tooltipFormater={formatLanguageBytes}/>
      </div>
    </div>
  );
}

export default UserLanguages;