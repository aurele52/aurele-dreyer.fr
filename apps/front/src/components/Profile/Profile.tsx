import Button from '../Button/Button';
import './Profile.css';
import { connect, ConnectedProps } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


interface ProfileProps extends ReduxProps {}

export function Profile({ dispatch }: ProfileProps) {
  const apiUrl = "/api/profile";

  const { data: games } = useQuery<
    {
      id: number;
      player1: string;
      player2: string;
      type: string;
      image: string;
      interlocutor: string;
    }[]
  >({
    queryKey: ["chats"],
    queryFn: async () => {
      return axios.get(apiUrl).then((response) => response.data);
    },
  });

  return (
    <div className="Profile">
            <div className="Header">
              
              <div className="Avatar">
                <img src={"https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/cat-face-square-format-bill-kesler.jpg"} className="Frame" alt="adesgran" />
              </div>
              
              <div className="Text">
                <div className="Name">ADESGRAN</div>
                <div className="Stats">
                  <div>
                    <div className="Rank">
                      <div className="Position">
                        <div>{"Rank #42"}</div>
                      </div>
                      <div className="Ratio">
                        <div>W 0 / L 16</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Achievements">
                  <div>Achievements lvl. 0</div>
                </div>
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
            
            <div className="Body">
              <div className="History">
                {/* TO FILL */}
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