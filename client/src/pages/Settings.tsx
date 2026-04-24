import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css";

const BASE = "http://localhost:8000";

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string | null;
  bio: string;
  isPublicProfile: boolean;
}

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BASE}/users/me`, { credentials: "include" })
      .then((r) => {
        if (!r.ok) { navigate("/"); return null; }
        return r.json();
      })
      .then((d) => {
        if (!d) return;
        const u: UserData = d.user;
        setUser(u);
        setUsername(u.username ?? "");
        setBio(u.bio ?? "");
        setIsPublic(u.isPublicProfile);
      });
  }, []);

  async function save() {
    setError("");
    setSaving(true);
    try {
      const res = await fetch(`${BASE}/users/me`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: username.trim() || undefined,
          bio,
          isPublicProfile: isPublic,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Could not save settings.");
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  if (!user) return null;

  const profileUrl = username.trim()
    ? `${window.location.origin}/u/${username.trim()}`
    : null;

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2 className="settings-title">Profile Settings</h2>
        <p className="settings-subtitle">Manage your public profile and collection visibility</p>
      </div>

      <div className="settings-card">
        <div className="settings-section">
          <h3 className="settings-section-title">Account</h3>
          <div className="settings-row">
            <span className="settings-label">Name</span>
            <span className="settings-value">{user.firstName} {user.lastName}</span>
          </div>
          <div className="settings-row">
            <span className="settings-label">Email</span>
            <span className="settings-value">{user.email}</span>
          </div>
        </div>

        <div className="settings-divider" />

        <div className="settings-section">
          <h3 className="settings-section-title">Public Profile</h3>

          <label className="settings-field">
            <span className="settings-field-label">Username</span>
            <span className="settings-field-hint">Used in your public profile URL: /u/username</span>
            <input
              className="settings-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. tyler"
              maxLength={30}
            />
          </label>

          {profileUrl && (
            <div className="profile-url-preview">
              <span className="profile-url-label">Your profile URL</span>
              <a
                href={`/u/${username.trim()}`}
                target="_blank"
                rel="noreferrer"
                className="profile-url-link"
              >
                {profileUrl}
              </a>
            </div>
          )}

          <label className="settings-field">
            <span className="settings-field-label">Bio</span>
            <span className="settings-field-hint">A short description shown on your public profile</span>
            <textarea
              className="settings-textarea"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="e.g. Jazz and soul collector based in Lisbon."
              rows={3}
              maxLength={280}
            />
          </label>

          <label className="settings-toggle-row">
            <div className="settings-toggle-info">
              <span className="settings-toggle-label">Public profile</span>
              <span className="settings-toggle-hint">
                When enabled, your owned records are visible at your profile URL
              </span>
            </div>
            <div
              className={`toggle-switch${isPublic ? " toggle-on" : ""}`}
              onClick={() => setIsPublic((v) => !v)}
              role="switch"
              aria-checked={isPublic}
            >
              <div className="toggle-thumb" />
            </div>
          </label>
        </div>

        {error && <p className="settings-error">{error}</p>}

        <div className="settings-footer">
          <button className="btn-save" onClick={save} disabled={saving}>
            {saving ? "Saving…" : saved ? "Saved ✓" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};
