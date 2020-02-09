import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Easy to Use</>,
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        SCIWP was designed te be easy to install and use. You can install the offical WordPress plugin or you can bundle the framework with your own plugins and distribute it in the way you prefer.
      </>
    ),
  },
  {
    title: <>Modern Framework Tools</>,
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        SCIWP extends WordPress including most of the functionalities and tools you can find in modern PHP frameworks, an autoloading, routing and common patterns like MVC or Dependency Injection.
      </>
    ),
  },
  {
    title: <>Organize your Code</>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
       With SCIWP you can divide your code in modules and create a logical separation among models, controllers and views, including the bussiness logic withing services.
      </>
    ),
  },
  {
    title: <>Extending your Plugins</>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        When you bundle your plugin with SCIWP, you are also providing a great way of allowing another WordPress developers to extend your plugin and create a community around it.
      </>
    ),
  },
  {
    title: <>Great Performance</>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        The autoloader includes only the class files used in each request to save memory. Files, routes and configurations are cached for faster loading times. Enable or disable the extensions you want to use.
      </>
    ),
  },
  {
    title: <>Query builder and ORM</>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        Instead for providing a different way of doing things that WordPress already does, SCIWP only extends WordPress functionalities so you can continue to use the WordPress standards you are used to.
      </>
    ),
  },
  {
    title: <>Use WordPress Standards</>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        Instead for providing a different way of doing things that WordPress already does, SCIWP only extends WordPress functionalities so you can continue to use the WordPress standards you are used to.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
        <div className={classnames('feature')}>
          {imgUrl && (
            <div className="text--center">
              <img className={styles.featureImage} src={imgUrl} alt={title} />
            </div>
          )}
          <h3>{title}</h3>
          <p>{description}</p>
      </div>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">

        <img alt="Docusaurus with Keytar" className="heroLogo_cGK-" src="/img/hero-logo.png"/>
          <p><h1 className="hero__subtitle">{siteConfig.tagline}</h1></p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg sci-button',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/doc1')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      <section className="mvc">
          <div className="container">
            <div className="row">
              <div className="col col--4">
<h2>sd</h2>
              </div>
              <div className="col col--4">
              <h2>sd</h2>
              </div>
              <div className="col col--4">
              <h2>sd</h2>
              </div>
            </div>
          </div>
        </section>
      </main>

    </Layout>
  );
}

export default Home;
