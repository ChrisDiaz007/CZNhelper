import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <header className="dashboard">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-5">
        <div className="flex items-center justify-between gap-2">
          <Link to="/">CZN Helper</Link>
          <nav className="flex items-center gap-6 sm:gap-3 md:gap-4 lg:gap-6 text-sm">
            <Link to="/">Home</Link>
            <Link to="/guides">Guides</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Dashboard;
