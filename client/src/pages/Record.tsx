import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Record.css";

const BASE = "http://localhost:8000";
const GRADES = ["MINT", "NEAR_MINT", "VERY_GOOD_PLUS", "VERY_GOOD", "GOOD_PLUS", "GOOD", "FAIR", "POOR"];

interface VinylRecord {
  id: number;
  artist: string;
  title: string;
  year: number | null;
  label: string | null;
  genre: string | null;
  pressingCountry: string | null;
  coverArtUrl: string | null;
  mediaGrade: string;
  sleeveGrade: string;
  status: string;
  isCleaned: boolean;
  hasAntiStaticSleeve: boolean;
}

interface PlayLog {
  id: number;
  playedAt: string;
  notes: string | null;
}

export const RecordPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [record, setRecord] = useState<VinylRecord | null>(null);
  const [playLogs, setPlayLogs] = useState<PlayLog[]>([]);
  const [playNotes, setPlayNotes] = useState("");

  const [mediaGrade, setMediaGrade] = useState("");
  const [sleeveGrade, setSleeveGrade] = useState("");
  const [status, setStatus] = useState("OWNED");
  const [isCleaned, setIsCleaned] = useState(false);
  const [hasAntiStaticSleeve, setHasAntiStaticSleeve] = useState(false);

  async function fetchRecord() {
    const res = await fetch(`${BASE}/records/${id}`, { credentials: "include" });
    if (!res.ok) { navigate("/dashboard"); return; }
    const data = await res.json();
    const r: VinylRecord = data.record;
    setRecord(r);
    setMediaGrade(r.mediaGrade);
    setSleeveGrade(r.sleeveGrade);
    setStatus(r.status);
    setIsCleaned(r.isCleaned);
    setHasAntiStaticSleeve(r.hasAntiStaticSleeve);
  }

  async function fetchPlayLogs() {
    const res = await fetch(`${BASE}/play-log/${id}`, { credentials: "include" });
    const data = await res.json();
    setPlayLogs(data.playLogs || []);
  }

  async function updateRecord() {
    const res = await fetch(`${BASE}/records/${id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ mediaGrade, sleeveGrade, status, isCleaned, hasAntiStaticSleeve }),
    });
    const data = await res.json();
    if (data.record) setRecord(data.record);
  }

  async function logPlay() {
    const res = await fetch(`${BASE}/play-log/${id}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ notes: playNotes || undefined }),
    });
    const data = await res.json();
    if (data.playLog) {
      setPlayLogs((prev) => [data.playLog, ...prev]);
      setPlayNotes("");
    }
  }

  useEffect(() => {
    fetchRecord();
    fetchPlayLogs();
  }, []);

  if (!record) return <div className="record-container"><p>Loading...</p></div>;

  const meta = [record.year, record.label, record.genre, record.pressingCountry].filter(Boolean).join(" · ");

  return (
    <div className="record-container">
      <div className="record-header-section">
        {record.coverArtUrl ? (
          <img src={record.coverArtUrl} alt={record.title} className="record-cover-large" />
        ) : (
          <div className="record-cover-large-placeholder">♪</div>
        )}
        <div className="record-header-info">
          <h2 className="page-title">{record.artist}</h2>
          <h3 className="record-subtitle">{record.title}</h3>
          {meta && <p className="record-meta-text">{meta}</p>}
          <div className="header-badges">
            <span className="header-badge">Media: {record.mediaGrade.replace(/_/g, " ")}</span>
            <span className="header-badge">Sleeve: {record.sleeveGrade.replace(/_/g, " ")}</span>
            <span className={`status-badge status-${record.status.toLowerCase()}`}>{record.status}</span>
            {record.isCleaned && <span className="flag-badge">Cleaned</span>}
            {record.hasAntiStaticSleeve && <span className="flag-badge">Anti-static</span>}
          </div>
        </div>
      </div>

      <section className="card-section">
        <h3>Update Record</h3>
        <div className="form-row">
          <label className="form-label">
            Media Grade
            <select value={mediaGrade} onChange={(e) => setMediaGrade(e.target.value)}>
              {GRADES.map((g) => <option key={g} value={g}>{g.replace(/_/g, " ")}</option>)}
            </select>
          </label>
          <label className="form-label">
            Sleeve Grade
            <select value={sleeveGrade} onChange={(e) => setSleeveGrade(e.target.value)}>
              {GRADES.map((g) => <option key={g} value={g}>{g.replace(/_/g, " ")}</option>)}
            </select>
          </label>
          <label className="form-label">
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="OWNED">Owned</option>
              <option value="WANTED">Wanted</option>
            </select>
          </label>
        </div>
        <div className="form-row" style={{ marginTop: "0.75rem" }}>
          <label className="checkbox-label">
            <input type="checkbox" checked={isCleaned} onChange={(e) => setIsCleaned(e.target.checked)} />
            Cleaned
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={hasAntiStaticSleeve} onChange={(e) => setHasAntiStaticSleeve(e.target.checked)} />
            Anti-static Sleeve
          </label>
          <button className="btn-primary" onClick={updateRecord}>Save Changes</button>
        </div>
      </section>

      <section className="card-section">
        <h3>Log a Play</h3>
        <div className="form-row">
          <input
            className="input-text"
            style={{ flex: 1 }}
            placeholder="Notes (optional)"
            value={playNotes}
            onChange={(e) => setPlayNotes(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && logPlay()}
          />
          <button className="btn-primary" onClick={logPlay}>Log Play</button>
        </div>
      </section>

      <section className="card-section">
        <h3>Play History ({playLogs.length})</h3>
        {playLogs.length === 0 ? (
          <p className="empty-state">No plays logged yet.</p>
        ) : (
          <div className="play-log-list">
            {playLogs.map((log) => (
              <div key={log.id} className="play-log-entry">
                <span className="play-date">
                  {new Date(log.playedAt).toLocaleDateString("en-GB", {
                    weekday: "short", day: "numeric", month: "short", year: "numeric",
                  })}
                </span>
                {log.notes && <span className="play-notes">{log.notes}</span>}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
