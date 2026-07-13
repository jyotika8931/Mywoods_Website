import { useState } from "react";
// import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
//  const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const raw = {
                email: email,
                password: password,

            };

            const response = await fetch("https://testbackend1-dqwh.onrender.com/api/auth/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(raw),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            console.log("Status:", response.status);
            console.log("Response:", result);

             alert(JSON.stringify(result));

             if (result.token) {
    localStorage.setItem("token", result.token);
    window.location.reload();
              } else {
                alert(result.message || "Login failed");
              }
        }  catch (error) {
    console.error(error);
    alert(error.message);
}
    }

    return (
        <>
            <label>Email</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
            <label>Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => handleLogin()}>Login</button>
        </>
    )
}

export default Login;