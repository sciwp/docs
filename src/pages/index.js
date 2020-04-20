import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';


const people = [
  {
    title: <>Eduardo Lazaro <a href="https://github.com/neeonez"><i className="fab fa-github"></i></a></>,
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
    title: <>MVC Pattern</>,
    imageUrl: 'img/feature-mvc.png',
    description: (
      <>
        <p>The MVC Pattern allows to organize better your code bu creating a logical separation among models, controllers and views, including the bussiness logic withing services.</p><p>SCI WP extends WordPress including most of the functionalities and tools you can find in modern PHP frameworks, like <strong>Autoloading</strong> and <strong>Dependency Injection</strong>.</p>
      </>
    ),
  },
  {
    title: <>Improved Router</>,
    imageUrl: 'img/feature-router.png',
    description: (
      <>
        <p>Create routes in the same way you do it with Laravel. SCI WP Framework includes a brand new HTTP router which allows you to directly link a closure function, a class method, a view or a file.</p>
        <p>The bundled API router also provides an easier way of creating API routes for WordPress.</p>
      </>
    ),
  },
  {
    title: <>Easy to use ORM</>,
    imageUrl: '/img/feature-models.png',
    description: (
      <>
        <p>SCI WP integrates an easy to use ORM. You can map database tables to models by just creating a class. You can then customize table tames, default attributes, timestamps and more.</p>
        <p>You can then create database queries against the models in order to get one or many records which will be mapped to create model instances with the retrieved attributes. The included Query Builder allows to create queries from the database and also from any model.</p>
      </>
    ),
  },
  {
    title: <>Service Providers</>,
    imageUrl: '/img/feature-providers.png',
    description: (
      <>
       <p>Service providers allow to configure the plugin and to execute sets of tasks when the framework is loaded.</p>
       <p>This is where you should configure services, define singletons or even routes. Tt's also the best place to bind things into the service container, which is in charge of injecting dependencies.</p>
      </>
    ),
  },
  {
    title: <>Asset Manager</>,
    imageUrl: '/img/feature-assets.png',
    description: (
      <>
       <p>In WordPress you need to create several functions to add s simple CSS or JS file intro the webstie header.</p>
       <p>SCI WP Framework you can just register scripts and styles with one line of code, or define them in the config file of each plugin using the framework.</p>
      </>
    ),
  }
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

      <section id="bundle">
          <div className="container">
            <div className="row">
              <div className="col col--12 content-center">
                <h2>Simple to install and update</h2>
                <div className="h2sub">
                  You just need to copy the plugin into your plugin's directory. Use the included GitHub auto updater to get new versions.
                </div>
              </div>
            </div>
            <div className="row">
              <div className={classnames('col col--12', styles.bundle)}>
                <div className={classnames(styles.bundleMedia)}>
                  <div className="text--center">
                    <img className={styles.bundleImage} src={'img/feature-install.png'} alt="Bundle easily with your plugin" />
                  </div>
                </div>
                <div className={classnames(styles.bundleContent)}>
                  <p>After installing the framework you can start using it by just typing two lines of code. To customize it just add a config file in the root folder of your Plugin. Complex? Just use the SCI WP Starter Template.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr/>


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

  
  {
/*
      The autoloader includes only the class files used in each request to save memory. Files, routes and configurations are cached for faster loading times. Enable or disable the extensions you want to use.


  */}

        <section className="section-white" style={{background: "#2A4447"}}>
          <div className="container">
            <div className="row">
              <div className="col col--12 content-center">
                <h2>Use WordPress Standards</h2>
                <img src={'img/wplove.png'} alt={'SCI WP Love WordPress'} />
                <div className="h2sub margin-top-25">
                  <p>Instead for providing a different way of doing things which WordPress already does, SCI WP extends WordPress functionalities so you can continue to use the WordPress standards you are used to.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="bundle">
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
              <div className={classnames('col col--12', styles.bundle)}>
                <div className={classnames(styles.bundleMedia)}>
                  <div className="text--center">
                    <img className={styles.bundleImage} src={'img/feature-bundle.png'} alt="Bundle easily with your plugin" />
                  </div>
                </div>
                <div className={classnames(styles.bundleContent)}>
                  <p>You can include the framework with your plugin by just using three lines of code. Namespace in the framework code will be replaced for you when you enable your plugin. It's also possible for any plugin which may extend yours to use the framework.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr/>
        {people && people.length && (
          <section className={styles.people}>
            <div className="container">
            <div className="row">
              <div className="col col--12 content-center">
                <h2>Who built SCI WP</h2>
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
