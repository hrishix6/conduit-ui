import { UserInfo } from "@/app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/layout/container";
import { EyeIcon, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { updateUserProfile } from "../api";


export default function UserSettingsPage() {
    const {data} = useLoaderData() as {data: UserInfo};
    const [userInfo, setuserInfo] = useState<UserInfo>(data);
    const [showPass, setShowPass] = useState<boolean>(false);
    const [pass, setPass] = useState<string>('');
    const [loading, setLoading] = useState(false);

    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        try {
            setLoading(true);
            const payload = {
                ...userInfo,
                ...(pass? {password: pass}: {})
            };
            const updated = await updateUserProfile(payload);
            if(updated)
            {
                setuserInfo(updated);
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
    <Container>
        <section className="flex flex-col items-center gap-4 justify-center">
            <h1 className="text-xl text-primary font-semibold">Your Profile Settings</h1>
            <div className="w-full px-4 xl:px-0 xl:w-2/3">
            <form
              className="w-full flex flex-col gap-4"
              onSubmit={handleFormSubmit}
            >
              <div className="flex flex-col gap-3">
                <Label htmlFor="avatar">Avatar</Label>
                <Input
                  id="avatar"
                  type="text"
                  placeholder="avatar url"
                  value={userInfo.image || ""}
                  onChange={(e)=> setuserInfo(prev => {
                        return {
                            ...prev,
                            image: e.target.value
                        }
                  })}
                />
              </div>
              <section className="flex flex-col items-stretch xl:flex-row xl:items-center gap-3">
              <div className="flex-1 flex flex-col gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  required
                  autoComplete="email"
                  value={userInfo.username || ""}
                  onChange={(e)=> setuserInfo(prev => {
                    return {
                        ...prev,
                        username: e.target.value
                    }
              })}
                />
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    autoComplete="password"
                    value={pass}
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                  />
                  <div
                    className="absolute top-0 right-5 h-full flex flex-col items-center justify-center hover:cursor-pointer"
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
              </section>
              <div className="flex flex-col gap-3">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="short bio"
                  rows={5}
                  value={userInfo.bio || ""}
                  onChange={(e)=> setuserInfo(prev => {
                    return {
                        ...prev,
                        bio: e.target.value
                    }
              })}
                />
              </div>
              <div className="flex items-center justify-end">
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Update Settings
              </Button>
              </div>
            </form>
            </div>
        </section>
    </Container>
  )
}
