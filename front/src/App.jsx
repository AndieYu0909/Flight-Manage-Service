import { Home, UpdateFlight, Error, AddFlightInfo} from "./pages";
import { AppNav } from "./features";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { Content } from "./components/Background";

const App = () => {
  
    return (

            <BrowserRouter>
                <AppNav />
                    <Routes>
                        {<Route path="/" element={<Home />} />}
                        {<Route path="/AddFlightInfos" element={<AddFlightInfo />} />}
                        {<Route path="/UpdateFlight" element={<UpdateFlight />} />}
                        {<Route path="*" element={<Error />} />}

                    </Routes>
            </BrowserRouter>
    );
}

export default App;