import { renderSendTotpEmail } from './auth/send-totp.email';

type EmailProps = {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  category: string;
};

export async function sendMailWithPostmark({
  from,
  to,
  subject,
  html,
  text,
  category,
}: EmailProps) {
  const httpBody = {
    From: from,
    To: to,
    Subject: subject,
    HtmlBody: html,
    TextBody: text,
    Tag: category,
    MessageStream: 'outbound',
  };

  const response = await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    body: JSON.stringify(httpBody),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': process.env.POSTMARK_TOKEN,
    },
  });

  if (!response.ok) {
    console.log(response);
    const txt = await response.text();
    console.log(txt);
    throw new Error('Probleme beim Email-Versand');
  }
}

export async function sendMailWithResend(props: EmailProps) {
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
    throw new Error('Probleme beim Email-Versand');
  }
}

type SendTotpEmailProps = {
  name: string;
  email: string;
  code: string;
  magicLink: string;
};

export async function sendTotpWithPostmark({
  name,
  email,
  code,
  magicLink,
}: SendTotpEmailProps) {
  const mailProps = {
    from: 'Tipprunde <hallo@runde.tips>',
    to: `${name} <${email}>`,
    subject: 'Tipprunde Login Code',
    category: 'totp',
    ...(await renderSendTotpEmail({ name, code, magicLink })),
  };
  await sendMailWithPostmark(mailProps);
}

export async function sendTotpWithResend({
  name,
  email,
  code,
  magicLink,
}: SendTotpEmailProps) {
  const mailProps = {
    from: 'Tipprunde <hallo@runde.tips>',
    to: `${name} <${email}>`,
    subject: 'Tipprunde Login Code',
    category: 'totp',
    ...(await renderSendTotpEmail({ name, code, magicLink })),
  };
  await sendMailWithResend(mailProps);
}
