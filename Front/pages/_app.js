import "../styles/global.css";
import { AuthProvider } from "../context/AuthContext";
import { LeagueProvider } from "../context/LeagueContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <LeagueProvider>
        <Component {...pageProps} />
      </LeagueProvider>
    </AuthProvider>
  );
}

export default MyApp;
