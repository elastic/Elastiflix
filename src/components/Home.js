import Nav from "./Nav";
import Header from "./Header";

import Popular from "./Popular";
import Recent from "./Recent";

function Home() {
    return (
        <div className="app">
            <Nav showSearch={true} fixed={true}/>
            <Header />
            <div className="recommendations">
                <Popular />
                <Recent />
            </div>
        </div>
    )
}

export default Home
