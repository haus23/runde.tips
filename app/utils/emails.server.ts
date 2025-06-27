import { env } from './env.server';
import { getDomainUrl } from './misc';

/**
 * Sends email with login code to user
 *
 * @param request Request object
 * @param emailProps Username, email-address and the login code
 */
export async function sendCodeMail(
  request: Request,
  emailProps: {
    userName: string;
    code: string;
    email: string;
  },
) {
  const { userName, code, email } = emailProps;

  // Template model
  const templateModel = {
    name: userName,
    code,
    magic_link: `${getDomainUrl(request)}/verify?code=${code}`,
  };

  if (env.NODE_ENV === 'production') {
    await sendTemplateMailWithPostmark({
      from: `Tipprunde <${env.WELCOME_EMAIL}>`,
      to: `${userName} <${email}>`,
      category: 'totp',
      templateAlias: 'send-totp',
      templateModel,
    });
  } else {
    await sendMail({
      from: `Tipprunde <${env.WELCOME_EMAIL}>`,
      to: `${userName} <${email}>`,
      category: 'totp',
      subject: 'Tipprunde Login Code',
      text: `Hallo ${userName}! Dein Code lautet: ${code}. Oder Login per Link: ${templateModel.magic_link}`,
    });
  }
}

// Email Send Helpers

type PostmarkTemplateEmailProps = {
  from: string;
  to: string;
  category: string;
  templateAlias: string;
  templateModel: Record<string, string>;
};

async function sendTemplateMailWithPostmark({
  from,
  to,
  category,
  templateAlias,
  templateModel,
}: PostmarkTemplateEmailProps) {
  const httpBody = {
    From: from,
    To: to,
    Tag: category,
    TemplateAlias: templateAlias,
    TemplateModel: templateModel,
  };

  const response = await fetch(
    'https://api.postmarkapp.com/email/withTemplate',
    {
      method: 'POST',
      body: JSON.stringify(httpBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': `${env.POSTMARK_TOKEN}`,
      },
    },
  );

  if (!response.ok) {
    console.log(response);
    throw new Error('Probleme beim Email-Versand');
  }
}

type EmailProps = {
  from: string;
  to: string;
  subject: string;
  html?: string;
  text: string;
  category: string;
};

type Provider = 'Postmark' | 'Resend';

async function sendMail(props: EmailProps, provider: Provider = 'Resend') {
  switch (provider) {
    case 'Postmark':
      return await sendMailWithPostmark(props);
    default:
      return await sendMailWithResend(props);
  }
}

async function sendMailWithPostmark({
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
      'X-Postmark-Server-Token': `${env.POSTMARK_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Probleme beim Email-Versand');
  }
}

async function sendMailWithResend(props: EmailProps) {
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
      Authorization: `Bearer ${env.RESEND_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Probleme beim Email-Versand');
  }
}
