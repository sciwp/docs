import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';


const people = [
  {
    title: <>Eduardo Lazaro</>,
    imageUrl: 'img/people/edu.png',
    description: (
      <>
        Built this framework to better organize code in my plugins, also in the hope it's useful for more people.
      </>
    ),
  },
  {
    title: <>Dr. Eggman</>,
    imageUrl: 'img/people/robotnik.png',
    description: (
      <>
        I will make a new robot with laser eyes and a rocket launcher. I will have such a good time.
      </>
    ),
  },
];

const features = [
  {
    title: <>Extremely simple to install</>,
    imageUrl: 'img/feature-install.png',
    description: (
      <>
        <p>SCI WP Framework was designed te be easy to install and use. You just need to copy the SCI WP package into your Plugin directory and use it by just typing two lines of code. The framework will read WordPress Plugin data and configure namespaces for you. </p>
        <p>Do you want to customize something? Just add a config file in the root folder of your Plugin. Complex? Just use the SCI WP Starter Template.</p>
      </>
    ),
  },
  {
    title: <>Easy to use ORM</>,
    imageUrl: '/img/feature-models.png',
    description: (
      <>
        <p>SCI WP integrates an easy to use ORM. You can map database tables to models by just creating a class. You can then customize table tames, default attributes, timestamps and more.</p>
        <p>You can then create database queries against the models in order to get one or many records which will be mapped to create model instances with the retrieved attributes.</p>
      </>
    ),
  },
  {
    title: <>Modern Framework Tools</>,
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        SCI WP extends WordPress including most of the functionalities and tools you can find in modern PHP frameworks, an autoloading, routing and common patterns like MVC or Dependency Injection.
      </>
    ),
  },
  {
    title: <>Organize your Code</>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        With SCI WP you can divide your code in modules and create a logical separation among models, controllers and views, including the bussiness logic withing services.
      </>
    ),
  },
  {
    title: <>Extending your Plugins</>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        When you bundle your plugin with SCI WP, you are also providing a great way of allowing another WordPress developers to extend your plugin and create a community around it.
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
        Instead for providing a different way of doing things that WordPress already does, SCI WP only extends WordPress functionalities so you can continue to use the WordPress standards you are used to.
      </>
    ),
  },
  {
    title: <>Use WordPress Standards</>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        Instead for providing a different way of doing things that WordPress already does, SCI WP only extends WordPress functionalities so you can continue to use the WordPress standards you are used to.
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

function People({ imageUrl, title, description }) {
  return(
    <div className={classnames('col col--6', styles.people)}>
      <div className={classnames(styles.peopleMedia)}>
        <div className="text--center">
          <img className={styles.peopleImage} src={imageUrl} alt={title} />
        </div>
      </div>
      <div className={classnames(styles.peopleContent)}>
        <p><span className="text-red">" </span>{description}<span className="text-red"> "</span></p>
        <p className="author">- {title}</p>
      </div>
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
      title={`SCIWP Framework ${siteConfig.title}`}
      description="A MVC Framework for WordPress <head />">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">

          <img alt="Framework Logo" className="heroLogo_cGK-" src="/img/hero-logo.png" />

          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg sci-button',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/prologue')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main className="page">
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                  <div className="col col--12 content-center">
                    <h2>A Couple of Things About SCi WP</h2>
                    <div className="h2sub">
                        Let's see how SCI WP Framework can help you build better WordPress Plugins as you write readable and well organized code
                    </div>
                  </div>
              </div>
              <div className="row">
                {features.map((props, idx) => {
                  featureEven = !featureEven;
                  return <Feature key={idx} featureEven={featureEven} {...props} />
                })}
              </div>
            </div>
          </section>
        )}


{/*
        <section className="mvc">
          <div className="container">
            <div className="row">
              <div className="col col--12 content-center">
                <h2>Bundle Sci WP With your Plugin</h2>
                <div className="h2sub">
                You can Include SCi WP with your own Plugin in case you want to distribute it
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col col--6">
                <h2></h2>
              </div>
              <div className="col col--6">
                <h2></h2>
              </div>
            </div>
          </div>
        </section>

*/}
        <hr/>
        {people && people.length && (
          <section className={styles.people}>
            <div className="container">
            <div className="row">
              <div className="col col--12 content-center">
                <h2>Who built SCi WP</h2>
                <div className="h2sub">
                For problems please contact the guy on the right
                </div>
              </div>
            </div>
              <div className="row">
                {people.map((props, idx) => {
                  return <People key={idx} {...props} />
                })}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}




export default Home;
