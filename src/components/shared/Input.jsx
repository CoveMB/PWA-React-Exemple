import React, { useRef } from 'react';
import { Form, Button } from 'semantic-ui-react';

const Input = (props) => {

  const { searchedMovie, setSearchedMovie, label } = props;
  const inputRef = useRef();

  const handleSubmit = (event) => {

    event.preventDefault();
    setSearchedMovie(inputRef.current.value);

  };

  return (
    <>

      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>
            {label}
            <input
              placeholder={searchedMovie}
              ref={inputRef}
            />
          </label>
        </Form.Field>

        <Button type="submit"> Submit </Button>
      </Form>

    </>

  );

};

export default Input;
