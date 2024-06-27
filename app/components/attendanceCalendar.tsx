import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

interface AttendanceData {
  attendance_id: number;
  member_id: number;
  attendance_date: string;
  attended: number;
  time: string;
}

const CustomMonthLayout: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const params = useParams();

  const fetchAttendanceData = async (memberId: string | string[]) => {
    try {
      const response = await axios.get(
        `http://localhost:8090/api/v1/gym/attendance/member/${memberId}`
      );
      setAttendanceData(response.data.attendances);
    } catch (error) {
      console.error("Failed to fetch attendance data:", error);
    }
  };

  useEffect(() => {
    const memberId = params.id;
    if (memberId) {
      fetchAttendanceData(memberId);
    }
  }, [params.id]);

  const getDaysInMonth = (month: number, year: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = new Date(Date.UTC(year, month, index + 1));
      const formattedDate = day.toISOString().slice(0, 10);
      const attendance = attendanceData.find(
        (d) => d.attendance_date === formattedDate
      );
      return {
        attendance_date: day,
        attended: attendance ? attendance.attended === 1 : false,
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
              border: "1px solid #ccc",
              textAlign: "center",
            }}
          >
            {day.attendance_date.getUTCDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomMonthLayout;
