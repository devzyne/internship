import React from "react";
import Form from "react-bootstrap/Form";

function CurrencyOptions({
  className,
  currencyList,
  onCurrencySelection,
  selectedCurrency,
}) {
  const getCurrencies = () => {
    if (currencyList) {
      return currencyList.map((i) =>
        selectedCurrency !== i ? <option key={i}>{i}</option> : ""
      );
    }
  };

  const onCurrencyChanged = (newCurrency) => {
    if (onCurrencySelection) {
      onCurrencySelection(newCurrency);
    }
  };

  return (
    <>
      {currencyList ? (
        <Form.Group className={className}>
          <Form.Control
            as="select"
            onChange={(e) => onCurrencyChanged(e.target.value)}
          >
            <option>{selectedCurrency}</option>
            {getCurrencies()}
          </Form.Control>
        </Form.Group>
      ) : (
        ""
      )}
    </>
  );
}

export default CurrencyOptions;
