// emails/WelcomeEmail.jsx
import ReactDOMServer from "react-dom/server";
import { Html, Head, Preview, Body, Container, Text, Button } from "@react-email/components";


export const WelcomeEmail = ({ name, message }) => (
  <Html>
    <Head />
    <Preview>New message from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={heading}>Hi {name} 👋</Text>
        <Text>{message}</Text>
        <Button href="https://yourwebsite.com" style={button}>
          Visit Website
        </Button>
      </Container>
    </Body>
  </Html>
);

const main = { backgroundColor: "#f6f9fc", padding: "20px" };
const container = { backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px" };
const heading = { fontSize: "18px", fontWeight: "bold" };
const button = {
  backgroundColor: "#007BFF",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "6px",
  textDecoration: "none",
};
