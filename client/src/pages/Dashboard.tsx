import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

interface Reptile {
  id: number;
  species: string;
  name: string;
  sex: string;
}

interface Schedule {
  id: number;
  reptileId: number;
  type: string;
  description: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export const Dashboard: React.FC = () => {
  const [species, setSpecies] = useState("ball_python");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("m");
  const [reptiles, setReptiles] = useState<Reptile[]>([]);
  const [tasks, setTasks] = useState<string[]>([]);
  const navigate = useNavigate();

  async function createReptile(): Promise<void> {
    if (!name.trim()) {
      alert("Please enter a name for your reptile.");
      return;
    }
    const body = { species, name, sex };

    const result = await fetch("http://localhost:8000/reptile", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const reptileData = await result.json();
    const reptile = reptileData.reptile;
    if (reptile) setReptiles((prev) => [...prev, reptile]);
  }

  async function getAllReptiles(): Promise<void> {
    const result = await fetch("http://localhost:8000/reptile", {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await result.json();
    setReptiles(data.reptiles || []);
  }

  async function deleteReptile(id: number): Promise<void> {
    await fetch(`http://localhost:8000/reptile/${id}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    setReptiles((prev) => prev.filter((r) => r.id !== id));
  }

  async function getTodaySchedule(): Promise<void> {
    const result = await fetch("http://localhost:8000/schedule", {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    }).toLowerCase();

    const scheduleData = await result.json();
    setTasks([]);

    scheduleData.schedules.forEach((schedule: Schedule) => {
      if (schedule[today as keyof Schedule]) {
        const reptile = reptiles.find((r) => r.id === schedule.reptileId);
        if (reptile) {
          setTasks((prev) => [...prev, `${reptile.name}: ${schedule.description}`]);
        }
      }
    });
  }

  async function checkNotLoggedIn(): Promise<void> {
    const result = await fetch("http://localhost:8000/users/me", {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (result.status !== 200) navigate("/");
  }

  function formatSpeciesName(species: string): string {
    return species
      .split("_")
      .map((word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  }


  useEffect(() => {
    getAllReptiles();
    checkNotLoggedIn();
  }, []);

  useEffect(() => {
    if (reptiles.length > 0) getTodaySchedule();
  }, [reptiles]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Reptiles</h2>
      </div>

      <div className="dashboard-form">
        <h3>Add a New Reptile</h3>
        <div className="form-row">
          <select
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="input-select"
          >
            <option value="ball_python">Ball Python</option>
            <option value="king_snake">King Snake</option>
            <option value="corn_snake">Corn Snake</option>
            <option value="redtail_boa">Redtail Boa</option>
          </select>

          <input
            className="input-text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="input-select"
          >
            <option value="m">Male</option>
            <option value="f">Female</option>
          </select>

          <button className="btn-primary" type="button" onClick={createReptile}>
            Add Reptile
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="reptile-list">
          {reptiles.map((reptile) => (
            <div key={reptile.id} className="reptile-card">
              <h4>{reptile.name}</h4>
              <p>
                <strong>Species:</strong> {formatSpeciesName(reptile.species)}
              </p>
              <p>
                <strong>Sex:</strong> {reptile.sex === "m" ? "Male" : "Female"}
              </p>
              <div className="reptile-buttons">
                <button
                  className="btn-info"
                  onClick={() => navigate(`/reptile/${reptile.id}`)}
                >
                  View Info
                </button>
                <button
                  className="btn-danger"
                  onClick={() => deleteReptile(reptile.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="task-list">
          <h3>Today's Tasks</h3>
          {tasks.length === 0 ? (
            <p className="no-tasks">No tasks for today.</p>
          ) : (
            tasks.map((task, index) => <p key={index}>{task}</p>)
          )}
        </div>
      </div>
    </div>
  );
};
