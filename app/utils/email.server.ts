import { renderSendTotpEmail } from './auth/send-totp.email';

export async function sendTemplateEmail({
  to,
  templateAlias,
  templateModel,
}: {
  to: string;
  templateAlias: string;
  templateModel: Record<string, string>;
}) {
  const postBody = {
    From: 'Tipprunde <mail@runde.tips>',
    To: to,
    TemplateAlias: templateAlias,
    TemplateModel: templateModel,
  };

  const response = await fetch(
    'https://api.postmarkapp.com/email/withTemplate',
    {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': process.env.POSTMARK_TOKEN,
      },
    },
  );

  if (response.ok) {
    const body = await response.json();
    if (body.ErrorCode === 0) {
      return;
    }
  }

  throw new Error('Probleme beim Email-Versand');
}

export async function sendMailWithResend(props: {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  category: string;
}) {
  const { from, to, subject, html, text } = props;
  const httpBody = {
    from,
    to,
    subject,
    html,
    text,
    tags: [{ name: 'category', value: props.category }],
  };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    body: JSON.stringify(httpBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_TOKEN}`,
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error('Probleme beim Email-Versand');
  }
}

export async function sendTOTPWithResend({
  name,
  email,
  code,
  magicLink,
}: {
  name: string;
  email: string;
  code: string;
  magicLink: string;
}) {
  const mailProps = {
    from: 'Tipprunde <hallo@runde.tips>',
    to: `${name} <${email}>`,
    subject: 'Tipprunde Login Code',
    category: 'totp',
    ...(await renderSendTotpEmail({ name, code, magicLink })),
  };
  await sendMailWithResend(mailProps);
}
