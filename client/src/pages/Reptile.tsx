import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Reptile.css";

interface Schedule {
  id: number;
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

interface Husbandry {
  id: number;
  length: number;
  weight: number;
  temperature: number;
  humidity: number;
}

interface Feeding {
  id: number;
  foodItem: string;
}

export const Reptile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [husbandries, setHusbandry] = useState<Husbandry[]>([]);
  const [feedings, setFeedings] = useState<Feeding[]>([]);

  const [foodItem, setFoodItem] = useState("");
  const [length, setLength] = useState(1);
  const [weight, setWeight] = useState(1);
  const [temperature, setTemperature] = useState(1);
  const [humidity, setHumidity] = useState(1);

  const [type, setType] = useState("feed");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState<Record<string, boolean>>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const [species, setSpecies] = useState("ball_python");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("m");

  const capitalize = (str: string) =>
    str.split("_").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");

  async function fetchData() {
    await Promise.all([getAllFeedings(), getAllSchedules(), getAllHusbandries()]);
  }

  async function getAllFeedings() {
    const res = await fetch(`http://localhost:8000/feeding/${id}`, {
      credentials: "include",
    });
    const data = await res.json();
    setFeedings(data.feedings || []);
  }

  async function getAllSchedules() {
    const res = await fetch(`http://localhost:8000/schedule/${id}`, {
      credentials: "include",
    });
    const data = await res.json();
    setSchedules(data.schedules || []);
  }

  async function getAllHusbandries() {
    const res = await fetch(`http://localhost:8000/husbandry/${id}`, {
      credentials: "include",
    });
    const data = await res.json();
    setHusbandry(data.data || []);
  }

  async function checkNotLoggedIn() {
    const result = await fetch("http://localhost:8000/users/me", {
      credentials: "include",
    });
    if (result.status !== 200) navigate("/");
  }

  useEffect(() => {
    checkNotLoggedIn();
    fetchData();
  }, []);

  async function updateReptile() {
    if (!name.trim()) return alert("Please add a name.");
    const body = { species, name, sex };
    await fetch(`http://localhost:8000/reptile/${id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
  }

  async function createFeeding() {
    if (!foodItem.trim()) return alert("Add a food item.");
    const res = await fetch(`http://localhost:8000/feeding/${id}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ foodItem }),
    });
    const data = await res.json();
    if (data.feeding) setFeedings([...feedings, data.feeding]);
    setFoodItem("");
  }

  async function createHusbandry() {
    const body = { length, weight, temperature, humidity };
    const res = await fetch(`http://localhost:8000/husbandry/${id}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.husbandry) setHusbandry([...husbandries, data.husbandry]);
  }

  async function createSchedule() {
    const body = { type, description, ...days };
    const res = await fetch(`http://localhost:8000/schedule/${id}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.schedule) setSchedules([...schedules, data.schedule]);
  }

  return (
    <div className="reptile-container">
      <h2 className="page-title">Manage Reptile</h2>

      {/* Update Reptile */}
      <section className="card-section">
        <h3>Update Reptile Info</h3>
        <div className="form-row">
          <select value={species} onChange={(e) => setSpecies(e.target.value)}>
            <option value="ball_python">Ball Python</option>
            <option value="king_snake">King Snake</option>
            <option value="corn_snake">Corn Snake</option>
            <option value="redtail_boa">Redtail Boa</option>
          </select>
          <input
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <select value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value="m">Male</option>
            <option value="f">Female</option>
          </select>
          <button className="btn-primary" onClick={updateReptile}>
            Update
          </button>
        </div>
      </section>

      {/* Create new Feeding */}
      <section className="card-section">
        <h3>Add Feeding</h3>
        <div className="form-row">
          <input
            placeholder="Food Item"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
          />
          <button className="btn-primary" onClick={createFeeding}>
            Add Feeding
          </button>
        </div>
      </section>

      {/* Create Husbandry */}
      <section className="card-section">
        <h3>Add Husbandry Record</h3>
        <div className="form-grid">
          <label>
            Length (cm)
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(parseFloat(e.target.value))}
            />
          </label>
          <label>
            Weight (g)
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
            />
          </label>
          <label>
            Temp (°C)
            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
            />
          </label>
          <label>
            Humidity (%)
            <input
              type="number"
              value={humidity}
              onChange={(e) => setHumidity(parseFloat(e.target.value))}
            />
          </label>
          <button className="btn-primary" onClick={createHusbandry}>
            Add
          </button>
        </div>
      </section>

      {/* Create Schedule */}
      <section className="card-section">
        <h3>Add Schedule</h3>
        <div className="form-row">
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="feed">Feed</option>
            <option value="clean">Clean</option>
            <option value="record">Record</option>
          </select>
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="days-checkboxes">
          {Object.keys(days).map((day) => (
            <label key={day}>
              <input
                type="checkbox"
                checked={days[day]}
                onChange={(e) =>
                  setDays({ ...days, [day]: e.target.checked })
                }
              />
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </label>
          ))}
        </div>
        <button className="btn-primary" onClick={createSchedule}>
          Add Schedule
        </button>
      </section>

      {/* Data Lists */}
      <div className="data-columns">
        <div className="data-card">
          <h3>Feedings</h3>
          {feedings.map((f) => (
            <p key={f.id}>{f.foodItem}</p>
          ))}
        </div>

        <div className="data-card">
          <h3>Husbandry</h3>
          {husbandries.map((h) => (
            <div key={h.id} className="husbandry-entry">
              <p>Length: {h.length} cm</p>
              <p>Weight: {h.weight} g</p>
              <p>Temp: {h.temperature} °C</p>
              <p>Humidity: {h.humidity}%</p>
            </div>
          ))}
        </div>

        <div className="data-card">
          <h3>Schedules</h3>
          {schedules.map((s) => (
            <div key={s.id} className="schedule-entry">
              <h4>{capitalize(s.type)}</h4>
              <p>{s.description}</p>
              <p className="schedule-days">
                {Object.entries(s)
                  .filter(([day, val]) => val === true)
                  .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
                  .join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
