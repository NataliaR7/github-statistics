import './LanguagesItem.css';
import { useEffect, useState } from 'react';
import PieChart from '../PieChart/PieChart';

interface PropsType {
  width?: string,
  height?: string,
  legendPosition?: string,
  username?: string,
  reposName?: string,
};

const LanguagesItem: React.FC<PropsType> = props => {
  const [data, setData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    getLanguagesStatistic(props).then((res) => {
      setData(res);
    });
  }, [])

  return (
    <div className="langStatistics">
      <PieChart data={data} width={props.width} height={props.height}
        noDataLabel="No languages" tooltipFormater={formatLanguageBytes} />
    </div>
  );
}

async function getLanguagesStatistic(data: PropsType) {
  if (data.reposName) {
    return await (await fetch(`/reposlangs`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ reposName: data.reposName })
    })).json();
  }
  const queryUsername = data.username ? "?username=" + data.username : "";
  return await (await fetch(`/userlangs${queryUsername}`)).json();
}

function formatLanguageBytes(value: number) {
  if (value > 1024 * 1024)
    return `${(value / (1024 * 1024)).toFixed(1)}MB`
  if (value > 1024)
    return `${(value / 1024).toFixed(1)}KB`
  return `${value}B`
}

export default LanguagesItem;