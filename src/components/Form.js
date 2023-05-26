import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getCinema, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const cinema = ref.current;

      cinema.nomeCinema.value = onEdit.nomeCinema;
      cinema.enderecoCinema.value = onEdit.enderecoCinema;
      cinema.contatoCinema.value = onEdit.contatoCinema;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cinema = ref.current;

    if (
      !cinema.nomeCinema.value ||
      !cinema.enderecoCinema.value ||
      !cinema.contatoCinema.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.idCinema, {
          nomeCinema: cinema.nomeCinema.value,
          enderecoCinema: cinema.enderecoCinema.value,
          contatoCinema: cinema.contatoCinema.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nomeCinema: cinema.nomeCinema.value,
          enderecoCinema: cinema.enderecoCinema.value,
          contatoCinema: cinema.contatoCinema.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    cinema.nomeCinema.value = "";
    cinema.enderecoCinema.value = "";
    cinema.contatoCinema.value = "";

    setOnEdit(null);
    getCinema();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nomeCinema" />
      </InputArea>
      <InputArea>
        <Label>Endereço</Label>
        <Input name="enderecoCinema" />
      </InputArea>
      <InputArea>
        <Label>Contato</Label>
        <Input name="contatoCinema" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
