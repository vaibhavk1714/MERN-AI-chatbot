import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/ChatItem";
import { IoMdSend } from 'react-icons/io';
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
    role: string;
    content: string;
}

const Chat = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [chatMessages, setChatMessages] = useState<Message[]>([]);

    const handleSubmit = async () => {
        const content = inputRef.current?.value as string;

        if (inputRef && inputRef.current) {
            inputRef.current.value = "";
        }

        const newMessage: Message = { role: "user", content }
        setChatMessages((prev) => [...prev, newMessage])
        const chatData = await sendChatRequest(content);
        setChatMessages([...chatData.chats])
    }

    const handleDeleteChats = async () => {
        try {
            toast.loading("Deleting chats...", { id: "deleteChats" })
            await deleteUserChats();
            setChatMessages([]);
            toast.success("Deleted chats successfully", { id: "deleteChats" });
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete chats...", { id: "deleteChats" });
        }
    }

    useLayoutEffect(() => {
        if (auth?.isLoggedIn && auth.user) {
            toast.loading("Loading chats...", { id: 'loadchats' });
            getUserChats().then((data) => {
                setChatMessages([...data.chats]);
                toast.success("Successfully loaded chats", { id: 'loadchats' })
            }).catch(error => {
                console.log(error);
                toast.error("Loading failed", { id: 'loadchats' })
            })
        }
    }, [auth])

    useEffect(() => {
        if (!auth?.user)
            return navigate("/login");
    }, [auth])

    return (
        <Box sx={{
            display: 'flex',
            flex: 1,
            width: '100%',
            height: '100%',
            mt: 3,
            gap: 3
        }}>
            <Box sx={{
                display: { md: 'flex', xs: 'none', sm: 'none' },
                flex: 0.2,
                flexDirection: 'column',
                ml: 2
            }}>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    height: '60vh',
                    bgcolor: "rgb(17, 29, 39)",
                    borderRadius: 5,
                    flexDirection: 'column'
                }}>
                    <Avatar sx={{
                        mx: 'auto',
                        my: 2,
                        bgcolor: 'white',
                        color: 'black',
                        fontWeight: 700
                    }}>
                        {auth?.user?.name[0]}
                        {auth?.user?.name.split(" ")[1][0]}
                    </Avatar>
                    <Typography sx={{
                        mx: 'auto',
                        fontFamily: "work sans"
                    }}>
                        You are talking to a chat-bot
                    </Typography>
                    <Typography sx={{
                        mx: 'auto',
                        my: 4,
                        p: 3,
                        fontFamily: "work sans"
                    }}>
                        You can ask any question related to knowledge, business, advices, education etc.
                        But avoid sharing personal information.
                    </Typography>
                    <Button
                        onClick={handleDeleteChats}
                        sx={{
                            width: '200px',
                            my: 'auto',
                            color: 'white',
                            fontWeight: 700,
                            borderRadius: 3,
                            mx: 'auto',
                            bgcolor: red[300],
                            ":hover": {
                                bgcolor: red.A400,
                            },
                        }}>
                        Clear Conversation
                    </Button>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                flex: { md: 0.8, xs: 1, sm: 1 },
                flexDirection: 'column',
                px: 3,
            }}>
                <Typography sx={{
                    mx: 'auto',
                    fontSize: '40px',
                    color: "white",
                    mb: 2,
                    fontWeight: 600
                }}>
                    Model: GPT-3.5 Turbo
                </Typography>
                <Box sx={{
                    width: '100%',
                    height: '60vh',
                    borderRadius: 3,
                    mx: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'scroll',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    scrollBehaviour: 'smooth'
                }
                }>
                    {chatMessages.map((chat, index) => {
                        return <ChatItem role={chat.role} content={chat.content} key={index} />
                    })}
                </Box>
                <div style={{
                    width: '100%',

                    borderRadius: 8,
                    backgroundColor: 'rgb(17, 27, 39)',
                    display: 'flex',
                    marginRight: 'auto'
                }}>
                    <input
                        type="text"
                        ref={inputRef}
                        style={{
                            width: '100%',
                            backgroundColor: 'transparent',
                            padding: '30px',
                            border: 'none',
                            outline: 'none',
                            color: 'white',
                            fontSize: '17px'
                        }} />
                    <IconButton
                        onClick={handleSubmit}
                        sx={{
                            ml: 'auto',
                            color: 'white',
                            mx: 1
                        }}
                    >
                        <IoMdSend />
                    </IconButton>
                </div>
            </Box>
        </Box >
    )
}

export default Chat