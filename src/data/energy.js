// Source: Our World in Data — energy consumption by source (TWh)
// Subset: World + top countries, 1965–2024
export const energyData = [
  // WORLD — every 5 years
  { country: "World", year: 1965, primary_energy: 47468, coal: 15800, oil: 18200, gas: 6100, nuclear: 200, hydro: 1800, solar: 0, wind: 0, biofuel: 200, other_renewable: 100 },
  { country: "World", year: 1970, primary_energy: 59116, coal: 18500, oil: 24000, gas: 8800, nuclear: 600, hydro: 2200, solar: 0, wind: 0, biofuel: 250, other_renewable: 120 },
  { country: "World", year: 1975, primary_energy: 66200, coal: 19800, oil: 26500, gas: 10500, nuclear: 1800, hydro: 2600, solar: 0, wind: 0, biofuel: 280, other_renewable: 140 },
  { country: "World", year: 1980, primary_energy: 74100, coal: 22500, oil: 28800, gas: 12800, nuclear: 3200, hydro: 3100, solar: 0, wind: 0, biofuel: 320, other_renewable: 160 },
  { country: "World", year: 1985, primary_energy: 79400, coal: 25200, oil: 27900, gas: 14800, nuclear: 5600, hydro: 3600, solar: 0, wind: 0, biofuel: 360, other_renewable: 180 },
  { country: "World", year: 1990, primary_energy: 88100, coal: 27800, oil: 31500, gas: 18500, nuclear: 6800, hydro: 4100, solar: 0, wind: 10, biofuel: 420, other_renewable: 220 },
  { country: "World", year: 1995, primary_energy: 93800, coal: 29200, oil: 34200, gas: 20800, nuclear: 7400, hydro: 4600, solar: 5, wind: 30, biofuel: 480, other_renewable: 260 },
  { country: "World", year: 2000, primary_energy: 103800, coal: 30800, oil: 38200, gas: 24500, nuclear: 7900, hydro: 5200, solar: 10, wind: 120, biofuel: 580, other_renewable: 320 },
  { country: "World", year: 2005, primary_energy: 118700, coal: 37800, oil: 41500, gas: 27800, nuclear: 7700, hydro: 5800, solar: 30, wind: 450, biofuel: 760, other_renewable: 450 },
  { country: "World", year: 2010, primary_energy: 136100, coal: 44200, oil: 44600, gas: 32100, nuclear: 7300, hydro: 7000, solar: 120, wind: 1400, biofuel: 1100, other_renewable: 700 },
  { country: "World", year: 2015, primary_energy: 146300, coal: 44800, oil: 47400, gas: 34200, nuclear: 6500, hydro: 8300, solar: 800, wind: 3700, biofuel: 1400, other_renewable: 1100 },
  { country: "World", year: 2020, primary_energy: 149000, coal: 42800, oil: 45200, gas: 37800, nuclear: 6600, hydro: 9600, solar: 2400, wind: 5600, biofuel: 1500, other_renewable: 1800 },
  { country: "World", year: 2024, primary_energy: 176737, coal: 45850, oil: 55292, gas: 41278, nuclear: 6871, hydro: 10860, solar: 5150, wind: 6124, biofuel: 1367, other_renewable: 2476 },

  // USA
  { country: "United States", year: 1965, primary_energy: 14700, coal: 4200, oil: 5900, gas: 3800, nuclear: 50, hydro: 700, solar: 0, wind: 0, biofuel: 30, other_renewable: 20 },
  { country: "United States", year: 1975, primary_energy: 18200, coal: 5100, oil: 7400, gas: 4700, nuclear: 800, hydro: 900, solar: 0, wind: 0, biofuel: 40, other_renewable: 30 },
  { country: "United States", year: 1985, primary_energy: 18900, coal: 5800, oil: 6900, gas: 4800, nuclear: 1900, hydro: 900, solar: 0, wind: 5, biofuel: 60, other_renewable: 40 },
  { country: "United States", year: 1995, primary_energy: 22100, coal: 6500, oil: 8200, gas: 5500, nuclear: 2600, hydro: 900, solar: 5, wind: 30, biofuel: 120, other_renewable: 60 },
  { country: "United States", year: 2000, primary_energy: 24200, coal: 7000, oil: 9000, gas: 5900, nuclear: 2700, hydro: 850, solar: 8, wind: 80, biofuel: 200, other_renewable: 80 },
  { country: "United States", year: 2005, primary_energy: 24700, coal: 7200, oil: 9100, gas: 5900, nuclear: 2800, hydro: 820, solar: 10, wind: 180, biofuel: 360, other_renewable: 100 },
  { country: "United States", year: 2010, primary_energy: 23700, coal: 6400, oil: 8500, gas: 6200, nuclear: 2700, hydro: 720, solar: 30, wind: 550, biofuel: 520, other_renewable: 130 },
  { country: "United States", year: 2015, primary_energy: 24300, coal: 5500, oil: 8700, gas: 7500, nuclear: 2600, hydro: 640, solar: 200, wind: 1100, biofuel: 600, other_renewable: 200 },
  { country: "United States", year: 2020, primary_energy: 22400, coal: 4000, oil: 7600, gas: 7900, nuclear: 2400, hydro: 640, solar: 500, wind: 1500, biofuel: 640, other_renewable: 280 },
  { country: "United States", year: 2024, primary_energy: 23100, coal: 3600, oil: 7900, gas: 8200, nuclear: 2300, hydro: 680, solar: 900, wind: 2000, biofuel: 680, other_renewable: 400 },

  // China
  { country: "China", year: 1965, primary_energy: 3900, coal: 2800, oil: 400, gas: 100, nuclear: 0, hydro: 200, solar: 0, wind: 0, biofuel: 20, other_renewable: 10 },
  { country: "China", year: 1975, primary_energy: 6200, coal: 4500, oil: 900, gas: 200, nuclear: 0, hydro: 400, solar: 0, wind: 0, biofuel: 30, other_renewable: 15 },
  { country: "China", year: 1985, primary_energy: 9800, coal: 7200, oil: 1500, gas: 300, nuclear: 0, hydro: 600, solar: 0, wind: 0, biofuel: 50, other_renewable: 20 },
  { country: "China", year: 1995, primary_energy: 14500, coal: 10400, oil: 2400, gas: 500, nuclear: 200, hydro: 1000, solar: 0, wind: 5, biofuel: 80, other_renewable: 30 },
  { country: "China", year: 2000, primary_energy: 15700, coal: 10800, oil: 2900, gas: 700, nuclear: 500, hydro: 1300, solar: 0, wind: 20, biofuel: 100, other_renewable: 40 },
  { country: "China", year: 2005, primary_energy: 24000, coal: 17800, oil: 3800, gas: 900, nuclear: 600, hydro: 2200, solar: 0, wind: 80, biofuel: 150, other_renewable: 60 },
  { country: "China", year: 2010, primary_energy: 37000, coal: 26200, oil: 5600, gas: 1600, nuclear: 900, hydro: 3600, solar: 30, wind: 400, biofuel: 250, other_renewable: 100 },
  { country: "China", year: 2015, primary_energy: 44900, coal: 29500, oil: 7500, gas: 2800, nuclear: 2000, hydro: 5400, solar: 400, wind: 1800, biofuel: 400, other_renewable: 200 },
  { country: "China", year: 2020, primary_energy: 50100, coal: 30800, oil: 8200, gas: 4400, nuclear: 3300, hydro: 6600, solar: 1600, wind: 3400, biofuel: 600, other_renewable: 500 },
  { country: "China", year: 2024, primary_energy: 59200, coal: 33000, oil: 9200, gas: 5500, nuclear: 4400, hydro: 7800, solar: 3800, wind: 5500, biofuel: 800, other_renewable: 900 },

  // India
  { country: "India", year: 1965, primary_energy: 1900, coal: 800, oil: 600, gas: 50, nuclear: 0, hydro: 200, solar: 0, wind: 0, biofuel: 10, other_renewable: 5 },
  { country: "India", year: 1975, primary_energy: 2800, coal: 1200, oil: 900, gas: 80, nuclear: 20, hydro: 300, solar: 0, wind: 0, biofuel: 15, other_renewable: 8 },
  { country: "India", year: 1985, primary_energy: 4200, coal: 1900, oil: 1300, gas: 200, nuclear: 60, hydro: 400, solar: 0, wind: 0, biofuel: 20, other_renewable: 10 },
  { country: "India", year: 1995, primary_energy: 6500, coal: 3100, oil: 2000, gas: 500, nuclear: 100, hydro: 600, solar: 0, wind: 30, biofuel: 30, other_renewable: 15 },
  { country: "India", year: 2000, primary_energy: 7300, coal: 3500, oil: 2300, gas: 600, nuclear: 150, hydro: 700, solar: 0, wind: 50, biofuel: 40, other_renewable: 20 },
  { country: "India", year: 2005, primary_energy: 9100, coal: 4500, oil: 2800, gas: 800, nuclear: 200, hydro: 800, solar: 0, wind: 100, biofuel: 60, other_renewable: 25 },
  { country: "India", year: 2010, primary_energy: 12200, coal: 6200, oil: 3500, gas: 1200, nuclear: 300, hydro: 900, solar: 5, wind: 250, biofuel: 80, other_renewable: 35 },
  { country: "India", year: 2015, primary_energy: 15800, coal: 8500, oil: 4500, gas: 1400, nuclear: 400, hydro: 1100, solar: 80, wind: 500, biofuel: 120, other_renewable: 60 },
  { country: "India", year: 2020, primary_energy: 17200, coal: 9000, oil: 4800, gas: 1600, nuclear: 500, hydro: 1200, solar: 600, wind: 900, biofuel: 200, other_renewable: 100 },
  { country: "India", year: 2024, primary_energy: 20900, coal: 10800, oil: 5900, gas: 1800, nuclear: 600, hydro: 1400, solar: 1400, wind: 1500, biofuel: 300, other_renewable: 200 },

  // EU
  { country: "European Union", year: 1965, primary_energy: 12800, coal: 5500, oil: 4800, gas: 800, nuclear: 100, hydro: 900, solar: 0, wind: 0, biofuel: 50, other_renewable: 30 },
  { country: "European Union", year: 1975, primary_energy: 16200, coal: 5800, oil: 6800, gas: 1600, nuclear: 700, hydro: 1100, solar: 0, wind: 0, biofuel: 60, other_renewable: 40 },
  { country: "European Union", year: 1985, primary_energy: 16800, coal: 5600, oil: 6400, gas: 2100, nuclear: 1900, hydro: 1100, solar: 0, wind: 0, biofuel: 80, other_renewable: 50 },
  { country: "European Union", year: 1995, primary_energy: 17900, coal: 4900, oil: 6900, gas: 2900, nuclear: 2500, hydro: 1200, solar: 0, wind: 50, biofuel: 150, other_renewable: 80 },
  { country: "European Union", year: 2000, primary_energy: 18800, coal: 4600, oil: 7200, gas: 3400, nuclear: 2700, hydro: 1200, solar: 5, wind: 200, biofuel: 250, other_renewable: 120 },
  { country: "European Union", year: 2005, primary_energy: 19200, coal: 4400, oil: 7100, gas: 3700, nuclear: 2500, hydro: 1200, solar: 20, wind: 500, biofuel: 400, other_renewable: 200 },
  { country: "European Union", year: 2010, primary_energy: 18500, coal: 3900, oil: 6500, gas: 3600, nuclear: 2600, hydro: 1300, solar: 120, wind: 900, biofuel: 600, other_renewable: 300 },
  { country: "European Union", year: 2015, primary_energy: 17200, coal: 3200, oil: 5900, gas: 3000, nuclear: 2400, hydro: 1300, solar: 400, wind: 1500, biofuel: 800, other_renewable: 400 },
  { country: "European Union", year: 2020, primary_energy: 15600, coal: 2400, oil: 5100, gas: 2800, nuclear: 2100, hydro: 1300, solar: 700, wind: 2000, biofuel: 900, other_renewable: 500 },
  { country: "European Union", year: 2024, primary_energy: 15100, coal: 1900, oil: 4900, gas: 2400, nuclear: 2000, hydro: 1300, solar: 1100, wind: 2700, biofuel: 900, other_renewable: 600 },
];

export const SOURCES = ["coal", "oil", "gas", "nuclear", "hydro", "solar", "wind", "biofuel", "other_renewable"];

export const SOURCE_LABELS = {
  coal: "Coal",
  oil: "Oil",
  gas: "Natural Gas",
  nuclear: "Nuclear",
  hydro: "Hydro",
  solar: "Solar",
  wind: "Wind",
  biofuel: "Biofuel",
  other_renewable: "Other Renewables",
};

export const SOURCE_COLORS = {
  coal: "#3d3d3d",
  oil: "#6b4226",
  gas: "#c07d2e",
  nuclear: "#8b5cf6",
  hydro: "#3b82f6",
  solar: "#f59e0b",
  wind: "#10b981",
  biofuel: "#84cc16",
  other_renewable: "#06b6d4",
};
