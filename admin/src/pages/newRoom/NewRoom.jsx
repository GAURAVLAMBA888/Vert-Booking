import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import useFetch from "../../Hooks/useFetch";

const NewRoom = () => {
    const [info, setInfo] = useState({});
    const [hotelId, setHotelId] = useState(null);
    const [rooms, setRooms] = useState([]);

    const navigate = useNavigate();
    const { data, loading, error } = useFetch("/hotels?city=");

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const roomNumbers = rooms.split(",").map((room) => {
            return {
                number: room.trim(),
            };
        });
        try {
            await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
            navigate("/rooms");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add New Room</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form>
                            {roomInputs?.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        id={input.id}
                                        type={input.type}
                                        placeholder={input.placeholder}
										onChange={handleChange}
                                    />
                                </div>
                            ))}
                            <div className="formInput">
                                <label>Rooms</label>
                                <textarea
                                    onChange={(e) => setRooms(e.target.value)}
                                    placeholder="give comma between room numbers"
                                />
                            </div>
                            <div className="formInput">
                                <label>Choose a Hotel</label>
                                <select
                                    id="hotelId"
                                    onChange={(e) => setHotelId(e.target.value)}
                                >
                                    {loading ? (
                                        <Loading />
                                    ) : (
                                        data?.map((hotel) => {
                                            return (
                                                <option
                                                    key={hotel._id}
                                                    value={hotel._id}
                                                >
                                                    {hotel.name}
                                                </option>
                                            );
                                        })
                                    )}
                                </select>
                            </div>
                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewRoom;
