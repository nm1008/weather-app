import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  console.log(input);

  return (
    <div className="App">
      <h1>classy weather</h1>
      <Input setInput={setInput} input={input} />
    </div>
  );
}

function Input({ input, setInput }) {
  return (
    <>
      <input
        type="text"
        placeholder="Search from location"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </>
  );
}

export default App;
