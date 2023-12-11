import "./NewChan.css";
import Button from "./Button";

function NewChan() {
  return (
    <div className="NewChan">
      <div className="formNewChan">
        <div className="elFormNewChan">
          <label className="labelFormNewChan">Channel Name:</label>
          <input className="inputFormNewChan"></input>
        </div>
        <div className="elFormNewChan">
          <label className="labelFormNewChan">Topic:</label>
          <input className="inputFormNewChan"></input>
        </div>
        <div className="elFormNewChan checkboxFormNewChan">
          <label className="labelFormNewChan">Type:</label>
          <div className="listCheckboxFormNewChan">
            <div>
              <input type="checkbox" id="public" name="public" />
              <label htmlFor="public">PUBLIC</label>
            </div>
            <div>
              <input type="checkbox" id="private" name="private" />
              <label htmlFor="private">PRIVATE</label>
            </div>
            <div>
              <input type="checkbox" id="protected" name="protected" />
              <label htmlFor="protected">PASSWORD PROTECTED</label>
              <div className="passwordNewChan">
                <div className="passwordInputNewChan">
                  <label>CHOOSE PASSWORD:</label>
                  <input className="inputFormNewChan"></input>
                </div>
                <div className="passwordInputNewChan">
                  <label>ENTER SAME PASSWORD:</label>
                  <input className="inputFormNewChan"></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button content="create" color="purple" />
    </div>
  );
}

export default NewChan;
