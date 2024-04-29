import React, { useState } from "react";
import { Textarea, Button } from "@nextui-org/react";

export default function UserInput() {
    const [value, setValue] = useState("")

    const submitPrompt = async (event) => {
        event.preventDefault()

        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({text: value})
        })

        const aiAnswer = await response.json()

        setValue("")
    }

    const buttonStyling = {
        background: "#ed1c24",
        fontFamily: "League Gothic",
        fontSize: "large",
        fontWeight: "400",
        letterSpacing: ".05rem",
        textTransform: "uppercase"
    }
    return (
        <div>
            <Textarea
              className="pb-2 mb-1 fullwidth"
              label="Have a question?"
              labelPlacement="inside"
              placeholder="Message ResilientGPT..."
              minRows={2}
              maxRows={4}
              value={value}
              onValueChange={setValue}
              variant="bordered"  
            />
            <Button
                style={buttonStyling}
                fullWidth
                className="mb-2 mt-1"
                color="primary"
                onClick={submitPrompt}
            >
                Submit
            </Button>
        </div>
    )
}