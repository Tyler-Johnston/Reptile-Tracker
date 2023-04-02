import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

interface Husbandry {
  id: number,
  length: number,
  weight: number,
  temperature: number,
  humidity: number
}

interface Feeding {
  id: number,
  foodItem: string
}

export const Reptile = () => {
  const { id } = useParams();

  // List Data for Schedules, Husbandries, and Feedings
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [husbandries, setHusbandry] = useState<Husbandry[]>([]);
  const [feedings, setFeedings] = useState<Feeding[]>([]);

  // Feeding Data
  const [foodItem, setFoodItem] = useState("");

  // Husbandry Data
  const [length, setLength] = useState(1);
  const [weight, setWeight] = useState(1);
  const [temperature, setTemperature] = useState(1);
  const [humidity, setHumidity] = useState(1);

  // Schedule Data
  const [type, setType] = useState("feed");
  const [description, setDescription] = useState("");
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);

  // Update Reptile Data
  const [species, setSpecies] = useState("ball_python");
  const [name, setName] = useState("unnamed reptile");
  const [sex, setSex] = useState("m");

  
  async function getAllFeedings() {
    const result = await fetch(`http://localhost:8000/feeding/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
    const feedingeData = await result.json();

    setFeedings([]); // clear the tasks before appending more to it
    feedingeData.feedings.forEach((feeding: Feeding) => {
        setFeedings(feedings => [...feedings, feeding]);
    });
  }

  async function getAllSchedules() {
    const result = await fetch(`http://localhost:8000/schedule/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
    const scheduleData = await result.json();

    setSchedules([]); // clear the tasks before appending more to it
    scheduleData.schedules.forEach((schedule: Schedule) => {
        setSchedules(schedules => [...schedules, schedule]);
    });
  }

  async function getAllHusbandries() {
    const result = await fetch(`http://localhost:8000/husbandry/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
    const husbandryData = await result.json();
    
    setHusbandry([]); // clear the tasks before appending more to it
    husbandryData.data.forEach((husbandries: Husbandry) => {
        setHusbandry(husbandry => [...husbandry, husbandries]);
    });
  }

  async function createFeeding() {

    const body = {
      foodItem
    }

    const result = await fetch(`http://localhost:8000/feeding/${id}`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(body)
    });
  }

  async function createHusbandry() {

    const body = {
      length,
      weight,
      temperature,
      humidity
    }

    const result = await fetch(`http://localhost:8000/husbandry/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body)
    })
  }

  async function createSchedule() {

    const body = {
      type,
      description,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    }

    const result = await fetch(`http://localhost:8000/schedule/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body)
    })
  }

  async function updateReptile() {

    const body = {
      species,
      name,
      sex
    }
    const result = await fetch(`http://localhost:8000/reptile/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body)
    })
  }

  useEffect(() => {
    getAllSchedules();
    getAllFeedings();
    getAllHusbandries();
  }, [])

    return (
      <div>

        {/* Update Reptile */}
        <div>
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

            <button type="button" onClick={updateReptile}>Update Reptile</button>
          </div>

        {/* Create new Feeding */}
        <div>
          <form>
            <label>
              Feeding
              <input value={foodItem} onChange={e => setFoodItem(e.target.value)} type="text" />
            </label>
            <button type="button" onClick={createFeeding}>Add feeding</button>
          </form>
        </div>

        {/* Create new Husbandry */}
        <div>
          <form>
            <label>
              Length
              <input value={length} onChange={e => setLength(parseFloat(e.target.value))} type="number" min="1" />
            </label>

            <label>
              Weight
              <input value={weight} onChange={e => setWeight(parseFloat(e.target.value))} type="number" min="1" />
            </label>

            <label>
              Temperature
              <input value={temperature} onChange={e => setTemperature(parseFloat(e.target.value))} type="number" min="1" />
            </label>

            <label>
              Humidity
              <input value={humidity} onChange={e => setHumidity(parseFloat(e.target.value))} type="number" min="1" />
            </label>


            <button type="button" onClick={createHusbandry}>Add Husbandry</button>
          </form>
        </div>

        {/* Create new Schedule */}
        <div>
          <form>
            <select name="type" value={type} onChange={e => setType(e.target.value)}>
              <option value="feed">Feed</option>
              <option value="clean">Clean</option>
              <option value="record">Record</option>
            </select>

            <label>
              Description
              <input value={description} onChange={e => setDescription((e.target.value))} type="text" />
            </label>

            <label>
              Monday
              <input value={monday ? "true" : "false"} onChange={e => setMonday(Boolean((e.target.value)))} type="checkbox" />
            </label>

            <label>
              Tuesday
              <input value={tuesday ? "true" : "false"} onChange={e => setTuesday(Boolean((e.target.value)))} type="checkbox" />
            </label>

            <label>
              Wednesday
              <input value={wednesday ? "true" : "false"} onChange={e => setWednesday(Boolean((e.target.value)))} type="checkbox" />
            </label>

            <label>
              Thursday
              <input value={thursday ? "true" : "false"} onChange={e => setThursday(Boolean((e.target.value)))} type="checkbox" />
            </label>

            <label>
              Friday
              <input value={friday ? "true" : "false"} onChange={e => setFriday(Boolean((e.target.value)))} type="checkbox" />
            </label>

            <label>
              Saturday
              <input value={saturday ? "true" : "false"} onChange={e => setSaturday(Boolean((e.target.value)))} type="checkbox" />
            </label>

            <label>
              Sunday
              <input value={sunday ? "true" : "false"} onChange={e => setSunday(Boolean((e.target.value)))} type="checkbox" />
            </label>
            <button type="button" onClick={createSchedule}>Add Schedule</button>
          </form>
        </div>

        {/* View all Schedules */}
        {schedules ? schedules.map((schedule : Schedule) => (
          <div key={schedule.id}>
            <h3>Schedule {schedule.id}</h3>
            <p>{schedule.type}</p>
            <p>{schedule.description}</p>
            <p>{schedule.monday ? "monday" : ""}</p>
            <p>{schedule.tuesday ? "tuesday" : ""}</p>
            <p>{schedule.wednesday ? "wednesday" : ""}</p>
            <p>{schedule.thursday ? "thursday" : ""}</p>
            <p>{schedule.friday ? "friday" : ""}</p>
            <p>{schedule.saturday ? "saturday" : ""}</p>
            <p>{schedule.sunday ? "sunday" : ""}</p>
          </div>
        )) : "no schedules set for this reptile"}

          {/* View all Husbandries */}
          {husbandries ? husbandries.map((husbandry : Husbandry) => (
          <div key={husbandry.id}>
            <h3>Husbandry {husbandry.id}</h3>
            <p>length: {husbandry.length}</p>
            <p>weight: {husbandry.weight}</p>
            <p>temp: {husbandry.temperature}</p>
            <p>humidity: {husbandry.humidity}</p>
          </div>
        )) : "no husbandries set for this reptile"}

          {/* View all Feedings */}
          {feedings ? feedings.map((feeding : Feeding) => (
          <div key={feeding.id}>
            <h3>Feeding {feeding.id}</h3>
            <p>Food Item: {feeding.foodItem}</p>
          </div>
        )) : "no feedings set for this reptile"}
      </div>
    )
  }