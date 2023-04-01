// 3. When selecting a reptile the app should navigate to the Reptile page


import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

interface Reptile {
  id: number,
  species: string,
  name: string,
  sex: string,
}

interface Schedule {
  id: number,
  type: string,
  description: string,
  monday: boolean,
  tuesday: boolean,
  wednesday: boolean,
  thursday: boolean,
  friday: boolean,
  saturday: boolean,
  sunday: boolean,
}

export const Dashboard = () => {
  const [species, setSpecies] = useState("ball_python");
  const [name, setName] = useState("unnamed reptile");
  const [sex, setSex] = useState("m");
  const [reptiles, setReptiles] = useState<Reptile[]>([]);
  const [tasks, setTasks] = useState<string[]>([]);
  const navigate = useNavigate();

  const body = {
    species,
    name,
    sex
  }

  async function createReptile() {
    const result = await fetch("http://localhost:8000/reptile", {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(body)
    });
  }

  async function getAllReptiles() {
    const result = await fetch("http://localhost:8000/reptile", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
    const data = await result.json();
    setReptiles(data.reptiles);
  }

  async function logout() {
    const result = await fetch("http://localhost:8000/logout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
    navigate("..")
  }

  async function deleteReptile(id: number) {
    const result = await fetch(`http://localhost:8000/reptile/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
  }

  async function getTodaySchedule() {
    const result = await fetch("http://localhost:8000/schedule", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const scheduleData = await result.json();

    setTasks([]); // clear the tasks before appending more to it
    scheduleData.schedules.forEach((schedule: Schedule) => {
      if (schedule[today as keyof Schedule]) {
        setTasks(tasks => [...tasks, schedule.description])
      }
    });

  }

  async function getReptilePage(id: number) {
    navigate(`../reptile/${id}`)
  }

  useEffect(() => {
    if (reptiles) {
      getAllReptiles();
    }
  }, []);

  useEffect(() => {
    if (tasks) {
      getTodaySchedule();
    }
  }, []);

  return (
    <div>
      {reptiles ? 
      (
        <div>
          <div>
            {/* Create a Reptile */}
            <select name="species" value={species} onChange={e => setSpecies(e.target.value)}>
              <option value="ball_python">Ball Python</option>
              <option value="king_snake">King Snake</option>
              <option value="corn_snake">Corn Snake</option>
              <option value="redtail_boa">Redtail Boa</option>
            </select>

            <input value={name} placeholder="name" onChange={e => setName(e.target.value)}></input>

            <select name="sex" value={sex} onChange={e => setSex(e.target.value)}>
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>

            <button type="button" onClick={createReptile}>Create Reptile</button>
          </div>

          {/* View All Reptiles */}
          <div>
            {reptiles.map((reptile: Reptile) => (
              <div key={reptile.id}>
                <h3>{reptile.name}</h3>
                <p>Species: {reptile.species}</p>
                <p>Sex: {reptile.sex}</p>
                <button type="button" onClick={() => getReptilePage(reptile.id)}>View Reptile Info</button>
                <button type="button" onClick={() => deleteReptile(reptile.id)}>Delete Reptile</button>
              </div>
            ))}
          </div>

          {/* View all tasks for today */}
          <div>
            <h3>Tasks for today</h3>
            {tasks.map((task, index) => (
            <p key={index}>{task}</p>
            ))}
          </div>

          {/* Log out */}
          <button type="button" onClick={logout}>Log out</button>
        </div>
      ) : 
      (
        <div>
          <p>you aren't logged in</p>  
          <button type="button" onClick={() => navigate("/login")}>Login</button>
          <button type="button" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      )}
    </div>
  )
}