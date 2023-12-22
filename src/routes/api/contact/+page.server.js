import { env as private_env } from '$env/dynamic/private'
import client from '@sendgrid/mail'

export const actions = {
    default: async ({ request }) => {
        const body = await request.formData()
        /*const assessment = await createAssessment({
            projectID: private_env.SECRET_PROJECT_ID,
            recaptchaSiteKey: private_env.SECRET_RECAPTCHA_SITEKEY,
            token: body.get('captchaToken'), 
            recaptchaAction: 'submit'})
        console.log(assessment)
        //If reCAPTCHA's assessment score is below this threshold, do not send email using SendGrid
        if(assessment <= 0.5)
            return fail(400, {reason: 'reCAPTCHA failed'})
        */
        client.setApiKey(private_env.SECRET_SENDGRID_API_KEY)
        const message = {
            to: [
                {
                    email: "leduchieu362811@gmail.com",
                    name: 'Hieu'
                }
            ],
            from: {
                email: 'leduchieu362811@gmail.com',
                name: 'Hieu'
            },
            subject: `Test`,
            content: [
                {
                    type: 'text/html',
                    value: 'test'
                }
            ],
            categories: [
                'lien-he'
            ]
        }
        const success = await client
            .send(message)
            .then(() => {
                console.log('mail sent')
                return {
                    success: true,
                }
            })
            .catch(error => {
                console.error(error.response.body.errors)
                return {
                    success: false,
                    error: error
                }
            })
        return success
    }
}