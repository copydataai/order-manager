import { Logo } from "@/components/Logo"
import { Icons } from "@/components/icons"


export function Footer() {
    return (
        <footer className="flex flex-col w-full items-center px-4 gap-4">
            {/* top */}
            <div className="flex px-4 gap-4 w-full md:w-1/2 justify-between">
                <div>
                    <div className="flex gap-2 items-center">
                        <Logo className="h-16 w-16" />
                        <h3 className="text-2xl font-bold">Orders</h3>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">Legal</h3>
                    <p className="text-sm">privacy</p>
                    <p className="text-sm">terms</p>
                </div>
            </div>

            {/* bottom */}
            <div className="flex px-4 py-4 gap-4 w-full md:w-1/2 justify-between">
                <p>Copyright © 2024 Jose Sanchez</p>

                <div className="flex gap-2 items-center">
                    <Icons.linkedin className="h-10 w-10" />
                    <Icons.gitHub className="h-8 w-8"/>
                </div>

            </div>
        </footer>
    );
}
