import { Route, Routes } from "react-router-dom";
import Login from "./screens/LoginScreen";
import SignUp from "./screens/SignupScreen";
import Profile from "./screens/ProfileScreen";
import { useStore } from "./hooks/module";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const token = useStore((state) => state.token);
  const queryClient = new QueryClient();

  console.log(token);

  if (token.length) {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </QueryClientProvider>
    );
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </QueryClientProvider>
    );
  }
}

export default App;
