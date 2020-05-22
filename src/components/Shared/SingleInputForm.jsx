import React, { useRef } from 'react';
import { Form, Button } from 'semantic-ui-react';

const SingleInputForm = (props) => {

  const { element, setElement, label } = props;
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
          <label>
            {label}
            <input
              placeholder={element}
              ref={inputRef}
            />
          </label>
        </Form.Field>

        <Button type="submit"> Submit </Button>
      </Form>

    </>

  );

};

export default SingleInputForm;
