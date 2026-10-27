
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore the existing session when the app opens.
  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      const token = localStorage.getItem("skillixToken");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("skillixToken");

          if (!cancelled) {
            setUser(null);
          }

          return;
        }

        const data = await response.json();

        if (!cancelled) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Unable to restore session:", error);

        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  // Register a new account using the FastAPI backend.
  const signup = async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          success: false,
          message:
            typeof data.detail === "string"
              ? data.detail
              : "Unable to create your account.",
        };
      }

      localStorage.setItem("skillixToken", data.access_token);
      setUser(data.user);

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      console.error("Signup request failed:", error);

      return {
        success: false,
        message:
          "Unable to connect to the server. Please ensure the backend is running.",
      };
    }
  };

  // Authenticate an existing account using the FastAPI backend.
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          success: false,
          message:
            typeof data.detail === "string"
              ? data.detail
              : "Unable to log in.",
        };
      }

      localStorage.setItem("skillixToken", data.access_token);
      setUser(data.user);

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      console.error("Login request failed:", error);

      return {
        success: false,
        message:
          "Unable to connect to the server. Please ensure the backend is running.",
      };
    }
  };

  // Log out on this device.
  const logout = () => {
    localStorage.removeItem("skillixToken");
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}
