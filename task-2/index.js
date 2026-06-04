import dotenv from "dotenv";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "../.env") });

const API_KEY = process.env.OPENWEATHER_API_KEY;
const URL = `https://api.openweathermap.org/data/2.5/forecast?q=Jakarta&appid=${API_KEY}&units=metric&cnt=40`;

axios
    .get(URL)
    .then((response) => {
        const list = response.data.list;
        const seen = new Set();
        const forecast = [];

        for (const item of list) {
            const date = item.dt_txt.split(" ")[0];
            if (!seen.has(date)) {
                seen.add(date);

                const dateObj = new Date(item.dt_txt);
                const formatted = dateObj.toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                });

                forecast.push({
                    date: formatted,
                    temp: item.main.temp,
                });
            }
        }

        console.log("Weather Forecast:");
        forecast.slice(0, 5).forEach((day) => {
            console.log(`${day.date}: ${day.temp}°C`);
        });
    })
    .catch((error) => {
        console.error("Error fetching weather data:", error.message);
    });
