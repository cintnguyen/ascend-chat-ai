import React, { useState } from "react";
import { Textarea, Button } from "@nextui-org/react";

export default function UserInput({ submitPrompt }) {
    const [input, setInput] = useState("")

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
              label="Add note here"
              labelPlacement="inside"
              placeholder="Start typing your question and we'll write your notes..."
              minRows={2}
              maxRows={4}
              value={input}
              onValueChange={setInput}
              variant="bordered"  
            />
            <Button
                style={buttonStyling}
                fullWidth
                className="mb-2 mt-1"
                color="primary"
                onClick={() => {
                    submitPrompt(input); 
                    setInput("")
                }}
            >
                Submit
            </Button>
        </div>
    )
}