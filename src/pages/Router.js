import {Route, Routes} from "react-router-dom";
import Main from "./Main";
import Signup from "./account/Signup";
import Login from "./account/Login";

export default function Router() {
    return (
        <Routes>
            <Route exact path="/" element={<Main />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/payments" element={<Main/>}></Route>
            <Route path="/mypage" element={<Main/>}></Route>
            <Route path="/gifticon/add" element={<Main/>}></Route>
            <Route path="/user/my-gifticon" element={<Main/>}></Route>
            <Route path="/carts" element={<Main/>}></Route>
            <Route path="/payment/checkout" element={<Main/>}></Route>
        </Routes>
    );
}