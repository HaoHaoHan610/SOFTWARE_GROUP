import Masterlayout from "./pages/users/theme/masterlayout";
import { Routers } from "./utils/router";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/users/Homepage/index";


const renderUserRouter = () => {
    const userRouters = [
        {
            path: Routers.user.Home,
            Component: <Homepage />
        },
    ]
    return (
        <Masterlayout>
            <Routes>
                {
                    // eslint-disable-next-line array-callback-return
                    userRouters.map((item, key) => (
                        <Route key={key} path={item.path} element={item.Component} />
                    ))}
            </Routes>
        </Masterlayout>
    );
};

const RouterCustom = () => {
    return renderUserRouter();
};
export default RouterCustom;