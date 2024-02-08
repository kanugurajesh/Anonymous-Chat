import * as React from 'react';

interface EmailTemplateProps {
  imageURl: string,
}

interface ContactEmailTemplateProps {
  name: string,
  email: string,
  message: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  imageURl
}) => (
  <div>
    <h1>Here is your image</h1>
    <img src={imageURl} alt="image"/>
  </div>
);

export const ContactEmailTemplate: React.FC<Readonly<ContactEmailTemplateProps>> = ({
  name, email, message
}) => (
  <div>
    <h1>You got a message from LearnForge</h1>
    <h2>Name :- {name}</h2>
    <h2>Email :- {email}</h2>
    <h2>Message :- {message}</h2>
  </div>
);
