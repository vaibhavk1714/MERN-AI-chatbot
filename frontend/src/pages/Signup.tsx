import { Box, Typography, Button } from "@mui/material"
import { IoLogIn } from 'react-icons/io5';
import CustomInput from "../components/shared/CustomInput"
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            toast.loading("Signing up...", { id: "signup" });
            await auth?.signup(name, email, password);
            toast.success("Signed up Successfully...", { id: "signup" });
        } catch (error) {
            console.log(error);
            toast.error("Signup Failed...", { id: "signup" });
        }
    }

    useEffect(() => {
        if (auth?.user) {
            return navigate("/chat");
        }
    }, [auth])

    return (
        <Box width={"100%"} height={"100%"} display="flex" flex={1}>
            <Box
                padding={6}
                mt={2}
                display={{
                    md: "flex",
                    sm: "none",
                    xs: "none"
                }}
            >
                <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
            </Box>
            <Box
                display={'flex'}
                flex={{
                    xs: 1,
                    md: 0.5
                }}
                justifyContent={'center'}
                alignItems={'center'}
                padding={1}
                ml={"auto"}
                mr={12}
            >
                <form
                    onSubmit={handleSubmit}
                    style={{
                        margin: "auto",
                        padding: "30px",
                        boxShadow: "10px 10px 20px #000",
                        borderRadius: "10px",
                        border: "none",
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                    >
                        <Typography
                            variant="h4"
                            textAlign={'center'}
                            padding={2}
                            fontWeight={600}
                        >
                            Signup
                        </Typography>
                        <CustomInput name="name" label="Name" type="text" />
                        <CustomInput name="email" label="Email" type="email" />
                        <CustomInput name="password" label="Password" type="password" />
                        <Button
                            type="submit"
                            sx={{
                                px: 2,
                                py: 1,
                                mt: 2,
                                width: "400px",
                                borderRadius: 2,
                                bgcolor: "#00fffc",
                                ":hover": {
                                    bgcolor: "white",
                                    color: "black"
                                },
                            }}
                            endIcon={<IoLogIn />}
                        >
                            Signup
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>

    )
}

export default Signup