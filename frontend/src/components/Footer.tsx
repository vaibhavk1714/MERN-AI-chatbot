import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer>
            <div
                style={{
                    width: "100%",
                    paddingTop: 20,
                    minHeight: "20vh",
                    maxHeight: "30vh",
                    marginTop: 50
                }}
            >
                <p style={{ fontSize: '30px', textAlign: 'center' }}>
                    Built by<Link style={{ color: 'white' }} className="nav-link" to={"https://www.linkedin.com/in/vaibhav-kanthi/"}>Vaibhav Kanthi</Link> <br />
                    <span className="copyright">©Copyright 2023</span>
                </p>
            </div>
        </footer>
    )
}

export default Footer