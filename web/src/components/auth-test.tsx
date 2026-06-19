import { useState } from 'react';
import { authClient } from '../lib/auth';

export function AuthTest() {
  const { data, isPending, error } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{`Error: ${error}`}</div>;
  }

  if (!data) {
    return <SignedOut />;
  }

  return <SignedIn email={data.user.email} />;
}

interface SignedInProps {
  email: string;
}
function SignedIn({ email }: SignedInProps) {
  return (
    <div>
      <p>Signed in as {email}</p>
      <button onClick={() => authClient.signOut()}>Sign out</button>
    </div>
  );
}

function SignedOut() {
  return (
    <div>
      <SignIn />
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
        callbackURL: '/',
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
        callbackURL: '/', // A URL to redirect to after the user verifies their email (optional)
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
