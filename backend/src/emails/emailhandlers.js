import { resendClient } from "../lib/resend"
import { createWelcomeEmailTemplate } from "./emailTemplates"

export const sendWelcomeEmail = async (sendWelcomeEmail, name, clientURL) => {
    
    const {data, error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.emails}>`,
        to: email,
        subject: "Welcome to Chatify",
        html: createWelcomeEmailTemplate(name, clientURL)
    })

    if(error){
       console.error("error sending welcome email: ", error)
       throw new Error("failed to send welcome email") 
    }

    console.log("Welcome email sent successfully", data);
    return data
}