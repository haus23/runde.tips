import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  render,
  renderPlainText,
} from 'jsx-email';
import { promiseHash } from 'remix-utils/promise';

const main = {
  backgroundColor: '#D7DAD9',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const borderContainer = {
  padding: '20px 0 0',
};

const borderContent = {
  color: '#868E8B',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  marginBottom: '16px',
  padding: '20px 0 48px',
};

const box = {
  padding: '0 48px',
};

const linkBox = {
  width: '66%',
  textAlign: 'center' as const,
  padding: '0 48px',
  backgroundColor: '#EEF1F0',
};

const centerBox = {
  padding: '0 48px 24px',
  textAlign: 'center' as const,
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const paragraph = {
  color: '#5F6563',
  fontSize: '16px',
  lineHeight: '28px',
  textAlign: 'left' as const,
};

const hintParagraph = {
  color: '#868E8B',
  fontSize: '16px',
  lineHeight: '28px',
  textAlign: 'left' as const,
};

const bigParagraph = {
  color: '#1A211E',
  fontSize: '24px',
  fontWeight: 'semi-bold',
  lineHeight: '32px',
  textAlign: 'left' as const,
};

const codeDisplay = {
  color: '#1A211E',
  fontSize: '32px',
  letterSpacing: '0.1em',
};

const button = {
  marginTop: '16px',
  backgroundColor: '#29A383',
  borderRadius: '5px',
  color: '#fff',
  display: 'block',
  fontSize: '16px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  textDecoration: 'none',
  padding: '12px 64px',
};

const topLink = {
  color: '#868E8B',
};

type SendTotpEmailProps = {
  name: string;
  code: string;
  magicLink: string;
};

export function SendTotpEmail({ name, code, magicLink }: SendTotpEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Login Code für die Tipprunde: {code}</Preview>
      <Body style={main}>
        <Container style={borderContainer}>
          <Section style={centerBox}>
            <Link style={borderContent} href="https://runde.tips">
              Haus23 Tipprunde
            </Link>
          </Section>
        </Container>
        <Container style={container}>
          <Section style={box}>
            <Text style={bigParagraph}>Hallo {name}!</Text>
          </Section>
          <Section style={box}>
            <Text style={paragraph}>
              Du hast einen Login-Code angefordert. Und hier ist er! Du kannst
              ihn manuell eintippen oder den Login-Link benutzen.
            </Text>
          </Section>
          <Section style={centerBox}>
            <Text style={codeDisplay}>{code}</Text>
            <Button style={button} href={magicLink}>
              Log In
            </Button>
          </Section>
          <Section style={box}>
            <Text style={hintParagraph}>
              Achtung: Code und Link sind genau fünf Minuten gültig und
              funktionieren nur in dem Browser, in dem du die Anmeldung
              gestartet hast.
            </Text>
          </Section>
          <Section style={box}>
            <Text style={bigParagraph}>Viel Spaß, Dein Tipprunden-Team!</Text>
            <Hr style={hr} />
          </Section>
          <Section style={box}>
            <Text style={hintParagraph}>
              Wenn du Probleme hast den Magic-Link Button zu benutzen, kopiere
              einfach den folgenden Text-Link und füge ihn im Browser ein:
            </Text>
          </Section>
          <Section style={linkBox}>
            <Text style={paragraph}>{magicLink}</Text>
          </Section>
        </Container>
        <Container>
          <Section style={centerBox}>
            <Text style={borderContent}>© 2024 Haus23 Tipprunde</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function renderSendTotpEmail(props: SendTotpEmailProps) {
  return promiseHash({
    html: render(<SendTotpEmail {...props} />),
    text: renderPlainText(<SendTotpEmail {...props} />),
  });
}
