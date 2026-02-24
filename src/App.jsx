import "./App.css";
import Nav from "./nav";
import Home from "./home";
import Section1 from "./section";
import Contact from "./contact";


export default function App() {

  return (
    <>
      <Nav />
      <Home />
      <Section1 data="mobile" />
      <Section1 data="laptop" />
      <Section1 data="monitor" />
      <Section1 data="headphones" />
      <Contact />
    </>
  );
}
