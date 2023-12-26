import "./AddFriends.css";
import api from "../../../../axios"
import List from "../../../../shared/ui-components/List/List";
import { Button } from "../../../../shared/ui-components/Button/Button";
import { ReducedUser } from "../../../../shared/ui-components/User/User";
import { useEffect, useState } from "react";

export function AddFriends() {
  const [placeholderValue, setPlaceholderValue] = useState<string>("");
  const [users, setUsers] = useState<number[] | null>(null);

  useEffect(() => {
    const storedPlaceholderValue = localStorage.getItem("placeholderValue");
    const storedUsers = localStorage.getItem("users");

    if (storedPlaceholderValue) {
      setPlaceholderValue(storedPlaceholderValue);
    }

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("placeholderValue", placeholderValue);
    localStorage.setItem("users", JSON.stringify(users));
  }, [placeholderValue, users]);

  const handleButtonClick = async () => {
    try {
      const response = await api.get<number[]>(
        "/friendslist/potentialFriends",
        {
          params: {
            placeholderValue: placeholderValue,
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  return (
    <div className="AddFriendsModule">
      <div className="Header">
        <div className="SearchBar">
          <div className="TypeBar">
            <input
              className="Placeholder"
              value={placeholderValue}
              onChange={(e) => setPlaceholderValue(e.target.value)}
            />
            <Button icon="Lens" color="purple" onClick={handleButtonClick} />
          </div>
        </div>
      </div>
      <div className="Body">
        <List dark={false}>
          {users?.map((id, key) => {
            return (
              <ReducedUser userId={id} key={key}>
                <Button icon="Heart" color="pink" />
              </ReducedUser>
            );
          })}
        </List>
      </div>
    </div>
  );
}
