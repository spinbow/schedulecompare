import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { authClient } from '../lib/auth';

export const Route = createFileRoute('/signin')({
  component: Auth,
});

function Auth() {
  return (
    <div>
      <Link to="/">Back to home</Link>
      <hr />
      <SignIn />
      <hr />
      <SignUp />
    </div>
  );
}

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [requested, setRequested] = useState(false);

  const signIn = async () => {
    const result = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: '/app',
      },
      {
        onRequest: (ctx) => {
          console.log(ctx);
          setRequested(true);
        },
        onSuccess: (ctx) => {
          console.log(ctx);
        },
        onError: (ctx) => {
          setRequested(false);
          alert(ctx.error.message);
        },
      },
    );

    console.log(result);
    return result;
  };

  if (requested) {
    return <p>Requested...</p>;
  }

  return (
    <div>
      <h1>Sign in</h1>
      <p>email</p>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <p>password</p>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <p>remember me</p>
      <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />

      <button onClick={signIn}>Sign in</button>
    </div>
  );
}

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [requested, setRequested] = useState(false);

  const signUp = async () => {
    const result = await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        callbackURL: '/app', // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          console.log(ctx);
          setRequested(true);
        },
        onSuccess: (ctx) => {
          console.log(ctx);
        },
        onError: (ctx) => {
          setRequested(false);
          alert(ctx.error.message);
        },
      },
    );

    console.log(result);
    return result;
  };

  if (requested) {
    return <p>Requested...</p>;
  }

  return (
    <div>
      <h1>Sign up</h1>
      <p>email</p>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <p>password</p>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <p>name</p>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <button onClick={signUp}>Sign up</button>
    </div>
  );
}
