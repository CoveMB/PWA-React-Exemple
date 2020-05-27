import React, { useRef } from 'react';
import styled from 'styled-components';
import { Form } from 'semantic-ui-react';
import { button } from '../Style/button';

export const Div = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch
`;

export const SubmitButton = styled.input`
  ${button}
  margin-left: 10px;
`;

const SingleInputForm = ({
  element, setElement, label, name
}) => {

  const inputRef = useRef();

  const handleSubmit = (event) => {

    event.preventDefault();
    setElement(inputRef.current.value);

  };

  return (
    <>

      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Div>
            <label htmlFor={name}>{label}</label>
            <input
              name={name}
              placeholder={element}
              ref={inputRef}
            />

            <SubmitButton type="submit" />
          </Div>
        </Form.Field>


      </Form>

    </>

  );

};

export default SingleInputForm;
