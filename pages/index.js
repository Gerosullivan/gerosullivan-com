import moment from 'moment';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import SubscribeForm from '../components/SubscribeForm.js';
import Parser from 'rss-parser';

export default function Home(props) {


  return (
    <div className={styles.container}>
      <Head>
        <title>Ger O'Sullivan</title>
        <meta
          name="description"
          content="Welcome to my site"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <main className={styles.main}>
        <section className={styles.intro}>
          <img className={styles.avatar} src="/gerosullivan.jpg" />
          <h1 className={styles.title}>Ger O'Sullivan</h1>
          <p>EdTech veteran, software developer, consultant, AI enthusiast.</p>
        </section>
        <div style={{ marginBottom: 30 }}>
          {[
            {
              link: 'https://articles.gerosullivan.com',
              title: (
                <span>
                  <span style={{ marginRight: 10 }}>💌</span>
                  Newsletter
                </span>
              ),
            },
            {
              link: 'https://twitter.com/gerosullivan',
              title: (
                <span>
                  <span style={{ marginRight: 10 }}>𝕏</span> Twitter
                </span>
              ),
            },
            {
              link: 'https://www.linkedin.com/in/gerosullivan',
              title: (
                <span>
                  <span style={{ marginRight: 10 }}>🔗</span> LinkedIn
                </span>
              ),
            },
            {
              link: 'https://cal.com/gerosullivan',
              title: (
                <span>
                  <span style={{ marginRight: 10 }}>📆</span> Book meeting
                </span>
              ),
            },
          ].map((item) => (
            <a className={styles.bio_link} key={item.link} href={item.link}>
              {item.title}
            </a>
          ))}
        </div>

        <div style={{ margin: '40px 0', textAlign: 'center' }}>
          <SubscribeForm />
        </div>

        <h2>Latest Updates 👇</h2>
        <div className={styles['issue-container']}>
          {props.latest.map((issue, i) => (
            <a key={i} href={issue.link} className={styles['issue-line']}>
              <div className={styles['issue-header']}>
                <div
                  style={{ backgroundColor: issue.color }}
                  className={styles['issue-source']}
                >
                  {issue.source}
                </div>
                <div className={styles['issue-date']}>
                  {moment(issue.isoDate).fromNow()}
                </div>
              </div>
              <div className={styles['issue-title']}>{issue.title}</div>
              <div className={styles['issue-snippet']}>
                {(issue.contentSnippet || '').substring(0, 100)}
                {(issue.contentSnippet || '').length > 100 ? '...' : ''}
              </div>
            </a>
          ))}
        </div>
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        @media (prefers-color-scheme: dark) {
          html,
          body {
            color-scheme: dark;
            background: #141414;
            color: white;
          }
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const parser = new Parser();
    const newsletter = await parser.parseURL('https://articles.gerosullivan.com/feed')

    return {
      props: {
        newsletter: `Last issue: ${fromNow(
          new Date(newsletter.items[0].isoDate)
        )}`,
        latest: [
          ...newsletter.items.map((item) => ({
            ...item,
            source: `Ger O'Sullivan's Newsletter`,
            color: '#5383ec',
          }))
        ].sort(
          (a, b) =>
            new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime()
        ),
      },
    };
  } catch (e) {
    console.error(e);
  }
}

function fromNow(
  date,
  nowDate = Date.now(),
  rft = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })
) {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;
  const intervals = [
    { ge: YEAR, divisor: YEAR, unit: 'year' },
    { ge: MONTH, divisor: MONTH, unit: 'month' },
    { ge: WEEK, divisor: WEEK, unit: 'week' },
    { ge: DAY, divisor: DAY, unit: 'day' },
    { ge: HOUR, divisor: HOUR, unit: 'hour' },
    { ge: MINUTE, divisor: MINUTE, unit: 'minute' },
    { ge: 30 * SECOND, divisor: SECOND, unit: 'seconds' },
    { ge: 0, divisor: 1, text: 'just now' },
  ];
  const now =
    typeof nowDate === 'object'
      ? nowDate.getTime()
      : new Date(nowDate).getTime();
  const diff =
    now - (typeof date === 'object' ? date : new Date(date)).getTime();
  const diffAbs = Math.abs(diff);
  for (const interval of intervals) {
    if (diffAbs >= interval.ge) {
      const x = Math.round(Math.abs(diff) / interval.divisor);
      const isFuture = diff < 0;
      return interval.unit
        ? rft.format(isFuture ? x : -x, interval.unit)
        : interval.text;
    }
  }
}
