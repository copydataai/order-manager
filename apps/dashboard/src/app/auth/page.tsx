import { Separator } from "@order/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@order/ui/tabs";

import { Login } from "~/components/Login";
import { Logo } from "~/components/Logo";
import { Signup } from "~/components/Signup";

async function App() {
  return (
    <main className="flex h-[calc(80vh-2rem)] w-full flex-col items-center justify-center gap-2">
      <div className="flex flex-col items-center justify-center gap-2">
        <h3 className="text-3xl font-bold">Account</h3>
        <Tabs
          defaultValue="login"
          className="flex w-[400px] flex-col items-center gap-2"
        >
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default App;
