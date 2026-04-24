import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const BASE = "http://localhost:8000";

const GRADES = ["MINT", "NEAR_MINT", "VERY_GOOD_PLUS", "VERY_GOOD", "GOOD_PLUS", "GOOD", "FAIR", "POOR"];
const GRADE_LABEL: Record<string, string> = {
  MINT: "Mint (M)",
  NEAR_MINT: "Near Mint (NM)",
  VERY_GOOD_PLUS: "Very Good+ (VG+)",
  VERY_GOOD: "Very Good (VG)",
  GOOD_PLUS: "Good+ (G+)",
  GOOD: "Good (G)",
  FAIR: "Fair (F)",
  POOR: "Poor (P)",
};
const GRADE_SHORT: Record<string, string> = {
  MINT: "M", NEAR_MINT: "NM", VERY_GOOD_PLUS: "VG+",
  VERY_GOOD: "VG", GOOD_PLUS: "G+", GOOD: "G", FAIR: "F", POOR: "P",
};

interface VinylRecord {
  id: number;
  artist: string;
  title: string;
  year: number | null;
  label: string | null;
  genre: string | null;
  coverArtUrl: string | null;
  mediaGrade: string;
  sleeveGrade: string;
  status: string;
}

interface DiscogsResult {
  discogsId: number;
  title: string;
  year: string | null;
  label: string | null;
  genre: string | null;
  country: string | null;
  coverImage: string | null;
  thumb: string | null;
}

export const Dashboard: React.FC = () => {
  const [records, setRecords] = useState<VinylRecord[]>([]);
  const [filter, setFilter] = useState<"ALL" | "OWNED" | "WANTED">("ALL");
  const [view, setView] = useState<"grid" | "table">("grid");
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<DiscogsResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState<DiscogsResult | null>(null);

  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [label, setLabel] = useState("");
  const [genre, setGenre] = useState("");
  const [pressingCountry, setPressingCountry] = useState("");
  const [coverArtUrl, setCoverArtUrl] = useState("");
  const [mediaGrade, setMediaGrade] = useState("VERY_GOOD_PLUS");
  const [sleeveGrade, setSleeveGrade] = useState("VERY_GOOD_PLUS");
  const [status, setStatus] = useState("OWNED");
  const [isCleaned, setIsCleaned] = useState(false);
  const [hasAntiStaticSleeve, setHasAntiStaticSleeve] = useState(false);

  async function checkAuth() {
    const res = await fetch(`${BASE}/users/me`, { credentials: "include" });
    if (!res.ok) navigate("/");
  }

  async function getAllRecords() {
    const res = await fetch(`${BASE}/records`, { credentials: "include" });
    const data = await res.json();
    setRecords(data.records || []);
  }

  async function deleteRecord(id: number) {
    await fetch(`${BASE}/records/${id}`, { method: "delete", credentials: "include" });
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }

  async function searchDiscogs() {
    if (!searchQuery.trim()) return;
    setSearchLoading(true);
    try {
      const res = await fetch(
        `${BASE}/discogs/search?q=${encodeURIComponent(searchQuery)}`,
        { credentials: "include" }
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } finally {
      setSearchLoading(false);
    }
  }

  function selectResult(result: DiscogsResult) {
    setSelectedResult(result);
    setSearchResults([]);
    setSearchQuery("");
    const parts = result.title.split(" - ");
    if (parts.length >= 2) {
      setArtist(parts[0].trim());
      setTitle(parts.slice(1).join(" - ").trim());
    } else {
      setTitle(result.title);
    }
    setYear(result.year ?? "");
    setLabel(result.label ?? "");
    setGenre(result.genre ?? "");
    setPressingCountry(result.country ?? "");
    setCoverArtUrl(result.coverImage ?? "");
  }

  function clearForm() {
    setSelectedResult(null);
    setArtist(""); setTitle(""); setYear(""); setLabel("");
    setGenre(""); setPressingCountry(""); setCoverArtUrl("");
    setMediaGrade("VERY_GOOD_PLUS"); setSleeveGrade("VERY_GOOD_PLUS");
    setStatus("OWNED"); setIsCleaned(false); setHasAntiStaticSleeve(false);
  }

  async function createRecord() {
    if (!artist.trim() || !title.trim()) {
      alert("Artist and title are required.");
      return;
    }
    const res = await fetch(`${BASE}/records`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        artist, title,
        year: year ? parseInt(year) : undefined,
        label: label || undefined,
        genre: genre || undefined,
        pressingCountry: pressingCountry || undefined,
        coverArtUrl: coverArtUrl || undefined,
        mediaGrade, sleeveGrade, status, isCleaned, hasAntiStaticSleeve,
      }),
    });
    const data = await res.json();
    if (data.record) {
      setRecords((prev) => [data.record, ...prev]);
      clearForm();
    }
  }

  useEffect(() => {
    checkAuth();
    getAllRecords();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">My Collection</h2>
          <p className="dashboard-subtitle">
            {records.length > 0
              ? `${records.length} record${records.length !== 1 ? "s" : ""}`
              : "No records yet"}
          </p>
        </div>
      </div>


      {/* ── Add Record Panel ── */}
      <div className="add-record-panel">
        <h3 className="panel-heading">Add a Record</h3>

        {/* Discogs search */}
        <div className="search-row">
          <input
            className="search-input"
            placeholder="Search by artist, album, or label…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchDiscogs()}
          />
          <button className="btn-search" onClick={searchDiscogs} disabled={searchLoading}>
            {searchLoading ? "Searching…" : "Search"}
          </button>
        </div>

        {searchResults.length > 0 && (
          <ul className="search-results">
            {searchResults.map((r) => (
              <li key={r.discogsId} className="search-result-item" onClick={() => selectResult(r)}>
                {r.thumb
                  ? <img src={r.thumb} alt="" className="result-thumb" />
                  : <div className="result-thumb-placeholder">♪</div>
                }
                <div className="result-text">
                  <strong>{r.title}</strong>
                  <span className="result-meta">{[r.year, r.label, r.country].filter(Boolean).join(" · ")}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        {selectedResult && (
          <div className="selected-preview">
            {selectedResult.thumb && (
              <img src={selectedResult.thumb} alt="" className="preview-thumb" />
            )}
            <div className="preview-info">
              <span className="preview-title">{selectedResult.title}</span>
              <span className="preview-meta">{[selectedResult.year, selectedResult.label].filter(Boolean).join(" · ")}</span>
            </div>
            <button className="btn-clear-selection" onClick={clearForm}>✕ Clear</button>
          </div>
        )}

        {/* Record Details */}
        <p className="section-label">Record Details</p>
        <div className="fields-grid-2">
          <label className="field">
            <span>Artist *</span>
            <input value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="e.g. Miles Davis" />
          </label>
          <label className="field">
            <span>Title *</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Kind of Blue" />
          </label>
          <label className="field">
            <span>Label</span>
            <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Columbia" />
          </label>
          <label className="field">
            <span>Genre</span>
            <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="e.g. Jazz" />
          </label>
          <label className="field">
            <span>Year</span>
            <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 1959" />
          </label>
          <label className="field">
            <span>Pressing Country</span>
            <input value={pressingCountry} onChange={(e) => setPressingCountry(e.target.value)} placeholder="e.g. US" />
          </label>
        </div>

        {/* Condition */}
        <p className="section-label">Condition</p>
        <div className="condition-row">
          <label className="field">
            <span>Media Grade</span>
            <select value={mediaGrade} onChange={(e) => setMediaGrade(e.target.value)}>
              {GRADES.map((g) => <option key={g} value={g}>{GRADE_LABEL[g]}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Sleeve Grade</span>
            <select value={sleeveGrade} onChange={(e) => setSleeveGrade(e.target.value)}>
              {GRADES.map((g) => <option key={g} value={g}>{GRADE_LABEL[g]}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Status</span>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="OWNED">Owned</option>
              <option value="WANTED">Wanted</option>
            </select>
          </label>
          <label className="checkbox-toggle">
            <input type="checkbox" checked={isCleaned} onChange={(e) => setIsCleaned(e.target.checked)} />
            <span>Cleaned</span>
          </label>
          <label className="checkbox-toggle">
            <input type="checkbox" checked={hasAntiStaticSleeve} onChange={(e) => setHasAntiStaticSleeve(e.target.checked)} />
            <span>Anti-static Sleeve</span>
          </label>
        </div>

        <div className="panel-footer">
          <button className="btn-add-record" onClick={createRecord}>
            Add to Collection
          </button>
        </div>
      </div>

      {/* ── Collection filter toolbar ── */}
      {records.length > 0 && (
        <div className="collection-toolbar">
          <div className="filter-tabs">
            {(["ALL", "OWNED", "WANTED"] as const).map((f) => {
              const count = f === "ALL" ? records.length : records.filter((r) => r.status === f).length;
              return (
                <button
                  key={f}
                  className={`filter-tab${filter === f ? " active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}
                  <span className="filter-count">{count}</span>
                </button>
              );
            })}
          </div>
          <div className="view-toggle">
            <button className={`view-btn${view === "grid" ? " active" : ""}`} onClick={() => setView("grid")} title="Grid view">⊞</button>
            <button className={`view-btn${view === "table" ? " active" : ""}`} onClick={() => setView("table")} title="Table view">☰</button>
          </div>
        </div>
      )}

      {/* ── Record Grid / Table ── */}
      {records.length === 0 ? (
        <div className="empty-collection">
          <p>Your collection is empty.</p>
          <p className="empty-hint">Search above to add your first record.</p>
        </div>
      ) : view === "grid" ? (
        <div className="record-grid">
          {records.filter((r) => filter === "ALL" || r.status === filter).map((record) => (
            <div key={record.id} className="record-card">
              <div className="record-cover-wrap">
                {record.coverArtUrl
                  ? <img src={record.coverArtUrl} alt={`${record.artist} – ${record.title}`} className="record-cover" />
                  : <div className="record-cover-placeholder">♪</div>
                }
                <span className={`status-chip status-${record.status.toLowerCase()}`}>
                  {record.status}
                </span>
              </div>
              <div className="record-body">
                <p className="record-artist">{record.artist}</p>
                <p className="record-album">{record.title}</p>
                <p className="record-meta">
                  {[record.year, record.label].filter(Boolean).join(" · ") || <>&nbsp;</>}
                </p>
                <div className="grade-chips">
                  <span className="grade-chip" title="Media grade">{GRADE_SHORT[record.mediaGrade]}</span>
                  <span className="grade-chip grade-chip-sleeve" title="Sleeve grade">{GRADE_SHORT[record.sleeveGrade]}</span>
                </div>
                <div className="record-actions">
                  <button className="btn-view" onClick={() => navigate(`/record/${record.id}`)}>View Record</button>
                  <button className="btn-delete" onClick={() => deleteRecord(record.id)} title="Remove">✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="record-table-wrap">
          <table className="record-table">
            <thead>
              <tr>
                <th>Artist</th>
                <th>Title</th>
                <th>Year</th>
                <th>Label</th>
                <th>Genre</th>
                <th>Media</th>
                <th>Sleeve</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {records.filter((r) => filter === "ALL" || r.status === filter).map((record) => (
                <tr key={record.id} className="record-row" onClick={() => navigate(`/record/${record.id}`)}>
                  <td className="td-artist">{record.artist}</td>
                  <td className="td-title">{record.title}</td>
                  <td className="td-num">{record.year ?? "—"}</td>
                  <td>{record.label ?? "—"}</td>
                  <td>{record.genre ?? "—"}</td>
                  <td className="td-num"><span className="grade-chip">{GRADE_SHORT[record.mediaGrade]}</span></td>
                  <td className="td-num"><span className="grade-chip grade-chip-sleeve">{GRADE_SHORT[record.sleeveGrade]}</span></td>
                  <td><span className={`status-chip-inline status-${record.status.toLowerCase()}`}>{record.status}</span></td>
                  <td className="td-actions" onClick={(e) => e.stopPropagation()}>
                    <button className="btn-delete" onClick={() => deleteRecord(record.id)} title="Remove">✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
