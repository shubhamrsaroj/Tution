import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request for SmartIQ Academy',
    html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Password Reset</title>
      <style type="text/css">
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }

        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td bgcolor="#f4f4f4" align="center" style="padding: 15px;">
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <tr>
                <td align="center" style="padding: 40px 0 30px 0; background-color: #f8f8f8;">
                  <h1 style="font-family: Arial, sans-serif; font-size: 24px; color: #333333; margin: 0;">Password Reset</h1>
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px;">
                        <p style="margin: 0;">You have requested a password reset for your SmartIQ Academy account. Click the button below to reset your password:</p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding: 30px 0;">
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="border-radius: 5px;" bgcolor="#4CAF50">
                              <a href="${resetUrl}" target="_blank" style="
                                font-size: 16px; 
                                font-family: Arial, sans-serif; 
                                color: #ffffff; 
                                text-decoration: none; 
                                border-radius: 5px; 
                                padding: 12px 24px; 
                                border: 1px solid #4CAF50; 
                                display: inline-block;
                                font-weight: bold;
                              ">Reset Password</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px;">
                        <p style="margin: 0;">If you did not request this password reset, please ignore this email or contact our support team.</p>
                        <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">This link will expire in 1 hour.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,
    // Plain text alternative for email clients that don't support HTML
    text: `Password Reset for SmartIQ Academy

You have requested a password reset. Click the link below to reset your password:
${resetUrl}

If you did not request this password reset, please ignore this email.

This link will expire in 1 hour.`
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};
