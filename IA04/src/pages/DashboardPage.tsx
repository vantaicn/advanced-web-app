// Dashboard page for authenticated users

import { useAuth } from "../hooks/useAuth";
import { useProtectedData } from "../hooks/useProtectedData";

export const DashboardPage = () => {
  const { user, logout, isLoading: authLoading } = useAuth();
  const {
    data: protectedData,
    isLoading: dataLoading,
    error: dataError,
  } = useProtectedData();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Dashboard</h1>
          <p style={styles.subtitle}>Welcome to your protected area</p>
        </div>
        <button
          onClick={handleLogout}
          style={styles.logoutButton}
          disabled={authLoading}
        >
          {authLoading ? "Logging out..." : "Logout"}
        </button>
      </div>

      <div style={styles.content}>
        {/* User Info Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>User Information</h2>
          {user ? (
            <div style={styles.userInfo}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Name:</span>
                <span style={styles.infoValue}>{user.name}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Email:</span>
                <span style={styles.infoValue}>{user.email}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>User ID:</span>
                <span style={styles.infoValue}>{user.id}</span>
              </div>
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </div>

        {/* Protected Data Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Protected Data</h2>
          {dataLoading && <p>Loading protected data...</p>}
          {dataError && (
            <div style={styles.errorBox}>
              Failed to load protected data: {dataError.message}
            </div>
          )}
          {protectedData && (
            <div>
              <p style={styles.dataMessage}>{protectedData.message}</p>
              <div style={styles.itemsContainer}>
                {protectedData.data.items.map((item: any) => (
                  <div key={item.id} style={styles.item}>
                    <h3 style={styles.itemTitle}>{item.title}</h3>
                    <p style={styles.itemDescription}>{item.description}</p>
                  </div>
                ))}
              </div>
              <p style={styles.timestamp}>
                Last updated:{" "}
                {new Date(protectedData.data.timestamp).toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Authentication Info Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Authentication Details</h2>
          <div style={styles.authDetails}>
            <div style={styles.detailItem}>
              <span style={styles.detailIcon}>🔐</span>
              <div>
                <p style={styles.detailTitle}>Access Token</p>
                <p style={styles.detailText}>Stored in memory (secure)</p>
                <p style={styles.detailSubtext}>Expires in 15 minutes</p>
              </div>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailIcon}>🔄</span>
              <div>
                <p style={styles.detailTitle}>Refresh Token</p>
                <p style={styles.detailText}>Stored in localStorage</p>
                <p style={styles.detailSubtext}>Expires in 7 days</p>
              </div>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailIcon}>✨</span>
              <div>
                <p style={styles.detailTitle}>Auto Refresh</p>
                <p style={styles.detailText}>
                  Automatic token refresh on expiry
                </p>
                <p style={styles.detailSubtext}>Seamless authentication</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f7fafc",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
    flexWrap: "wrap",
    gap: "16px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#1a202c",
    marginBottom: "4px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#718096",
  },
  logoutButton: {
    backgroundColor: "#f56565",
    color: "white",
    padding: "10px 24px",
    borderRadius: "8px",
    border: "none",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  content: {
    display: "grid",
    gap: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: "16px",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    backgroundColor: "#f7fafc",
    borderRadius: "8px",
  },
  infoLabel: {
    fontWeight: "600",
    color: "#4a5568",
    fontSize: "14px",
  },
  infoValue: {
    color: "#2d3748",
    fontSize: "14px",
  },
  errorBox: {
    backgroundColor: "#fed7d7",
    color: "#c53030",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
  },
  dataMessage: {
    fontSize: "16px",
    color: "#4a5568",
    marginBottom: "16px",
  },
  itemsContainer: {
    display: "grid",
    gap: "12px",
    marginBottom: "16px",
  },
  item: {
    padding: "16px",
    backgroundColor: "#f7fafc",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  itemTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: "4px",
  },
  itemDescription: {
    fontSize: "14px",
    color: "#718096",
  },
  timestamp: {
    fontSize: "12px",
    color: "#a0aec0",
    fontStyle: "italic",
  },
  authDetails: {
    display: "grid",
    gap: "16px",
  },
  detailItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    padding: "16px",
    backgroundColor: "#f7fafc",
    borderRadius: "8px",
  },
  detailIcon: {
    fontSize: "24px",
  },
  detailTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: "4px",
  },
  detailText: {
    fontSize: "14px",
    color: "#4a5568",
    marginBottom: "2px",
  },
  detailSubtext: {
    fontSize: "12px",
    color: "#718096",
  },
};
