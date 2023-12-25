import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { AppErrorCode, loginSuccess, selectIsAuthenticated } from '@/app';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { attemptLogin } from '../api';
import { Layout } from '@/layout';
import { Container } from '@/layout/container';

export function LoginPage() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();

  const q = new URLSearchParams(search);

  if (isAuthenticated) {
    return <Navigate to={q.get('redirect') || '/'} replace />;
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await attemptLogin({ email, password: pass });
      if (result) {
        localStorage.setItem('token', result.token);
        dispatch(loginSuccess(result));
      }
    } catch (error) {
      const code = error as AppErrorCode;
      console.log(code);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <Container>
        <section className="flex justify-center mt-10">
          <div className="w-[550px] max-w-sm border-solid p-4 flex flex-col gap-5">
            <form
              className="w-full flex flex-col gap-4"
              onSubmit={handleFormSubmit}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-1">
                  <h1 className="text-xl text-center text-primary font-semibold">
                    Sign In
                  </h1>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  required
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    required
                    autoComplete="password"
                    value={pass}
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                  />
                  <div
                    className="absolute top-0 right-5 h-full flex flex-col items-center justify-center"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </div>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Sign In
              </Button>
            </form>
            <p className="text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account?
              </span>{' '}
              <Link className="text-primary underline" to="/register">
                Sign up
              </Link>
            </p>
          </div>
        </section>
      </Container>
    </Layout>
  );
}
