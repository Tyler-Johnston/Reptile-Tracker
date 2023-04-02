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
    const reptileData = await result.json()
    const reptile = reptileData.reptile;
    setReptiles([...reptiles, reptile]);
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
    setReptiles(prevReptiles => prevReptiles.filter(reptile => reptile.id !== id));
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

  useEffect(() => {
    getAllReptiles();
    getTodaySchedule();
  }, []);


  return (
    <div>
      {reptiles ? 
      (
        <div>
          <div>
            {/* Create a Reptile */}
            <form>
              <select style={{ background: '#6c757d', color: 'white', margin:'4px', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', marginTop: '1rem' }} name="species" value={species} onChange={e => setSpecies(e.target.value)}>
                <option value="ball_python">Ball Python</option>
                <option value="king_snake">King Snake</option>
                <option value="corn_snake">Corn Snake</option>
                <option value="redtail_boa">Redtail Boa</option>
              </select>

              <input style={{ background: 'white', color: 'black', margin:'4px', padding: '0.5rem 1rem', marginTop: '1rem' }} value={name} placeholder="name" onChange={e => setName(e.target.value)}></input>

              <select style={{ background: '#6c757d', color: 'white', margin:'4px', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', marginTop: '1rem' }} name="sex" value={sex} onChange={e => setSex(e.target.value)}>
                <option value="m">Male</option>
                <option value="f">Female</option>
              </select>

              <button style={{ background: '#4CAF50', color: 'white', margin:'4px', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', marginTop: '1rem' }} type="button" onClick={createReptile}>Create Reptile</button>
            </form>
          </div>

          {/* View All Reptiles */}
          <div>
            {reptiles.map((reptile: Reptile) => (
              <div style={{background:'#e0e0e0',padding:'0px 5px', margin:'4px', borderRadius:'9px'}}key={reptile.id}>
                <h3>{reptile.name}</h3>
                <p style={{display:"inline", margin:"0px 4px"}}>Species: {reptile.species}</p>
                <p style={{display:"inline", margin:"0px 4px"}}>Sex: {reptile.sex}</p>
                <button style={{ background: '#008CBA', color: 'white', margin:'4px', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', marginTop: '1rem' }} type="button"  onClick={() => navigate(`../reptile/${reptile.id}`)}>View Reptile Info</button>
                <button style={{ background: 'maroon', color: 'white', margin:'4px', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', marginTop: '1rem' }} type="button" onClick={() => deleteReptile(reptile.id)}>Delete Reptile</button>
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
          <button style={{ background: 'maroon', color: 'white', margin:'4px', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', marginTop: '1rem' }} type="button" onClick={logout}>Log out</button>
        </div>
      ) : 
      (
        <div>
          <p>you aren't logged in</p>  
          <button type="button" onClick={() => navigate("/login")}>Login</button>
          <button  type="button" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      )}
    </div>
  )
}