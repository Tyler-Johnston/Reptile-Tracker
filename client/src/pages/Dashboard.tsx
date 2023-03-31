// 1. I should see all of the schedules for my user for the day of the week it is (for example, if it is Monday then I should only see the schedules that have me doing something on Monday.)
// 2. I should see a list of all my reptiles
// 3. When selecting a reptile the app should navigate to the Reptile page
// 5. I should be able to delete a reptile.
// 6. I should be able to log out of my account


import { useContext, useState } from "react";

export const Dashboard = () => {
  const [species, setSpecies] = useState("ball_python");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("m");

  async function createReptile() {
    
    const body = {
      species,
      name,
      sex
    }

    console.log("species: " + body.species)
    console.log("name: " + body.name)
    console.log("sex: " + body.sex)

    const result = await fetch("http://localhost:8000/reptile", {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(body)
    });
  }

  return (
    <div>
      <p>dashboard</p>
    
      {/* Create Reptile Logic */}
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


      {/* View All Reptiles */}
      

      
    </div>
  )
}