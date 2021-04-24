import './UserRecentActivity.css'
import RecentActivityPanel from './RecentActivityPanel'

function UserRecentActivity(props: {type: string, repoName?: string}) {

  return (
    <div className="userRecentActivity">
      <div className="head">
        <span>recent activity</span>
      </div>
      <RecentActivityPanel type={props.type} repoName={props.repoName} />
    </div>
  );
}

export default UserRecentActivity;