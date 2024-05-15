import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from "@nextui-org/react";


export default function CardTitle({ display, delConversation }) {
    

    return (
            <Card isHoverable={true} className="max-w-[400px]">
                <CardHeader className="flex gap-3">
                    {/* <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                /> */}
                    <div className="flex flex-col">
                        <p className="text-md"><b>{display ? display.question : ""}</b></p>
                        {/* <p className="text-small text-default-500">nextui.org</p> */}
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <p>{display ? display.answer : ""}</p>
                </CardBody>
                <Divider />
                <CardFooter>
                    {/* <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/nextui-org/nextui"
                >
                    Visit source code on GitHub.
                </Link> */}
                    <Button color="primary" variant="ghost" onClick={() => delConversation(display._id)} >
                        Delete
                    </Button>
                </CardFooter>
            </Card>
        // "gap-2 grid grid-cols-2 sm:grid-cols-4"

    )
}