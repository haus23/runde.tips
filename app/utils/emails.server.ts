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

  await sendTemplateMailWithPostmark({
    from: `Tipprunde <${env.WELCOME_EMAIL}>`,
    to: `${userName} <${email}>`,
    category: 'totp',
    templateAlias: 'send-totp',
    templateModel,
  });
}

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
