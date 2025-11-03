// 404 Not Found page

import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>404</h1>
        <h2 style={styles.subtitle}>Page Not Found</h2>
        <p style={styles.text}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/dashboard" style={styles.link}>
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  content: {
    textAlign: "center",
    color: "white",
  },
  title: {
    fontSize: "96px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  subtitle: {
    fontSize: "32px",
    fontWeight: "600",
    marginBottom: "16px",
  },
  text: {
    fontSize: "18px",
    marginBottom: "32px",
    opacity: 0.9,
  },
  link: {
    display: "inline-block",
    backgroundColor: "white",
    color: "#667eea",
    padding: "12px 32px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.2s",
  },
};
