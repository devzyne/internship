import React, { useEffect, useState, useRef } from "react";
import {
  validateAddress,
  validateCompanyname,
  validateEmail,
  validatePhone,
  validatePostalCode,
  validateName,
  validateRegNo,
  validateCompanyWeight,
  validateURL,
} from "../../../utils/validationUtils";
import { useHistory } from "react-router-dom";
import { BasePath } from "../../../globals/serviceURLs";
import { authPost, get, post } from "../../../api/api";
import { companyType } from "../../../globals/applicationConstants";
import AddCompany from "./addCompany";

function AddComp() {
  const [comp, setComp] = useState({
    countryList: [],
    cityList: [],
    ind: [],
    a1: "",
    a2: "",
    ca1: "",
    ca2: "",
    cactid: "",
    capc: "",
    cccde: "",
    ceml: "",
    cnme: "",
    cno: "",
    cown: "",
    ctid: "",
    ctyp: true,
    eml: "",
    isdCode: "",
    mcid: "",
    nme: "",
    pc: "",
    phone: "",
    rno: "",
    snme: "",
    syn: "",
    web: "",
    wt: "",
    coid: "",
    errors: false,
    loading: false,
  });

  const [error, setError] = useState({
    Ea1: "",
    Ea2: "",
    Eca1: "",
    Eca2: "",
    Ecactid: "",
    Ecapc: "",
    Ecccde: "",
    Eceml: "",
    Ecnme: "",
    Ecno: "",
    Ecown: "",
    Ectid: "",
    Ectyp: "",
    Eeml: "",
    EisdCode: "",
    Emcid: "",
    Enme: "",
    Epc: "",
    Ephone: "",
    Erno: "",
    Esnme: "",
    Esyn: "",
    Eweb: "",
    Ewt: "",
    Eind: "",
  });

  useEffect(() => {
    const path = "/loc/allco";
    get(BasePath, path, {}).then((res) => {
      setComp({ ...comp, countryList: res });
    });
  }, []);

  const history = useHistory();
  const uid = localStorage.userId;
  const token = localStorage.AccessToken;

  const handleCompanyType = (e) => {
    setComp({ ...comp, ctyp: !comp.ctyp });
  };

  const handleCompanyName = (e) => {
    const valid = validateCompanyname(e.target.value);
    if (valid) {
      setComp({ ...comp, nme: e.target.value });
      setError({ ...error, Enme: "" });
    } else {
      setError({ ...error, Enme: "Invalid Company Name" });
    }
  };

  const handleSimpleName = (e) => {
    const valid = validateName(e.target.value);
    if (valid) {
      setComp({ ...comp, snme: e.target.value });
      setError({ ...error, Esnme: "" });
    } else {
      setError({ ...error, Esnme: "Invalid name" });
    }
  };

  const handleRegNo = (e) => {
    const valid = validateRegNo(e.target.value);
    if (valid) {
      setComp({ ...comp, rno: e.target.value });
      setError({ ...error, Erno: "" });
    } else {
      setError({ ...error, Erno: "Invalid registration no" });
    }
  };

  const handleEmail = (e) => {
    const valid = validateEmail(e.target.value);
    if (valid) {
      setComp({ ...comp, eml: e.target.value });
      setError({ ...error, Eeml: "" });
    } else {
      setError({ ...error, Eeml: "Invalid email" });
    }
  };

  const handleWebsite = (e) => {
    const valid = validateURL(e.target.value);
    if (valid) {
      setComp({ ...comp, web: e.target.value });
      setError({ ...error, Eweb: "" });
    } else {
      setError({ ...error, Eweb: "Invalid URL" });
    }
  };

  const handleContact = (e) => {
    const valid = validatePhone(e.target.value);
    if (valid) {
      setComp({ ...comp, phone: e.target.value });
      setError({ ...error, Ephone: "" });
    } else {
      setError({ ...error, Ephone: "Invalid Contact Number" });
    }
  };

  const handleOwner = (e) => {
    const valid = validateName(e.target.value);
    if (valid) {
      setComp({ ...comp, cown: e.target.value });
      setError({ ...error, Ecown: "" });
    } else {
      setError({ ...error, Ecown: "Invalid name" });
    }
  };

  const handleMiniqid = (e) => {
    const valid = e.target.value;
    if (valid) {
      setComp({ ...comp, mcid: e.target.value });
      setError({ ...error, Emcid: "" });
    } else {
      setError({ ...error, Emcid: "Invalid miniq id" });
    }
  };

  const handleCName = (e) => {
    const valid = validateName(e.target.value);
    if (valid) {
      setComp({ ...comp, cnme: e.target.value });
      setError({ ...error, Ecnme: "" });
    } else {
      setError({ ...error, Ecnme: "Invalid name" });
    }
  };

  const handleCEmail = (e) => {
    const valid = validateEmail(e.target.value);
    if (valid) {
      setComp({ ...comp, ceml: e.target.value });
      setError({ ...error, Eceml: "" });
    } else {
      setError({ ...error, Eceml: "Invalid email" });
    }
  };

  const handleIsdCode = (e) => {
    setComp({ ...comp, isdCode: e.target.value });
  };

  const handleCIsdCode = (e) => {
    setComp({ ...comp, cccde: e.target.value });
  };

  const handleAdd1 = (e) => {
    const valid = validateAddress(e.target.value);
    if (valid) {
      setComp({ ...comp, a1: e.target.value });
      setError({ ...error, Ea1: "" });
    } else {
      setError({ ...error, Ea1: "Invalid address" });
    }
  };

  const handleAdd2 = (e) => {
    const valid = validateAddress(e.target.value);
    if (valid) {
      setComp({ ...comp, a2: e.target.value });
      setError({ ...error, Ea2: "" });
    } else {
      setError({ ...error, Ea2: "Invalid address" });
    }
  };

  const handleCAdd1 = (e) => {
    const valid = validateAddress(e.target.value);
    if (valid) {
      setComp({ ...comp, ca1: e.target.value });
      setError({ ...error, Eca1: "" });
    } else {
      setError({ ...error, Eca1: "Invalid address" });
    }
  };

  const handleCAdd2 = (e) => {
    const valid = validateAddress(e.target.value);
    if (valid) {
      setComp({ ...comp, ca2: e.target.value });
      setError({ ...error, Eca2: "" });
    } else {
      setError({ ...error, Eca2: "Invalid address" });
    }
  };

  const handleCity = (e) => {
    setComp({ ...comp, ctid: e.target.value });
  };

  const handleCCity = (e) => {
    setComp({ ...comp, cactid: e.target.value });
  };

  const handleCountry = (e) => {
    let list = [];
    for (let i = 0; i < comp.countryList.length; i++) {
      if (comp.countryList[i].coid == e.target.value) {
        setComp({
          ...comp,
          cityList: comp.countryList[i].cts,
          coid: e.target.value,
        });
      }
    }
  };

  const handlePincode = (e) => {
    const valid = validatePostalCode(e.target.value);
    if (valid) {
      setComp({ ...comp, pc: e.target.value });
      setError({ ...error, Epc: "" });
    } else {
      setError({ ...error, Epc: "Invalid pincode" });
    }
  };

  const handleCPincode = (e) => {
    const valid = validatePostalCode(e.target.value);
    if (valid) {
      setComp({ ...comp, capc: e.target.value });
      setError({ ...error, Ecapc: "" });
    } else {
      setError({ ...error, Ecapc: "Invalid pincode" });
    }
  };

  const handleCContact = (e) => {
    const valid = validatePhone(e.target.value);
    if (valid) {
      setComp({ ...comp, cno: e.target.value });
      setError({ ...error, Ecno: "" });
    } else {
      setError({ ...error, Ecno: "Invalid Contact Number" });
    }
  };

  const handleSubmit = (e) => {
    let valid = true;
    e.preventDefault();
    Object.entries(error).map((err) => {
      if (err[1] !== "") {
        valid = false;
      }
    });
    console.log(valid);
    if (!valid) {
      setComp({ ...comp, errors: !valid, loading: false });
    } else if (!comp.ind[0]) {
      setComp({ ...comp, errors: valid, loading: false });
      setError({ ...error, Eind: "Required" });
    } else {
      setComp({ ...comp, errors: !valid, loading: true });
      const path = "/company/add";
      const params = {
        a1: comp.a1,
        a2: comp.a2,
        ca1: comp.ca1,
        ca2: comp.ca2,
        cactid: comp.cactid,
        capc: comp.capc,
        cccde: comp.cccde,
        ceml: comp.ceml,
        cnme: comp.cnme,
        cno: comp.cno,
        cown: comp.cown,
        ctid: comp.ctid,
        ctyp: comp.ctyp ? companyType.Customer : companyType.Partner,
        eml: comp.eml,
        isdCode: comp.isdCode,
        mcid: comp.mcid,
        nme: comp.nme,
        pc: comp.pc,
        phone: comp.phone,
        rno: comp.rno,
        snme: comp.snme,
        syn: comp.syn,
        web: comp.web,
        wt: comp.wt,
        is1: comp.ind[0],
        is2: comp.ind[1] ? comp.ind[1] : null,
        is3: comp.ind[2] ? comp.ind[2] : null,
        is4: comp.ind[3] ? comp.ind[3] : null,
        is5: comp.ind[4] ? comp.ind[4] : null,
      };
      console.log(params);
      authPost(BasePath, path, params, token)
        .then((res) => {
          setComp({ ...comp, loading: false });
          if (res) {
            history.push("/company/view");
          }
        })
        .catch((err) => {
          console.log(err);
          setComp({ ...comp, loading: false });
        });
    }
    // setComp({ ...comp, loading: false });
  };

  const handleWeight = (e) => {
    const valid = validateCompanyWeight(e.target.value);
    if (valid) {
      setComp({ ...comp, wt: e.target.value });
      setError({ ...error, Ewt: "" });
    } else {
      setError({ ...error, Ewt: "Invalid weight" });
    }
  };

  const handleSynopsis = (e) => {
    setComp({ ...comp, syn: e.target.value });
  };

  const handleInd = (e, i) => {
    let list = comp.ind;
    const valid = comp.ind.includes(e.target.value);
    if (!valid) {
      list[i] = e.target.value;
      setComp({ ...comp, ind: list });
      setError({ ...error, Eind: "" });
    } else {
      setError({ ...error, Eind: "All must be different" });
    }
  };

  return (
    <AddCompany
      {...comp}
      {...error}
      country
      handleCompanyName={handleCompanyName}
      handleSimpleName={handleSimpleName}
      handleRegNo={handleRegNo}
      handleMiniqid={handleMiniqid}
      handleEmail={handleEmail}
      handleWebsite={handleWebsite}
      handleIsdCode={handleIsdCode}
      handleCIsdCode={handleCIsdCode}
      handleCName={handleCName}
      handleCEmail={handleCEmail}
      handleContact={handleContact}
      handleCContact={handleCContact}
      handleOwner={handleOwner}
      handleAdd1={handleAdd1}
      handleAdd2={handleAdd2}
      handleCAdd1={handleCAdd1}
      handleCAdd2={handleCAdd2}
      handleCity={handleCity}
      handleCCity={handleCCity}
      handleCountry={handleCountry}
      handlePincode={handlePincode}
      handleCPincode={handleCPincode}
      handleSubmit={handleSubmit}
      handleCompanyType={handleCompanyType}
      handleWeight={handleWeight}
      handleSynopsis={handleSynopsis}
      handleInd={handleInd}
    />
  );
}

export default AddComp;
