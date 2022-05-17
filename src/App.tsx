import { Provider } from "react-redux";

import RoutesWrapper from "./routes";
import "./App.css";
import Redux from "./Redux";

const App: React.FC = () => {
    return (
        <Redux>
            <RoutesWrapper />
        </Redux>
    );
};

export default App;
