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

export const Reptile = () => {
  const { id } = useParams();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [husbandries, setHusbandry] = useState<Husbandry[]>([]);
  
  async function getAllFeedings() {



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

  useEffect(() => {
    getAllSchedules();
  }, [])

  useEffect(() => {
    getAllHusbandries();
  }, [])


    return (
      <div>
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
      </div>
    )
  }