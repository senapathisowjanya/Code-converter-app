// src/CodeConverterApp.js
import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import "./App.css"

const App = () => {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const languageConfig = {
    // Add suggestions and auto-fill options for JavaScript
    javascript: {
      suggest: {
        keywords: true,
        snippets: true,
        objects: true,
        variables: true,
        methodNames: true,
      },
      tokens: true,
    },
    python: {
      suggest: {
        keywords: true,
        snippets: true,
        objects: true,
        variables: true,
        methodNames: true,
      },
      tokens: true,
    },
    java: {
      suggest: {
        keywords: true,
        snippets: true,
        objects: true,
        variables: true,
        methodNames: true,
      },
      tokens: true,
    },
    c: {
      suggest: {
        keywords: true,
        snippets: true,
        objects: true,
        variables: true,
        methodNames: true,
      },
      tokens: true,
    },
    "c++": {
      suggest: {
        keywords: true,
        snippets: true,
        objects: true,
        variables: true,
        methodNames: true,
      },
      tokens: true,
    },
  }

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const handleConvert = () => {
    fetch(`https://api.openai.com/v1/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Act like an  Code Translator, Your task is to convert the given code into given programming language: ${selectedLanguage}, and here is the code : ${inputCode} -
`,
        max_tokens: 100,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.choices && data.choices.length > 0) {
          setOutputCode(data.choices[0].text)
          // setAnimationClass('animate');
        } else {
          console.log('No valid choices found in the response.');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDebugger = () => {
    fetch(`https://api.openai.com/v1/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Act like an  Code debugger, Your task is to debug the given code and debug each and every line and give the detailed debug report and here is the code : ${inputCode} -
`,
        max_tokens: 100,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.choices && data.choices.length > 0) {
          setOutputCode(data.choices[0].text)
          // setAnimationClass('animate');
        } else {
          console.log('No valid choices found in the response.');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleQualityCheck = () => {
    fetch(`https://api.openai.com/v1/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Act like an  Code Quality Check, Your task is to Check the quality of the given code, check each and every line and give the detailed report, youe report should include, all necessary quality checks: like code intendation, optimisation and so on.. and here is the code : ${inputCode} -
`,
        max_tokens: 100,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.choices && data.choices.length > 0) {
          setOutputCode(data.choices[0].text)
          // setAnimationClass('animate');
        } else {
          console.log('No valid choices found in the response.');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="container">
      <div className="navbar">
        <center>
          <h2>Code Converter Application</h2>
        </center>
      </div>
      <div className="button-group">
        <select className="language-select" onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="c++">C++</option>
        </select>
        <button className="action-button" onClick={handleConvert}>Convert</button>
        <button className="action-button" onClick={handleDebugger}>Debugger</button>
        <button className="action-button" onClick={handleQualityCheck}>Quality Check</button>
      </div>
      <div className="monaco-box">
        {/* <h3>Input</h3> */}
        <div className="monaco-input">

          <MonacoEditor
            width="800"
            height="400"
            language={selectedLanguage}
            value={inputCode}
            onChange={setInputCode}
            options={languageConfig[selectedLanguage]}
          />
        </div>

        <div className="monaco-output">
          {/* <h3>Output</h3> */}
          <MonacoEditor
            width="800"
            height="400"
            language={selectedLanguage}
            value={outputCode}
            readOnly={true}
            options={languageConfig[selectedLanguage]}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
