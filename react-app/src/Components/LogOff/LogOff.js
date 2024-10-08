import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

const LogOff = ({ setUser }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const showModal = () => {
        setOpen(true);
    };

    useEffect(() => {
        showModal();
    }, []);

    const logOff = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: "POST",
        };
        return await fetch("api/account/logoff", requestOptions).then((response) => {
            if (response.status === 200) {
                setUser({ isAuthenticated: false, userName: "" });
                navigate("/");
            } else if (response.status === 401) {
                navigate("/login");
            }
            setOpen(false);
        });
    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setOpen(false);
        navigate("/");
    };

    return (
        <>
            <Modal title="Подтверждение выхода" open={open} onOk={logOff} onCancel={handleCancel}>
                <p>Вы действительно хотите выйти?</p>
            </Modal>
        </>
    );
};

export default LogOff;