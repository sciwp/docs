import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Extremely simple to install</>,
    imageUrl: 'img/feature-install.png',
    description: (
      <>
        <p>SCIWP Framework was designed te be easy to install and use. You just need to copy the SCIWP package into your Plugin directory and use it by just typing two lines of code. The framework will read WordPress Plugin data and configure namespaces for you. </p>
        <p>Do you want to customize something? Just add a config file in the root folder of your Plugin. Complex? Just use the SCIWP Starter Template.</p>
      </>
    ),
  },
  {
    title: <>Easy to use ORM</>,
    imageUrl: '/img/feature-models.png',
    description: (
      <>
        <p>SCIWP integrates an easy to use ORM. You can map database tables to models by just creating a class. You can then customize table tames, default attributes, timestamps and more.</p>
        <p>You can then create database queries against the models in order to get one or many records which will be mapped to create model instances with the retrieved attributes.</p>
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

function FeatureContent({ title, description }) {
  return (
    <div className={classnames(styles.featureContent)}>
      <h3>{title}</h3>
      {description}
    </div>
  );
}

function FeatureMedia({ title, imageUrl }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames(styles.featureMedia)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
    </div>
  );
}

function Feature({ imageUrl, title, description, featureEven }) {
  if (featureEven ) {
    return(
      <div className={classnames('col col--12', styles.feature)}>
      <FeatureMedia title={title} imageUrl={imageUrl} />
      <FeatureContent
        title={title}
        description={description}
      />
    </div>
    );
  }
  return(
    <div className={classnames('col col--12', styles.feature)}>
      <FeatureContent
        title={title}
         description={description}
        featureEven={featureEven}
      />
      <FeatureMedia imageUrl={imageUrl} />
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  let featureEven = true;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">

          <img alt="Docusaurus with Keytar" className="heroLogo_cGK-" src="/img/hero-logo.png" />

          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
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
                {features.map((props, idx) => {
                  featureEven = !featureEven;
                  return <Feature key={idx} featureEven={featureEven} {...props} />
                })}
              </div>
            </div>
          </section>
        )}
        {
        /*
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
        */}
      </main>

    </Layout>
  );
}

export default Home;
