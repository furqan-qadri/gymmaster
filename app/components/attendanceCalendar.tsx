import React, { useState } from "react";

interface AttendanceData {
  date: string; // Date in format 'YYYY-MM-DD'
  attended: boolean;
}

// Example attendance data
const mockData: AttendanceData[] = [
  { date: "2024-05-01", attended: true },
  { date: "2024-05-02", attended: false },
  { date: "2024-04-01", attended: true },
  { date: "2024-04-02", attended: false },
  { date: "2024-04-04", attended: true },
  { date: "2024-04-28", attended: true },
  { date: "2024-04-16", attended: true },
  { date: "2024-05-02", attended: false },
  { date: "2024-05-03", attended: true },
  { date: "2024-05-04", attended: false },
  { date: "2024-05-05", attended: true },
];

const CustomMonthLayout: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (month: number, year: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = new Date(Date.UTC(year, month, index + 1));
      const formattedDate = day.toISOString().slice(0, 10);
      const attendance = mockData.find(
        (d) => d.date === formattedDate
      )?.attended;
      return {
        date: day,
        attended: attendance,
      };
    });
  };

  const handleMonthChange = (direction: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
  };

  const days = getDaysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  return (
    <div>
      <div className="flex text-xl font-bold my-4">Member Attendance</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <button onClick={() => handleMonthChange(-1)}>{"<"}</button>
        <span>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button onClick={() => handleMonthChange(1)}>{">"}</button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
        }}
      >
        {days.map((day, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              backgroundColor: day.attended ? "green" : "transparent",
            }}
          >
            {day.date.getUTCDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomMonthLayout;
