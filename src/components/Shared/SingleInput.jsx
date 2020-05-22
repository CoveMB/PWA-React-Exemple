import React, { useRef } from 'react';
import { Form, Button } from 'semantic-ui-react';

const SingleInput = (props) => {

  const { element, setElement, label } = props;
  const inputRef = useRef();

  const handleChange = (event) => {

    event.preventDefault();
    setElement(inputRef.current.value);

  };

  return (
    <>

      <br />
      <Form>
        <Form.Field onChange={handleChange}>
          <label>
            {label}
            <input
              placeholder={element}
              ref={inputRef}
            />
          </label>
        </Form.Field>
      </Form>
    </>

  );

};

export default SingleInput;
