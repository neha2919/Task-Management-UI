import React from "react";
import "../styles/MeetingSchedule.css";

const meetings = [
  { id: 1, time: "8:05 AM - 9:20 AM", title: "Meetings Neha Shaw", color: "yellow" },
  { id: 2, time: "10:05 AM - 12:20 PM", title: "Love Nanao", color: "blue" },
  { id: 3, time: "3:00 PM - 4:20 PM", title: "Eat with Miss Softie", color: "red" },
  { id: 4, time: "4:30 PM - 5:30 PM", title: "Scooty with Bacchu", color: "green" },
];

const MeetingSchedule = () => {
  return (
    <div className="meeting-schedule">
      <h2>Meetings Schedule</h2>
      {meetings.map((meeting) => (
        <div key={meeting.id} className={`meeting-card ${meeting.color}`}>
          <p>{meeting.time}</p>
          <h4>{meeting.title}</h4>
        </div>
      ))}
    </div>
  );
};

export default MeetingSchedule;
