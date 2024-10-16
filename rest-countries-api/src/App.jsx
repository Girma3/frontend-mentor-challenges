import { useEffect } from "react";
import Card from "./components/Card";
import Form from "./components/Form";
import Header from "./components/Header";
import Detail from "./components/Detail-Page";

function App() {
  //   useEffect(function(){
  //     const url =

  // },[])
  return (
    <>
      <Header />
      <main>
        {/* <Form /> */}
        {/* <Card /> */}
        <Detail />
      </main>
    </>
  );
}

export default App;
