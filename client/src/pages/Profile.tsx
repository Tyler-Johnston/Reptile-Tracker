import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const BASE = "http://localhost:8000";

const GRADE_SHORT: Record<string, string> = {
  MINT: "M", NEAR_MINT: "NM", VERY_GOOD_PLUS: "VG+",
  VERY_GOOD: "VG", GOOD_PLUS: "G+", GOOD: "G", FAIR: "F", POOR: "P",
};

interface ProfileData {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
}

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
}

export const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [records, setRecords] = useState<VinylRecord[]>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`${BASE}/users/profile/${username}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); return null; }
        return r.json();
      })
      .then((d) => {
        if (!d) return;
        setProfile(d.profile);
        setRecords(d.records);
      });
  }, [username]);

  if (notFound) {
    return (
      <div className="profile-not-found">
        <h2>Profile not found</h2>
        <p>This profile is either private or doesn't exist.</p>
        <button className="btn-back" onClick={() => navigate("/")}>Go home</button>
      </div>
    );
  }

  if (!profile) return <div className="profile-loading">Loading…</div>;

  return (
    <div className="profile-container">
      <div className="profile-hero">
        <div className="profile-avatar">
          {profile.firstName[0]}{profile.lastName[0]}
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{profile.firstName} {profile.lastName}</h1>
          <span className="profile-username">@{profile.username}</span>
          {profile.bio && <p className="profile-bio">{profile.bio}</p>}
        </div>
        <div className="profile-stats">
          <div className="profile-stat">
            <span className="profile-stat-value">{records.length}</span>
            <span className="profile-stat-label">Records</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value">
              {new Set(records.map((r) => r.artist)).size}
            </span>
            <span className="profile-stat-label">Artists</span>
          </div>
        </div>
      </div>

      {records.length === 0 ? (
        <div className="profile-empty">
          <p>No records in this collection yet.</p>
        </div>
      ) : (
        <div className="profile-grid">
          {records.map((record) => (
            <div key={record.id} className="profile-card">
              <div className="profile-cover-wrap">
                {record.coverArtUrl
                  ? <img src={record.coverArtUrl} alt={`${record.artist} – ${record.title}`} className="profile-cover" />
                  : <div className="profile-cover-placeholder">♪</div>
                }
              </div>
              <div className="profile-card-body">
                <p className="profile-card-artist">{record.artist}</p>
                <p className="profile-card-title">{record.title}</p>
                <p className="profile-card-meta">
                  {[record.year, record.label].filter(Boolean).join(" · ") || <>&nbsp;</>}
                </p>
                <div className="profile-grade-chips">
                  <span className="profile-grade-chip" title="Media">{GRADE_SHORT[record.mediaGrade]}</span>
                  <span className="profile-grade-chip profile-grade-chip--sleeve" title="Sleeve">{GRADE_SHORT[record.sleeveGrade]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
