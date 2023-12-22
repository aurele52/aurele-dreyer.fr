import './Ladder.css';
import { connect, ConnectedProps } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import List from '../List/List';

interface LadderProps extends ReduxProps {}

export function Ladder({ dispatch }: LadderProps) {

  const { data: userId } = useQuery<number>({
    queryKey: ["userId"],
    queryFn: async ()=> {
      return axios.get("/api/id").then((response) => response.data);
    }
  });

  console.log(userId?.toString());
  const { data: users } = useQuery<
  {
    id: number,
    username: string,
    avatar_url: string,
    win_count: number,
    rank: number
  }[]
  >({
    queryKey: ["users"],
    queryFn: async ()=> {
      return axios.get("/api/ladder/list").then((response) => response.data);
    }
  });

  const { data: userRank } = useQuery<number>({
    queryKey: ["userRank"],
    queryFn: async ()=> {
      return axios.get("/api/ladder/rank/1").then((response) => response.data);
    }
  });

  const { data: user } = useQuery<
  {
    id: number;
    username: string;
    avatar_url: string;
    win_count: number;

  }
  >({
    queryKey: ["user"],
    queryFn: async ()=> {
      return axios.get("/api/profile/user/1").then((response) => response.data);
    }
  })



  return (
    <div className="Ladder">
      <List>
        {users?.map((user) => {
          const isSelfUser = user.id === userId;
          const divClass = isSelfUser ? 'SelfUser' : 'OtherUser'
          return (
            <div className={`User ${divClass}`} key={user.id}>
                <div className='Rank'><div>#{user?.rank ?? 0}</div></div>
                <div className='Avatar'><img src={user?.avatar_url} className="Frame" alt={user?.username.toLowerCase()} /></div>
                <div className='PlayerName'><div>{user.username}</div></div>
                <div className='Stat'><div>{user?.win_count ?? 0} win</div></div>
            </div>
          );
        })}
      </List>
      {userRank && userRank > 30 && (
        <div className='SelfRank'>
        <div className='User SelfUser' key={user?.id}>
                  <div className='Rank'><div>#{userRank ?? 0}</div></div>
                  <div className='Avatar'><img src={user?.avatar_url} className="Frame" alt={user?.username.toLowerCase()} /></div>
                  <div className='PlayerName'><div>{user?.username}</div></div>
                  <div className='Stat'><div>{user?.win_count ?? 0} win</div></div>
              </div>
        </div>
      )}
      
    </div>
  )
}

const mapDispatchToProps = null;

const connector = connect(mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedLadder = connector(Ladder);
export default ConnectedLadder;