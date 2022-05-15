import { Provider } from "react-redux";

import RoutesWrapper from "./routes";
import "./App.css";
import store from "./Pages/Redux";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <RoutesWrapper />
        </Provider>
    );
};

export default App;
