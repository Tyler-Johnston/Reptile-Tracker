import { useParams, useNavigate } from "react-router-dom";
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
  const [name, setName] = useState("");
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
    setFeedings(feedingeData.feedings);
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
    setSchedules(scheduleData.schedules);
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
    setHusbandry(husbandryData.data);
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
    const feedingData = await result.json()
    const feeding = feedingData.feeding;
    if (feeding != undefined) {
      setFeedings([...feedings, feeding]);
    }
    else {
      alert("add a food item to the feedings")
    }
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
    });
    const schedulesData = await result.json()
    const schedule = schedulesData.schedule;
    if (schedule != undefined) {
      setSchedules([...schedules, schedule])
    }
    else {
      alert("add a description to the schedule")
    }
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
    });
    const husbandryData = await result.json()
    const husbandry = husbandryData.husbandry;
    setHusbandry([...husbandries, husbandry]);
  }

  async function updateReptile() {

    const body = {
      species,
      name,
      sex
    }

    if (name === "" || name === undefined) {
      alert("make sure the reptile has a name")
    }
    else {
      const result = await fetch(`http://localhost:8000/reptile/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body)
      })
    }
  }

  useEffect(() => {
    getAllSchedules();
    getAllHusbandries();
    getAllFeedings();
    checkNotLoggedIn();
  }, [])

  const navigate = useNavigate();

  async function checkNotLoggedIn() {
    const result = await fetch("http://localhost:8000/users/me", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });

    if (result.status !== 200) {
      navigate('/');
    }
  }


    return (
      <div>

        {/* Update Reptile */}
        <div style={{margin:'10px', borderRadius:'9px',background:"#e0e0e0",padding:'9px'}}>
            <select style={{ background: '#6c757d', color: 'white', margin:'4px', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', marginTop: '1rem' }} name="species" value={species} onChange={e => setSpecies(e.target.value)}>
              <option value="ball_python">Ball Python</option>
              <option value="king_snake">King Snake</option>
              <option value="corn_snake">Corn Snake</option>
              <option value="redtail_boa">Redtail Boa</option>
            </select>

            <input style={{background: 'white', color: 'black', margin:'4px', padding: '0.5rem 1rem', marginTop: '1rem' }} value={name} placeholder="name" onChange={e => setName(e.target.value)}></input>

            <select style={{ background: '#6c757d', color: 'white', margin:'4px', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', marginTop: '1rem' }} name="sex" value={sex} onChange={e => setSex(e.target.value)}>
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>
            <br></br>
            <button style={{ background: '#4CAF50', color: 'white', margin:'4px', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', marginTop: '1rem' }} type="button" onClick={updateReptile}>Update Reptile</button>
          </div>

        {/* Create new Feeding */}
        <div style={{margin:'10px', borderRadius:'9px',background:"#e0e0e0",padding:'9px'}}>
          <form>
            <label>
              Feeding:
              <input style={{margin:'0px 10px'}} placeholder="food item" value={foodItem} onChange={e => setFoodItem(e.target.value)} type="text" />
            </label>
            <br></br>
            <button style={{ background: '#4CAF50', color: 'white', margin:'4px', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', marginTop: '1rem' }} type="button" onClick={createFeeding}>Add feeding</button>
          </form>
        </div>
        {/* Create new Husbandry */}
        <div>
          <form style={{margin:'10px', borderRadius:'9px',background:"#e0e0e0",padding:'9px'}}>
            <label>
              Length:
              <input style={{margin:"0px 10px"}} value={length} onChange={e => setLength(parseFloat(e.target.value))} type="number" min="1" />
            </label>
            <br></br>
            <label>
              Weight:
              <input style={{margin:"0px 10px"}} value={weight} onChange={e => setWeight(parseFloat(e.target.value))} type="number" min="1" />
            </label>
            <br></br>
            <label>
              Temperature:
              <input style={{margin:"0px 10px"}} value={temperature} onChange={e => setTemperature(parseFloat(e.target.value))} type="number" min="1" />
            </label>
            <br></br>
            <label>
              Humidity:
              <input style={{margin:"0px 10px"}} value={humidity} onChange={e => setHumidity(parseFloat(e.target.value))} type="number" min="1" />
            </label>
            <br></br>

            <button style={{ background: '#4CAF50', color: 'white', margin:'4px', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', marginTop: '1rem' }} type="button" onClick={createHusbandry}>Add Husbandry</button>
          </form>
        </div>

        {/* Create new Schedule */}
        <div style={{margin:'10px', borderRadius:'9px',background:"#e0e0e0",padding:'9px'}}>
          <form>
            <label>
            Task: 
            <select style={{margin:'5px'}}name="type" value={type} onChange={e => setType(e.target.value)}>
              <option value="feed">Feed</option>
              <option value="clean">Clean</option>
              <option value="record">Record</option>
            </select>
            </label>
            <br></br>
            
            <label>
              Description:
              <input style={{margin:'4px'}}value={description} placeholder="feed the reptiles" onChange={e => setDescription((e.target.value))} type="text" />
            </label>
            <br></br>
            <br></br>
            <div style={{display:"flex",justifyContent:"space-around"}}>
            <label style={{background:"#c5c5c5", padding:"2px 8px", borderRadius:'4px'}}>
              Monday
              <input value={monday ? "true" : "false"} onChange={e => setMonday(Boolean((e.target.value)))} type="checkbox" />
            </label>

            <label style={{background:"#c5c5c5", padding:"2px 8px", borderRadius:'4px'}}>
              Tuesday
              <input value={tuesday ? "true" : "false"} onChange={e => setTuesday(Boolean((e.target.value)))} type="checkbox" />
            </label>

            <label style={{background:"#c5c5c5", padding:"2px 8px", borderRadius:'4px'}}>
              Wednesday
              <input value={wednesday ? "true" : "false"} onChange={e => setWednesday(Boolean((e.target.value)))} type="checkbox" />
            </label>

            <label style={{background:"#c5c5c5", padding:"2px 8px", borderRadius:'4px'}}>
              Thursday
              <input value={thursday ? "true" : "false"} onChange={e => setThursday(Boolean((e.target.value)))} type="checkbox" />
            </label>

            <label style={{background:"#c5c5c5", padding:"2px 8px", borderRadius:'4px'}}>
              Friday
              <input value={friday ? "true" : "false"} onChange={e => setFriday(Boolean((e.target.value)))} type="checkbox" />
            </label>

            <label style={{background:"#c5c5c5", padding:"2px 8px", borderRadius:'4px'}}>
              Saturday
              <input value={saturday ? "true" : "false"} onChange={e => setSaturday(Boolean((e.target.value)))} type="checkbox" />
            </label>

            <label style={{background:"#c5c5c5", padding:"2px 8px", borderRadius:'4px'}}>
              Sunday
              <input value={sunday ? "true" : "false"} onChange={e => setSunday(Boolean((e.target.value)))} type="checkbox" />
            </label>
            </div>
            <br></br>
            <button style={{ background: '#4CAF50', color: 'white', margin:'4px', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', marginTop: '1rem' }} type="button" onClick={createSchedule}>Add Schedule</button>
            
          </form>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
          {/* View all Feedings */}
          <div style={{ width: "450px", maxHeight: "600px", overflowY: "auto" }}>
            {feedings
              ? feedings.map((feeding: Feeding) => (
                  <div
                    key={feeding.id}
                    style={{
                      margin: "10px",
                      borderRadius: "9px",
                      background: "#e0e0e0",
                      padding: "9px"
                    }}
                  >
                    <h3>Feeding {feeding.id}</h3>
                    <p>Food Item: {feeding.foodItem}</p>
                  </div>
                ))
              : ""}
          </div>

          {/* View all Husbandries */}
          <div style={{ width: "450px", maxHeight: "600px", overflowY: "auto" }}>
            {husbandries
              ? husbandries.map((husbandry: Husbandry) => (
                  <div
                    key={husbandry.id}
                    style={{
                      margin: "10px",
                      borderRadius: "9px",
                      background: "#e0e0e0",
                      padding: "9px"
                    }}
                  >
                    <h3>Husbandry {husbandry.id}</h3>
                    <p>length: {husbandry.length}</p>
                    <p>weight: {husbandry.weight}</p>
                    <p>temp: {husbandry.temperature}</p>
                    <p>humidity: {husbandry.humidity}</p>
                  </div>
                ))
              : ""}
          </div>

          {/* View all Schedules */}
          <div style={{ width: "450px", maxHeight: "600px", overflowY: "auto" }}>
            {schedules
              ? schedules.map((schedule: Schedule) => (
                  <div
                    key={schedule.id}
                    style={{
                      margin: "10px",
                      borderRadius: "9px",
                      background: "#e0e0e0",
                      padding: "9px"
                    }}
                  >
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
                ))
              : ""}
          </div>
        </div>

      </div>
    )
  }