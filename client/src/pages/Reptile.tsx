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

export const Reptile = () => {
  const { id } = useParams();
  const [schedules, setSchedules] = useState<Schedule[]>([])
  


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
        setSchedules(schedules => [...schedules, schedule])
    });
  }

  async function getAllHusbandries() {

  }

  useEffect(() => {
    getAllSchedules();

  }, [schedules])

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
      </div>
    )
  }