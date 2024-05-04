
import { Logo } from "@/components/Logo";

import { Button } from "@/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";

export function NavBar() {
    const userToken = true;
    const name = "Vite"
    return (
        <nav className="flex items-center justify-between w-1/2 px-4">
            <div >
                <Logo className="h-16 w-16" />
            </div>

            <div>
                {/* TODO: add side options as links */}
                <h3 className="text-2xl font-bold">Orders</h3>
            </div>


            <div className="flex space-x-3">
                {
                    userToken ?
                        <Avatar>
                            <AvatarImage src="/vite.svg" />
                            <AvatarFallback>
                                AC
                            </AvatarFallback>
                        </Avatar>
                        :
                        <Button>
                            Signup
                        </Button>
                }
            </div>
        </nav>
    );
}
