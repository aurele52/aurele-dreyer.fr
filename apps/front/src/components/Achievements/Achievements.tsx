import './Achievements.css';
import { connect, ConnectedProps } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import List from '../List/List';
import { FaSpinner } from 'react-icons/fa'; 

interface AchievementsProps extends ReduxProps {
  targetId?: number;
}

export function Achievements({ dispatch, targetId }: AchievementsProps) {

  const { data: userId, isLoading: userIdLoading, error: userIdError } = useQuery<number>({
    queryKey: ['userId'],
    queryFn: async () => {
      if (targetId !== undefined) {
        return targetId;
      }
      try {
        const response = await axios.get('/api/id');
        return response.data;
      } catch (error) {
        console.error('Error fetching userId:', error);
        throw error;
      }
    },
  });
  
  const { data: achievements, isLoading: achievementsLoading, error: achievementsError } = useQuery<{
    name: string,
    description: string
  }[]
  >({
    queryKey: ['achievements', userId],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/achievements/list/${userId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching achievements:', error);
        throw error;
      }
    },
    enabled: !!userId,
  });

console.log(achievements);

  if (achievementsLoading || userIdLoading) {
    return (
      <div className="Ladder">
        <FaSpinner className="loadingSpinner" />
      </div>
    )
  }

  if (achievementsError) {
    return <div>Error loading users: {achievementsError.message}</div>;
  }

  if (userIdError) {
    return <div>Error loading user: {userIdError.message}</div>;
  }

  return (
    <div className="Achievements">
      <List>
        {achievements?.map((achievement, index) => {
          return (
            <div className='Achievement' key={index}>
                <div>
                    <div className='Name'>{achievement.name}</div>
                    <div className='Description'>{achievement.description}</div>
                </div>
            </div>
        )})}
      </List>
    </div>
  );
}

const mapDispatchToProps = null;

const connector = connect(mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedLadder = connector(Achievements);
export default ConnectedLadder;
