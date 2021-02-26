import React from "react";

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "All",
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage: selectedLanguage,
    });
  }

  render() {
    const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];

    return (
      <ul className="flex-center">
        {languages.map((lang) => (
          <li key={lang}>
            <button
              className="btn-clear nav-link"
              style={
                lang === this.state.selectedLanguage
                  ? { color: "rgb(255, 0, 255)" }
                  : null
              }
              onClick={() => this.updateLanguage(lang)}
            >
              {lang}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
