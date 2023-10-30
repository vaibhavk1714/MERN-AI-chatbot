import { Avatar, Box, Typography } from "@mui/material"
import { useAuth } from "../context/AuthContext"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

function extractCodeFromString(message: string) {
    if (message.includes("```")) {
        const blocks = message.split("```");
        return blocks;
    }
}

function isCodeBlock(str: string) {
    if (
        str.includes("=") ||
        str.includes(";") ||
        str.includes("{") ||
        str.includes("}") ||
        str.includes("[") ||
        str.includes("]") ||
        str.includes("#") ||
        str.includes("//")
    ) {
        return true;
    }
    return false;
}

const ChatItem = ({ role, content }: { role: string; content: string }) => {

    const auth = useAuth();
    const messageBlocks = extractCodeFromString(content);

    return (
        role === 'assistant' ?
            <>
                <Box sx={{
                    display: 'flex',
                    padding: 2,
                    bgcolor: '#004d5612',
                    my: 2,
                    gap: 2
                }}>
                    <Avatar sx={{
                        ml: 0,
                    }}><img src="openai.png" alt="openai" width="30px" /></Avatar>
                    <Box>
                        {!messageBlocks && (
                            <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
                        )}
                        {messageBlocks &&
                            messageBlocks.length &&
                            messageBlocks.map((block, index) => (isCodeBlock(block) ?
                                <SyntaxHighlighter
                                    key={index}
                                    style={atomDark}
                                    language={block[0]}
                                >
                                    {block}
                                </SyntaxHighlighter> :
                                <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
                            ))}
                    </Box>
                </Box>
            </>
            :
            <>
                <Box sx={{
                    display: 'flex',
                    padding: 2,
                    bgcolor: '#004d56',
                    gap: 2
                }}>
                    <Avatar sx={{
                        ml: 0,
                        bgcolor: 'black',
                        color: 'white'
                    }}>
                        {auth?.user?.name[0]}
                        {auth?.user?.name.split(" ")[1][0]}
                    </Avatar>
                    <Box>
                        {!messageBlocks && (
                            <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
                        )}
                        {messageBlocks &&
                            messageBlocks.length &&
                            messageBlocks.map((block, index) => (isCodeBlock(block) ?
                                <SyntaxHighlighter
                                    key={index}
                                    style={atomDark}
                                    language={block[0]}
                                >
                                    {block}
                                </SyntaxHighlighter> :
                                <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
                            ))}
                    </Box>
                </Box>
            </>
    )
}

export default ChatItem