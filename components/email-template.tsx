import * as React from 'react';

interface ContactEmailTemplateProps {
  name: string,
  email: string,
  message: string
}

export const ContactEmailTemplate: React.FC<Readonly<ContactEmailTemplateProps>> = ({
  name, email, message
}) => (
  <div>
    <h1>You got a message from Anonymous Chat</h1>
    <h2>Name :- {name}</h2>
    <h2>Email :- {email}</h2>
    <h2>Message :- {message}</h2>
  </div>
);
