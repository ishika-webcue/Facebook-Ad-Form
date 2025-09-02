import React, { useState } from "react";
import "./App.css";

function App() {
  const [adTitles, setAdTitles] = useState([""]);
  const [headlines, setHeadlines] = useState([""]);
  const [longDesc, setLongdesc] = useState([""]);
  const [descriptions, setDescriptions] = useState([""]);
  const [darkMode, setDarkMode] = useState(false);

  const addField = (setter, list) => {
    if (list.length < 4) setter([...list, ""]);
  };

  const handleChange = (setter, list, index, value) => {
    const updated = [...list];
    updated[index] = value;
    setter(updated);
  };

  const removeField = (setter, list, index) => {
    const updated = [...list];
    updated.splice(index, 1);
    setter(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ adTitles, headlines, longDesc, descriptions });
    alert("Form Submitted");
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <div className="container">
      <h1>Facebook Campaign Creator</h1>
      <button type="button" className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Selected Account</label>
          <select>
            <option>Account-1</option>
            <option>Account-2</option>
          </select>
        </div>

        <div className="form-group">
          <label>Business Name</label>
          <input type="text" placeholder="Enter Business Name" />
        </div>

        <div className="form-group">
          <label>Ad Group</label>
          <input type="text" placeholder="Enter Ad Group" />
        </div>

        {[
          { label: "Ad Title", state: adTitles, setter: setAdTitles },
          { label: "Headline", state: headlines, setter: setHeadlines },
          { label: "Long Description", state: longDesc, setter: setLongdesc },
          { label: "Description", state: descriptions, setter: setDescriptions },
        ].map((section, indx) => (
          <div key={indx} className="form-group">
            <label>{section.label}</label>
            {section.state.map((item, idx) => (
              <div key={idx} className="dynamic-input-wrapper">
                <input
                  type="text"
                  className="dynamic-input"
                  value={item}
                  onChange={(e) =>
                    handleChange(section.setter, section.state, idx, e.target.value)
                  }
                  placeholder={`${section.label} ${idx + 1}`}
                />
                {section.state.length > 1 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeField(section.setter, section.state, idx)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="add-more"
              onClick={() => addField(section.setter, section.state)}
              disabled={section.state.length >= 4}
            >
              Add More
            </button>
          </div>
        ))}

        <div className="form-group">
          <label>Upload Image</label>
          <input type="file" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
