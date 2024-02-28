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
