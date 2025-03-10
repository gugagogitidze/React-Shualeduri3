import { useState } from "react";
import { useForm } from "react-hook-form";
import moviesData from "./data.json";

export default function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("all");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password, confirmPassword } = data;

    if (!email.includes("@")) {
      alert("Invalid email format");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsRegistered(true);
    setMovies(moviesData);
  };

  const filteredMovies = movies
    .filter((movie) => {
      if (filter === "movies") return movie.category === "Movie";
      if (filter === "series") return movie.category === "TV Series";
      if (filter === "favorites") return movie.isBookmarked;
      return true;
    })
    .filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {!isRegistered ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#161D2F] w-[400px] h-[418px] rounded-[20px] p-4"
        >
          <h2 className="text-xl text-amber-50 font-semibold text-center mb-4">Register</h2>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border-1 rounded-2xl text-amber-50 bg-transparent"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 7, message: "Password must be at least 7 characters" },
              })}
              className="w-full p-2 border-1 rounded-2xl text-amber-50 bg-transparent"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Repeat Password"
              {...register("confirmPassword", { required: "Confirm Password is required" })}
              className="w-full p-2 border-1 rounded-2xl text-amber-50 bg-transparent"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4"
          >
            Create Account
          </button>
        </form>
      ) : (
        <div className="w-full flex flex-row items-start">
          <div className="w-20 h-[450px] bg-[#161d2f] rounded-[20px] flex flex-col items-center pt-4 mr-6 sticky top-20">
            <button onClick={() => setFilter("all")} className="mb-4 p-2 text-white">📽 All</button>
            <button onClick={() => setFilter("movies")} className="mb-4 p-2 text-white">🎬 Movies</button>
            <button onClick={() => setFilter("series")} className="mb-4 p-2 text-white">📺 Series</button>
            <button onClick={() => setFilter("favorites")} className="p-2 text-white">⭐ Favorites</button>
          </div>

          <div className="flex flex-col items-center w-full">
            <input
              type="text"
              placeholder="Search for movies or TV series"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-lg p-2 border-0 rounded mb-4 text-[white] bg-[#10141E]"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto">
              {filteredMovies.map((movie) => (
                <div key={movie.title} className="w-[250px] h-[320px] p-4 border-0 rounded-lg shadow-md text-white flex flex-col" style={{ background: "var(--Dark-Blue, #10141E)" }}>
                  <img
                    src={movie.Image}
                    alt={movie.title}
                    className="w-full h-[170px] object-cover rounded mb-3"
                  />
                  <div className="flex justify-between text-gray-400 text-sm mb-2">
                    <span>{movie.year}</span>
                    <span>• {movie.category}</span>
                    <span>• {movie.rating}</span>
                  </div>
                  <h3 className="text-lg font-semibold mt-auto">{movie.title}</h3>
                  <div className="absolute top-2 right-2 bg-gray-800 p-1 rounded-full">
                    <span>{movie.isBookmarked ? "⭐" : "☆"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}