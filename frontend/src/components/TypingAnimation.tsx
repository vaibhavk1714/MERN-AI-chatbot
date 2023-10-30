import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
    return (
        <TypeAnimation
            sequence={[
                "Chat With Your OWN AI",
                1000,
                "Built With OPENAI",
                2000,
                "Your Own Customized Chat-GPT",
                1500
            ]}
            speed={50}
            style={{
                fontSize: '60px',
                color: 'white',
                display: 'inline-block',
                textShadow: '1px 1px 20px #000',
            }}
            repeat={Infinity}
        />
    )
}

export default TypingAnimation