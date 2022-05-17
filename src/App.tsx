import Redux from "./Redux";
import RoutesWrapper from "./routes";
import "./App.css";

const App: React.FC = () => {
    return (
        <Redux>
            <RoutesWrapper />
        </Redux>
    );
};

export default App;
