import Button from '../Button/Button';
import './Profile.css';
import { connect, ConnectedProps } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import List from '../List/List';


interface ProfileProps extends ReduxProps {}

export function Profile({ dispatch }: ProfileProps) {
  const apiUrl = "/api/profile";

  const { data: profile } = useQuery<
  {
    id: number;
    username: string;
    avatar_url: string;
    win_count: number;
    loose_count: number;
    achievement_lvl: number;
    rank: number

  }
  >({
    queryKey: ["user"],
    queryFn: async ()=> {
      return axios.get("/api/profile/user/1").then((response) => response.data);
    }
  })

  const { data: historic } = useQuery<
  {
    id: number;
    player1: string;
    player2: string;
    player1_avatar: string;
    player2_avatar: string;
    score1: number;
    score2: number;

  }[]
  >({
    queryKey: ["historic"],
    queryFn: async ()=> {
      return axios.get("/api/profile/historic/1").then((response) => response.data);
    }
  })
  return (
    <div className="Profile">
            <div className="Header">
              
              <div className="Avatar">
                <img src={profile?.avatar_url} className="Frame" alt={profile?.username.toLowerCase()} />
              </div>
              
              <div className="Text">
                <div className="Name">{profile?.username ?? "No name"}</div>
                <div className="Stats">
                  <div>
                    <div className="Rank">
                      <div className="Position">
                        <div>Rank #{profile?.rank ?? 0}</div>
                      </div>
                      <div style={{paddingRight: "4px"}} className="Ratio">
                        <div>W {profile?.win_count ?? 0} / L {profile?.loose_count ?? 0}</div>
                      </div>
                      <Button
                          icon="Plus"
                          color="pink"
                          style={{display: "flex"}}
                        />
                    </div>
                  </div>
                </div>
                <div className="Achievements">
                  <div style={{paddingRight: "4px"}}>Achievements lvl. {profile?.achievement_lvl}</div>
                  <Button
                          icon="Plus"
                          color="pink"
                          style={{display: "flex"}}
                        />
                </div>
                <div className="Buttons">
              <Button
                  content="friends list"
                  color="purple"
                  style={{display: "flex"}}
                />
                <Button
                  content="blocked list"
                  color="purple"
                  style={{display: "flex"}}
                />
              </div>
            </div>
              </div>
              
              
            
            <div className="Body">
              <div className="Historic">
                <List>
                  {historic?.map((match) => {
                    return (
                      <div className='Match'>
                        <div className={`Player ${match.score1 > match.score2 ? 'WinPlayer' : 'LoosePlayer'}`}>
                          <div>
                            <div className='Outline'>
                              <div className='Avatar'>
                                <img src={match?.player1_avatar} className="Picture" alt={match?.player1.toLowerCase()} />
                              </div>
                            </div>
                            <div className='Username'>
                              {match?.player1}
                            </div>
                          </div>
                        </div>
                        <div className='Score'>
                          <div>
                            {match?.score1 + " - " + match?.score2}
                          </div>
                          
                        </div>
                        <div className={`Player ${match.score1 < match.score2 ? 'WinPlayer' : 'LoosePlayer'}`}>
                          <div>
                            <div className='Outline'>
                              <div className='Avatar'>
                                <img src={match?.player2_avatar} className="Picture" alt={match?.player2.toLowerCase()} />
                              </div>
                              <div className='Crown'><div></div></div>
                            </div>
                            <div className='Username'>
                              {match?.player2}
                            </div>
                          </div>
                        </div>
                      </div>
                  )})}
                </List>
              </div>
            </div>
            
            <div className="Footer">
              <Button
                content="delete account"
                color="red"
                style={{display: "flex"}}
              />
            </div>
    </div>
  )
}
const mapDispatchToProps = null;

const connector = connect(mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedProfile = connector(Profile);
export default ConnectedProfile;