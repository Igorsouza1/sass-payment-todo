import Stripe from "stripe";
import { config } from "../config";


export const stripe = new Stripe(config.stripe.secretKey, {
    apiVersion: '2023-10-16'
})

export const generateCheckout = async () => {
     const session = await stripe.checkout.sessions.create({
        
     })
}

export const handleProcessWebhookCheckout = () => {
     
}

export const handleProcessWebhookUpdatedSubscription = () => {
     
}