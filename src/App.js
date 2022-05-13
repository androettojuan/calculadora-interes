import React, { useState } from "react";
import Container from "./Components/Container/Container";
import Section from "./Components/Section/Section";
import { Formik, Form } from "formik";
import Input from "./Components/Input/Input";
import Button from "./Components/Button/Button";
import Balance from "./Components/Balance/Balance";
import * as Yup from "yup";

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit;
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1);
  }
  return Math.round(total);
};

function App() {
  const [balance, setbalance] = useState("");
  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    console.log("hola");
    const val = compoundInterest(
      Number(deposit),
      Number(contribution),
      Number(years),
      Number(rate)
    );
    setbalance(formatter.format(val));
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: "",
            contribution: "",
            years: "",
            rate: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number()
              .required("Obligatorio")
              .typeError("Debe ser un numero"),
            contribution: Yup.number()
              .required("Obligatorio")
              .typeError("Debe ser un numero"),
            years: Yup.number()
              .required("Obligatorio")
              .typeError("Debe ser un numero"),
            rate: Yup.number()
              .required("Obligatorio")
              .typeError("Debe ser un numero")
              .min(0)
              .max(1),
          })}
        >
          <Form>
            <Input name="deposit" label="Depósito inicial"></Input>
            <Input name="contribution" label="Contribución anual"></Input>
            <Input name="years" label="Años"></Input>
            <Input name="rate" label="Interés estimado"></Input>
            <Button type="submit">Calcular</Button>
          </Form>
        </Formik>
        {balance !== "" ? <Balance>Balance final: {balance}</Balance> : null}
      </Section>
    </Container>
  );
}

export default App;
