import React, { Component } from "react";
import { get, post } from "../../api/api";
import { Redirect } from "react-router-dom";
import {
  validateName,
  validateEmail,
  validateUsername,
  validatePhone,
} from "../../utils/validationUtils";
import GigSignup from "./gigSignup";
import { UserType, Category } from "../../globals/applicationConstants";
import "../customer/customerSignup/signup.css";
import { BasePath } from "../../globals/serviceURLs";

const token = localStorage.AccessToken;
export class GigSign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: UserType.partnerAdmin,
      loading: false,
      countryCode: "46",
      contact: "",
      name: "",
      email: "",
      username: "",
      isUsernameAvailable: "",
      companyName: "",
      category: "",
      catId: "",
      service: "",
      company: null,
      companyList: [],
      suggestions: [],
      country: "",
      countryList: [],
      cityList: [],
      city: "",
      cityid: "",
      countryId: "",
      errorExists: false,
      signupSuccess: false,
      pageError: "",
      relocation: false,
      startDate: "",
      endDate: "",
      rate: "",
      desc: "",
      error: {
        contactError: "",
        nameError: "",
        emailError: "",
        companyNameError: "",
        departmentError: "",
        usernameError: "",
      },
    };
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleContactChange = this.handleContactChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleUsernameValidate = this.handleUsernameValidate.bind(this);
    this.handleCompanyName = this.handleCompanyName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLocate = this.handleLocate.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
  }

  componentDidMount() {
    let path = "/loc/allco";

    get(BasePath, path, {}).then((res) => {
      this.setState({
        countryList: res,
      });
    });
  }

  handleCity(e) {
    console.log(e.target.value);
    let cityname = "";
    for (let i = 0; i < this.state.cityList.length; i++) {
      if (e.target.value == this.state.cityList[i].ctid) {
        console.log(this.state.cityList[i].ctid);
        cityname = this.state.cityList[i].nme;
        break;
      }
    }
    this.setState({ city: cityname, cityid: e.target.value });
  }

  handleCountry(e) {
    console.log(e.target.value);
    let list = [];
    for (let i = 0; i < this.state.countryList.length; i++) {
      if (this.state.countryList[i].coid == e.target.value) {
        list = this.state.countryList[i].cts;
      }
    }
    console.log(list);
    this.setState({
      cityList: list,
      countryId: e.target.value,
      city: "",
      cityid: -1,
    });
  }

  handleCodeChange(e) {
    this.setState({
      countryCode: e.target.value.trim(),
    });
  }

  handleContactChange(e) {
    this.setState({
      contact: e.target.value.trim(),
      error: {
        ...this.state.error,
        contactError: validatePhone(e.target.value.trim())
          ? ""
          : "Provide a valid phone number",
      },
    });
  }

  handleLocate(e) {
    if (e.target.name === "yes") {
      this.setState({ relocation: true });
    } else {
      this.setState({ relocation: false });
    }
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
    const valid = validateName(e.target.value.trim());
    if (!valid) {
      this.setState({
        error: {
          ...this.state.error,
          nameError: "Provide a valid name",
        },
      });
    } else {
      this.setState({
        error: {
          ...this.state.error,
          nameError: "",
        },
      });
    }
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value.trim(),
    });
    const valid = validateEmail(e.target.value.trim());
    if (!valid) {
      this.setState({
        error: {
          ...this.state.error,
          emailError: "Provide a valid email address",
        },
      });
    } else {
      this.setState({
        error: {
          ...this.state.error,
          emailError: "",
        },
      });
    }
  }

  handleUsernameValidate(input) {
    const path = `/login/unmeavail`;
    const config = {
      unme: input,
    };

    get(BasePath, path, config).then((res) => {
      this.setState({
        isUsernameAvailable: res.isAvail,
      });
    });
  }

  handleUsername(e) {
    this.setState({
      username: e.target.value.trim(),
    });
    const valid = validateUsername(e.target.value.trim());
    if (valid) {
      this.setState({
        error: {
          ...this.state.error,
          usernameError: "",
        },
      });
      this.handleUsernameValidate(e.target.value.trim());
    }
  }

  setSuggestions(typedCompanyName, companiesList) {
    const suggestions = [];
    var error = "";
    if (typedCompanyName && companiesList && companiesList.length > 0) {
      typedCompanyName = typedCompanyName.toLowerCase();
      for (let i in companiesList) {
        if (companiesList[i].nme.toLowerCase().includes(typedCompanyName)) {
          suggestions.push(companiesList[i]);
        }
      }
    } else {
      error = "Provide a valid Company Name";
    }
    this.setState({
      companyList: companiesList,
      suggestions: suggestions,
      error: {
        ...this.state.error,
        companyNameError: error,
      },
    });
  }

  handleCompanyName(e) {
    var companyNameTyped = e.target.value;
    this.setState({
      companyName: companyNameTyped,
    });
    companyNameTyped = companyNameTyped.trim();

    if (companyNameTyped.length === 3) {
      const path = `/cmpny/bynme`;
      const config = {
        nme: companyNameTyped,
        utyp: this.state.userType,
      };
      get(BasePath, path, config)
        .then((res) => {
          if (res.length === 0) {
            this.setState({
              companyList: [],
              suggestions: [],
              error: {
                ...this.state.error,
                companyError: "Provide a valid Compnay name",
              },
            });
          } else if (res.length > 0) {
            this.setSuggestions(companyNameTyped, res);
          } else {
            this.setState({
              companyList: [],
              suggestions: [],
              error: {
                ...this.state.error,
                companyError: "",
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (companyNameTyped.length < 3) {
      this.setState({ suggestions: [] });
    } else {
      this.setSuggestions(companyNameTyped, this.state.companyList);
    }
  }

  companyExists = () => {
    const companyNameTyped = this.state.companyName.trim().toLowerCase();
    const companiesList = this.state.companyList;
    if (companiesList) {
      for (let i in companiesList) {
        if (companiesList[i].nme.toLowerCase() === companyNameTyped) {
          this.setSuggestions([]);
          return i;
        }
      }
    }
    return -1;
  };

  handleReset(value) {
    this.setState({
      ...this.state,
      company: value,
      companyName: value.nme,
      suggestions: [],
      error: {
        ...this.state.error,
        companyNameError: "",
      },
    });
  }

  handleCategory(e) {
    let catid = "";
    Object.entries(Category).map((key) => {
      if (e.target.value === key[1].name) {
        catid = key[1].value;
      }
    });
    this.setState({ category: e.target.value, catId: catid });
  }

  handleSubmit(e) {
    this.setState({
      loading: true,
    });
    e.preventDefault();

    const companyIndex = this.companyExists();

    const nameError =
      this.state.name.trim().length === 0 ||
      this.state.error.nameError.length > 0
        ? "Provide a valid name"
        : "";
    const emailError =
      this.state.email.length === 0 || this.state.error.emailError.length > 0
        ? "Provide a valid email"
        : "";
    const contactError =
      this.state.contact.length === 0 ||
      this.state.error.contactError.length > 0
        ? "Provide a valid Contact Number"
        : "";
    const companyNameError =
      companyIndex < 0 || this.state.error.companyNameError.length > 0
        ? "Provide a valid Company Name"
        : "";
    const usernameError =
      !this.state.isUsernameAvailable ||
      this.state.username.length === 0 ||
      this.state.error.usernameError.length > 0
        ? "Provide a Valid Username"
        : "";
    const error =
      usernameError.length > 0 ||
      companyNameError.length > 0 ||
      contactError.length > 0 ||
      emailError.length > 0 ||
      nameError.length > 0;
    this.setState({
      errorExists: error,
      error: {
        ...this.state.error,
        nameError: nameError,
        emailError: emailError,
        contactError: contactError,
        companyNameError: companyNameError,
        usernameError: usernameError,
      },
    });
    if (!error) {
      const path = "/usr/signup";
      let data = {
        nme: this.state.name.trim(),
        utyp: this.state.userType.toString(),
        eml: this.state.email,
        ph: this.state.contact,
        ccde: parseInt(this.state.countryCode),
        unme: this.state.username,
      };
      if (this.state.userType != UserType.freelancer) {
        data = {
          ...data,
          cid: this.state.companyList[companyIndex].cid,
        };
      }
      if (this.state.userType != UserType.partnerAdmin) {
        data = {
          ...data,
          sd: this.state.startDate,
          ed: this.state.endDate,
          cat: this.state.catId,
          cr: this.state.relocation,
          ift: this.state.service == "Full Time" ? true : false,
          ctid: this.state.cityid,
          ct: this.state.city,
          coid: this.state.countryId,
          cmts: this.state.desc,
        };
      }

      //todo add params for manager
      post(BasePath, path, data)
        .then((res) => {
          if (res.uid) {
            this.setState({
              signupSuccess: true,
            });
            localStorage.clear();
            this.props.history.push("/login?fromPage=signup");
          }
        })
        .catch((e) => {
          this.setState({
            signupSuccess: false,
            pageError: e.err,
            loading: false,
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  handleCheck = (e) => {
    this.setState({
      userType: e.target.value,
    });
  };

  render() {
    return (
      <GigSignup
        {...this.state}
        handleCodeChange={this.handleCodeChange}
        handleContactChange={this.handleContactChange}
        handleNameChange={this.handleNameChange}
        handleEmail={this.handleEmail}
        handleUsername={this.handleUsername}
        handleUsernameValidate={this.handleUsernameValidate}
        handleCompanyName={this.handleCompanyName}
        handleSubmit={this.handleSubmit}
        handleReset={(value) => this.handleReset(value)}
        handleCheck={this.handleCheck}
        handleCategory={this.handleCategory}
        handleService={(e) => this.setState({ service: e.target.value })}
        handleCountry={this.handleCountry}
        handleCity={this.handleCity}
        handleLocate={this.handleLocate}
        handleStartDate={(e) => this.setState({ startDate: e.target.value })}
        handleEndDate={(e) => this.setState({ endDate: e.target.value })}
        handleRate={(e) => this.setState({ rate: e.target.value })}
        handleDesc={(e) => this.setState({ desc: e.target.value })}
      />
    );
  }
}

export default GigSign;
