import Nav from "./Nav";
import Header from "./Header";

import Popular from "./Popular";
import Recent from "./Recent";

function Home() {
    return (
        <div className="app">
            <Nav showSearch={true}/>
            <Header />
            <div class="recommendations">
                <Popular />
                <Recent />
            </div>
        </div>
    )
}

export default Home
