import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, Area, AreaChart,
} from "recharts";
import "../styles/Stats.css";

const BASE = "http://localhost:8000";

const PIE_COLORS = [
  "#1a1a2e", "#c9a84c", "#2a2a42", "#b8943e",
  "#3a3a5c", "#d4b86a", "#0f0f1e", "#a07830",
];

interface StatsData {
  totalRecords: number;
  uniqueArtists: number;
  totalPlays: number;
  ownedCount: number;
  wantedCount: number;
  genreBreakdown: { genre: string; count: number }[];
  decadeBreakdown: { decade: string; count: number }[];
  recentActivity: { date: string; plays: number }[];
}

const formatDate = (iso: string) => {
  const [, m, d] = iso.split("-");
  return `${parseInt(m)}/${parseInt(d)}`;
};

export const StatsPage: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE}/users/me`, { credentials: "include" })
      .then((r) => { if (!r.ok) navigate("/"); })
      .catch(() => navigate("/"));

    fetch(`${BASE}/records/stats`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setStats(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="stats-loading">Loading stats…</div>;
  if (!stats) return null;

  const kpis = [
    { label: "Total Records", value: stats.totalRecords },
    { label: "Owned", value: stats.ownedCount },
    { label: "Wanted", value: stats.wantedCount },
    { label: "Unique Artists", value: stats.uniqueArtists },
    { label: "Total Plays", value: stats.totalPlays },
  ];

  const hasGenres = stats.genreBreakdown.length > 0;
  const hasDecades = stats.decadeBreakdown.length > 0;
  const hasActivity = stats.recentActivity.some((d) => d.plays > 0);
  const empty = stats.totalRecords === 0;

  return (
    <div className="stats-container">
      <div className="stats-header">
        <h2 className="stats-title">Collection Stats</h2>
        <p className="stats-subtitle">An overview of your vinyl library</p>
      </div>

      {/* KPI cards */}
      <div className="kpi-grid">
        {kpis.map((k) => (
          <div key={k.label} className="kpi-card">
            <span className="kpi-value">{k.value}</span>
            <span className="kpi-label">{k.label}</span>
          </div>
        ))}
      </div>

      {empty ? (
        <div className="stats-empty">
          <p>Add records to your collection to see charts here.</p>
        </div>
      ) : (
        <div className="charts-grid">

          {/* Genre breakdown */}
          {hasGenres && (
            <div className="chart-card chart-card--half">
              <h3 className="chart-title">Genre Breakdown</h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={stats.genreBreakdown}
                    dataKey="count"
                    nameKey="genre"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    label={({ genre, percent }: any) =>
                      (percent ?? 0) > 0.05 ? `${genre} (${Math.round((percent ?? 0) * 100)}%)` : ""
                    }
                    labelLine={false}
                  >
                    {stats.genreBreakdown.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v} record${v !== 1 ? "s" : ""}`, "Count"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Release decade */}
          {hasDecades && (
            <div className="chart-card chart-card--half">
              <h3 className="chart-title">Records by Decade</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={stats.decadeBreakdown} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0ddd8" vertical={false} />
                  <XAxis dataKey="decade" tick={{ fontSize: 12, fill: "#888" }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#888" }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "rgba(201,168,76,0.08)" }} formatter={(v) => [v, "Records"]} />
                  <Bar dataKey="count" fill="#1a1a2e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* 30-day play activity */}
          <div className="chart-card chart-card--full">
            <h3 className="chart-title">Play Activity — Last 30 Days</h3>
            {hasActivity ? (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={stats.recentActivity} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
                  <defs>
                    <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0ddd8" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    tick={{ fontSize: 11, fill: "#aaa" }}
                    axisLine={false}
                    tickLine={false}
                    interval={4}
                  />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#aaa" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    labelFormatter={(l: any) => new Date(String(l) + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    formatter={(v) => [v, "Plays"]}
                  />
                  <Area type="monotone" dataKey="plays" stroke="#c9a84c" strokeWidth={2} fill="url(#goldGrad)" dot={false} activeDot={{ r: 4, fill: "#c9a84c" }} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p className="chart-empty">No plays logged in the last 30 days.</p>
            )}
          </div>

        </div>
      )}
    </div>
  );
};
