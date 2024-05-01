import { Button } from "@/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";

export function NavBar() {
    const userToken = true;
    const name = "Vite"
    return (
        <nav className="flex items-center justify-between w-1/2 px-4">
            <div >
                <img className="w-16" src="/orders.webp" alt="" />
            </div>

            <div>
                {/* TODO: add side options as links */}
                <p className="text-lg font-semibold">Orders</p>

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
