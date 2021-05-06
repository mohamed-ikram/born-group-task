import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { FaPlusCircle, FaTimes } from "react-icons/fa";
import Button from "./Components/Button";

function App() {
  const [formState, setFormState] = useState([]);
  const fetchGoals = async () => {
    const response = await axios.get(
      "https://born-group-task-default-rtdb.firebaseio.com/goals.json"
    );
    const data = response.data;
    let goalsArray = [];
    for (let key in response.data) {
      const { title, description } = data[key];
      goalsArray.push({ id: key, title, description });
    }
    setFormState(goalsArray);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const onAddNewGoal = async () => {
    const response = await axios.post(
      "https://born-group-task-default-rtdb.firebaseio.com/goals.json",
      {
        title: "",
        description: "",
      }
    );
    if (response.data) {
      const updatedFormState = [
        ...formState,
        {
          title: "",
          description: "",
          id: response.data.name,
        },
      ];
      setFormState(updatedFormState);
    }
  };

  const onTitleChange = (e, id) => {
    const updatedFormState = [...formState];
    updatedFormState.forEach((element) => {
      if (element.id === id) {
        element.title = e.target.value;
      }
    });
    setFormState(updatedFormState);
  };

  const onDescriptionChange = (e, id) => {
    const updatedFormState = [...formState];
    updatedFormState.forEach((element) => {
      if (element.id === id) {
        element.description = e.target.value;
      }
    });
    setFormState(updatedFormState);
  };

  const onDeleteGoals = async (id) => {
    if (formState.length <= 1) {
      alert("You need minimum one goal");
    } else {
      const response = await axios.delete(
        `https://born-group-task-default-rtdb.firebaseio.com/goals/${id}.json`
      );
      console.log("response", response.data);
      if (response.data === null) {
        const removedFormState = formState.filter(
          (element) => element.id !== id
        );
        setFormState(removedFormState);
      }
    }
  };

  const onSaveGoal = async (item) => {
    console.log(item);
    const { title, description, id } = item;
    const response = await axios.patch(
      `https://born-group-task-default-rtdb.firebaseio.com/goals/${id}.json`,
      {
        title,
        description,
      }
    );
    console.log("response", response.data);
  };

  return (
    <div className="appContainer">
      <header className="">
        <h2>Goals</h2>
      </header>
      <div className="cardView">
        <form>
          {React.Children.toArray(
            formState.map((input) => {
              return (
                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <FaTimes onClick={() => onDeleteGoals(input.id)} size={24} />
                  <div style={{ width: "100%" }}>
                    <input
                      type="text"
                      placeholder="Type a goal title here"
                      value={input.title}
                      onChange={(e) => onTitleChange(e, input.id)}
                      className="inputContainer"
                    />
                    <br />
                    <textarea
                      placeholder="Type a goal description here"
                      value={input.description}
                      onChange={(e) => onDescriptionChange(e, input.id)}
                      className="inputContainer"
                      rows={3}
                    />
                    <br />
                    <div className="saveBtnContainer">
                      <Button
                        onClick={() => onSaveGoal(input)}
                        backgroundColor="mediumaquamarine"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div className="btnContainer">
            <Button onClick={() => onAddNewGoal()} backgroundColor="brown">
              <FaPlusCircle /> &nbsp; Add New Goal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
