// Replace with a transactional email provider (Resend, SES, etc.) in production.
export async function sendVerificationEmail(email) {
  console.info(`Verification email requested for ${email}`);
}
