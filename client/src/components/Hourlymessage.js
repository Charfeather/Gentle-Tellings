import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { FormikProvider, useFormik } from "formik";
import * as yup from 'yup';

function HourlyMessage({ message, user }) {
  const [change, setChange] = useState(false);
  const [id, setId] = useState([]);

  const messageSchema = yup.object().shape({
    content: yup.string().min(5, 'Please write a longer message'),
  });

  const formik = useFormik({
    initialValues: {
      content: '',
      made_by_user_id: user.id,
    },
    validationSchema: messageSchema,
    onSubmit: (values) => {
      const endpoint = '/messages';
      console.log(values);
      fetch(endpoint, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(values),
      }).then((resp) => {
        if (resp.ok) {
          console.log('good response');
          setChange(!change); // Trigger re-render after posting a message
        } else {
          console.log(formik.errors);
        }
      });
      // navigate("/message-list")
    },
  });

  // response form currently doesn't take in the message.id, fix it later
  const respForm = useFormik({
    initialValues: {
      content: '',
      user_id: `${user.id}`,
      message_id: message.id,
    },
    onSubmit: (values) => {
      const endpoint = '/response';
      console.log(message.id);
      console.log(values);
      fetch(endpoint, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(values),
      });
    },
  });

  function handleClick() {
    setChange(!change);
    console.log(change);
  }

  function messageId() {
    console.log(message.id);
    setId(message.id);
  }

  useEffect(() => {
    // This effect will be triggered when `change` is updated
    // You can perform any additional actions after re-rendering here
  }, [change]);

  if (change === false) {
    // adding response
    return (
      <div>
        <div className="neumorph_stone">
          <h1 className="text-3xl font-bold flex justify-center underline">Welcome to Gentle words, here is a message from one of our users</h1>
          <div>
            <h1 onClick={messageId} className="text-2xl font-bold flex justify-center">{message.content}</h1>
          </div>
          {/* <div>
                        <form onSubmit={respForm.handleSubmit} className="flex justify-center">
                            <TextField
                                id='content'
                                label='Leave a response'
                                variant="filled"
                                value={respForm.values.content}
                                onChange={respForm.handleChange}
                                />
                            <Button variant="contained" type="submit" size="large">Send</Button>
                        </form>
                    </div> */}
        </div>
        <div className="flex justify-center">
          <Button variant='outlined' onClick={handleClick}>add a message</Button>
        </div>
      </div>
    );
  } else {
    // adding message
    return (
      <div className="w-1/2">
        <div className="neumorph_stone">
          <h1 className="text-3xl font-bold flex justify-center">Write something!</h1>
          <form onSubmit={formik.handleSubmit}>
            <TextField fullWidth
              id='content'
              label='whats on your mind'
              variant="filled"
              value={formik.values.content}
              onChange={formik.handleChange}
            />
            {formik.touched.content && formik.errors.content ? (<div>
              {formik.errors.content}
            </div>) : null}
            <Button variant="contained" type="submit">Post</Button>
          </form>
        </div>
        <div>
          <Button variant='outlined' onClick={handleClick}>Hourly Messsage</Button>
        </div>
      </div>
    );
  }
}

export default HourlyMessage;
