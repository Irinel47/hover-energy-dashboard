import Header from "./charts/Header";
import StackedAreaChart from "./charts/StackedAreaChart";
import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";
import DonutChart from "./charts/DonutChart";
import "./App.css";

export default function App() {
  return (
    <div className="dashboard-root">
      <Header />
      <main className="dashboard-main">
        <section className="panel panel--wide">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Global Energy Mix Over Time</h2>
              <p className="panel-subtitle">
                Total consumption by source · TWh · 1965–2024
              </p>
            </div>
          </div>
          <StackedAreaChart />
        </section>

        <div className="bottom-row">
          <section className="panel">
            <div className="panel-header">
              <div>
                <h2 className="panel-title">Top Consumers</h2>
                <p className="panel-subtitle">2024 · TWh</p>
              </div>
            </div>
            <BarChart />
          </section>

          <section className="panel">
            <div className="panel-header">
              <div>
                <h2 className="panel-title">Rise of Clean Energy</h2>
                <p className="panel-subtitle">Global production · TWh</p>
              </div>
            </div>
            <LineChart />
          </section>

          <section className="panel">
            <div className="panel-header">
              <div>
                <h2 className="panel-title">2024 Energy Mix</h2>
                <p className="panel-subtitle">World share by source</p>
              </div>
            </div>
            <DonutChart />
          </section>
        </div>
      </main>
    </div>
  );
}
