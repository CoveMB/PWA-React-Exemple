import React, { useRef } from 'react';
import { Form } from 'semantic-ui-react';
import { Div, Button } from './SingleInputFormStyle';

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
          <label htmlFor={name}>{label}</label>
          <Div>
            <input
              name={name}
              placeholder={element}
              ref={inputRef}
            />

            <Button type="submit" />
          </Div>
        </Form.Field>


      </Form>

    </>

  );

};

export default SingleInputForm;
