import { useEffect, useState } from "react";
import "./App.css";

const API = "https://full-stack-development-online-learning.onrender.com/api";

export default function App() {
  const [courses, setCourses] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // LOAD COURSES
  useEffect(() => {
    fetch(`${API}/courses`)
      .then((res) => res.json())
      .then((data) => setCourses(data.courses || []))
      .catch((err) => console.log(err));
  }, []);

  // LOGIN
  const login = async () => {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    console.log("LOGIN:", data);

    if (data.token) {
      localStorage.setItem("token", data.token); // 🔥 IMPORTANT
      setIsLoggedIn(true);
      alert("Login successful");
    } else {
      alert(data.message || "Login failed");
    }
  };

  // ENROLL
  const enroll = async (courseId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const res = await fetch(`${API}/enrollments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="app">
      <h1 className="title">📚 Online Learning Platform</h1>

      {/* LOGIN SECTION */}
      {!isLoggedIn && (
        <div className="login-box">
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={login}>Login</button>
        </div>
      )}

      {/* COURSES */}
      <div className="grid">
        {courses.map((course) => (
          <div className="card" key={course._id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>

            <button onClick={() => enroll(course._id)}>
              Enroll 🚀
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}